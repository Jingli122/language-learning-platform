#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
会计科目和辅助核算校验脚本
校验顺序：科目存在性 → 辅助核算开通 → 辅助核算明细存在
"""

import json
import sys
from typing import Dict, List, Tuple, Optional


# 默认科目配置
DEFAULT_EXPENSE_ACCOUNTS = {
    "销售费用": {
        "code": "66010101",
        "name": "销售费用_职工薪酬_工资",
        "required_auxiliary": ["部门", "职员"],
    },
    "管理费用": {
        "code": "66020101",
        "name": "管理费用_职工薪酬_工资",
        "required_auxiliary": ["部门", "职员"],
    },
    "研发费用": {
        "code": "5301010101",
        "name": "研发支出_费用化支出_职工薪酬_工资",
        "required_auxiliary": ["部门", "职员"],
    },
}

DEFAULT_OTHER_ACCOUNTS = [
    {"code": "221101", "name": "应付职工薪酬_工资"},
    {"code": "122105", "name": "其他应收款_社会/医疗保险费"},
    {"code": "122106", "name": "其他应收款_住房公积金"},
    {"code": "222108", "name": "应交税费_个人所得税"},
    {"code": "100206", "name": "银行存款_锦鲤银行"},
]


class AccountValidator:
    def __init__(
        self,
        account_list: List[Dict],
        auxiliary_config: Dict[str, List[str]],
        auxiliary_details: Dict[str, List[str]],
        custom_expense_accounts: Optional[Dict] = None,
        custom_other_accounts: Optional[List[Dict]] = None,
    ):
        self.account_list = account_list
        self.auxiliary_config = auxiliary_config
        self.auxiliary_details = auxiliary_details
        self.expense_accounts = custom_expense_accounts or DEFAULT_EXPENSE_ACCOUNTS
        self.other_accounts = custom_other_accounts or DEFAULT_OTHER_ACCOUNTS

    def _find_account(self, code: str) -> Optional[Dict]:
        for acc in self.account_list:
            if acc.get("code") == code:
                return acc
        return None

    def _account_exists(self, code: str) -> bool:
        return self._find_account(code) is not None

    def _has_auxiliary(self, account_code: str, auxiliary_type: str) -> bool:
        account_aux = self.auxiliary_config.get(account_code, [])
        return auxiliary_type in account_aux

    def _auxiliary_detail_exists(self, auxiliary_type: str, detail_name: str) -> bool:
        details = self.auxiliary_details.get(auxiliary_type, [])
        return detail_name in details

    def validate_accounts_exist(self, expense_types_used: List[str]) -> Tuple[bool, List[str]]:
        errors = []
        checked = set()

        for exp_type in expense_types_used:
            if exp_type not in self.expense_accounts:
                errors.append(f"不支持的费用类型：{exp_type}")
                continue
            acc = self.expense_accounts[exp_type]
            acc_key = acc["code"]
            if acc_key in checked:
                continue
            checked.add(acc_key)
            if not self._account_exists(acc["code"]):
                errors.append(
                    f"会计科目不存在：{acc['code']} {acc['name']}（{exp_type}）"
                )

        for acc in self.other_accounts:
            if not self._account_exists(acc["code"]):
                errors.append(f"会计科目不存在：{acc['code']} {acc['name']}")

        return len(errors) == 0, errors

    def validate_auxiliary_enabled(self, expense_types_used: List[str]) -> Tuple[bool, List[str]]:
        errors = []
        checked = set()

        for exp_type in expense_types_used:
            if exp_type not in self.expense_accounts:
                continue
            acc = self.expense_accounts[exp_type]
            acc_key = acc["code"]
            if acc_key in checked:
                continue
            checked.add(acc_key)
            if not self._account_exists(acc["code"]):
                continue
            for aux_type in acc.get("required_auxiliary", []):
                if not self._has_auxiliary(acc["code"], aux_type):
                    errors.append(
                        f"科目 {acc['code']} {acc['name']} 未开通辅助核算：{aux_type}"
                    )

        return len(errors) == 0, errors

    def validate_auxiliary_details(self, employees: List[Dict], expense_types_used: List[str]) -> Tuple[bool, List[str]]:
        errors = []
        departments = set()
        employees_set = set()
        dept_needs_check = False
        emp_needs_check = False

        for exp_type in expense_types_used:
            if exp_type in self.expense_accounts:
                acc = self.expense_accounts[exp_type]
                if "部门" in acc.get("required_auxiliary", []):
                    dept_needs_check = True
                if "职员" in acc.get("required_auxiliary", []):
                    emp_needs_check = True

        for emp in employees:
            if dept_needs_check and emp.get("部门"):
                departments.add(emp["部门"])
            if emp_needs_check and emp.get("姓名"):
                employees_set.add(emp["姓名"])

        if dept_needs_check:
            for dept in sorted(departments):
                if not self._auxiliary_detail_exists("部门", dept):
                    errors.append(f"部门辅助核算明细不存在：{dept}")

        if emp_needs_check:
            for emp_name in sorted(employees_set):
                if not self._auxiliary_detail_exists("职员", emp_name):
                    errors.append(f"职员辅助核算明细不存在：{emp_name}")

        return len(errors) == 0, errors

    def validate_all(self, employees: List[Dict]) -> Dict:
        expense_types_used = list({emp["费用类型"] for emp in employees if "费用类型" in emp})

        result = {
            "step1_account_exist": {"passed": False, "errors": []},
            "step2_auxiliary_enabled": {"passed": False, "errors": []},
            "step3_auxiliary_details": {"passed": False, "errors": []},
            "all_passed": False,
        }

        passed, errors = self.validate_accounts_exist(expense_types_used)
        result["step1_account_exist"] = {"passed": passed, "errors": errors}
        if not passed:
            return result

        passed, errors = self.validate_auxiliary_enabled(expense_types_used)
        result["step2_auxiliary_enabled"] = {"passed": passed, "errors": errors}
        if not passed:
            return result

        passed, errors = self.validate_auxiliary_details(employees, expense_types_used)
        result["step3_auxiliary_details"] = {"passed": passed, "errors": errors}
        if not passed:
            return result

        result["all_passed"] = True
        return result

    def format_validation_result(self, result: Dict) -> str:
        output = []
        output.append("=" * 60)
        output.append("会计科目及辅助核算校验报告")
        output.append("=" * 60)

        steps = [
            ("第一步：会计科目存在性校验", result["step1_account_exist"]),
            ("第二步：辅助核算开通校验", result["step2_auxiliary_enabled"]),
            ("第三步：辅助核算明细校验", result["step3_auxiliary_details"]),
        ]

        for step_name, step_result in steps:
            status = "通过" if step_result["passed"] else "不通过"
            output.append(f"\n{step_name}：{status}")
            if step_result["errors"]:
                for err in step_result["errors"]:
                    output.append(f"  - {err}")

        output.append("\n" + "-" * 60)
        if result["all_passed"]:
            output.append("校验结论：全部通过，可以生成凭证")
        else:
            output.append("校验结论：不通过，请先维护缺失项后再重试")
        output.append("=" * 60)

        return "\n".join(output)


def main():
    import argparse
    parser = argparse.ArgumentParser(description="会计科目和辅助核算校验")
    parser.add_argument("--input", "-i", help="输入的JSON文件路径", required=True)
    parser.add_argument("--json", action="store_true", help="以JSON格式输出")
    args = parser.parse_args()

    try:
        with open(args.input, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        print(f"读取输入文件失败：{e}", file=sys.stderr)
        sys.exit(1)

    employees = data.get("employees", [])
    account_list = data.get("account_list", [])
    auxiliary_config = data.get("auxiliary_config", {})
    auxiliary_details = data.get("auxiliary_details", {})
    custom_expense = data.get("custom_expense_accounts")
    custom_other = data.get("custom_other_accounts")

    validator = AccountValidator(
        account_list=account_list,
        auxiliary_config=auxiliary_config,
        auxiliary_details=auxiliary_details,
        custom_expense_accounts=custom_expense,
        custom_other_accounts=custom_other,
    )

    result = validator.validate_all(employees)

    if args.json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print(validator.format_validation_result(result))

    sys.exit(0 if result["all_passed"] else 1)


if __name__ == "__main__":
    main()
