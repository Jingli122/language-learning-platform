#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
薪资计提加支付账务处理脚本
根据薪酬数据自动生成计提凭证和支付凭证
"""

import json
import sys
from typing import Dict, List, Tuple, Optional


# 默认科目映射
DEFAULT_ACCOUNT_MAPPING = {
    "expense_accounts": {
        "销售费用": {"code": "66010101", "name": "销售费用_职工薪酬_工资", "auxiliary": ["部门", "职员"]},
        "管理费用": {"code": "66020101", "name": "管理费用_职工薪酬_工资", "auxiliary": ["部门", "职员"]},
        "研发费用": {"code": "5301010101", "name": "研发支出_费用化支出_职工薪酬_工资", "auxiliary": ["部门", "职员"]},
    },
    "payable_account": {"code": "221101", "name": "应付职工薪酬_工资"},
    "social_insurance_account": {"code": "122105", "name": "其他应收款_社会/医疗保险费"},
    "housing_fund_account": {"code": "122106", "name": "其他应收款_住房公积金"},
    "tax_account": {"code": "222108", "name": "应交税费_个人所得税"},
    "bank_account": {"code": "100206", "name": "银行存款_锦鲤银行"},
}


class SalaryVoucherGenerator:
    def __init__(self, account_mapping: Optional[Dict] = None):
        self.account_mapping = account_mapping or DEFAULT_ACCOUNT_MAPPING

    def validate_input(self, employees: List[Dict], company_name: str, salary_year: int, salary_month: int) -> List[str]:
        errors = []
        if not company_name:
            errors.append("缺少公司名称")
        if not salary_year or not salary_month:
            errors.append("缺少工资年月")
        if not employees:
            errors.append("员工数据为空")
            return errors

        required_fields = ["姓名", "部门", "费用类型", "税前工资", "个人社保", "个人公积金", "个税", "实发工资"]
        for i, emp in enumerate(employees, 1):
            missing = [f for f in required_fields if f not in emp or emp[f] is None]
            if missing:
                errors.append(f"第{i}位员工({emp.get('姓名', '未知')})缺少字段: {', '.join(missing)}")
            if emp.get("费用类型") and emp["费用类型"] not in self.account_mapping["expense_accounts"]:
                errors.append(f"第{i}位员工({emp.get('姓名', '未知')})的费用类型'{emp['费用类型']}'不支持")

        return errors

    def calculate_totals(self, employees: List[Dict]) -> Dict:
        totals = {
            "税前工资合计": 0,
            "个人社保合计": 0,
            "个人公积金合计": 0,
            "个税合计": 0,
            "实发工资合计": 0,
        }
        for emp in employees:
            totals["税前工资合计"] += float(emp.get("税前工资", 0))
            totals["个人社保合计"] += float(emp.get("个人社保", 0))
            totals["个人公积金合计"] += float(emp.get("个人公积金", 0))
            totals["个税合计"] += float(emp.get("个税", 0))
            totals["实发工资合计"] += float(emp.get("实发工资", 0))
        return totals

    def generate_accrual_voucher(self, employees: List[Dict], company_name: str, salary_year: int, salary_month: int) -> Dict:
        summary = f"支付{company_name}工资{salary_year}-{salary_month:02d}"
        debit_entries = []
        total_pre_tax = 0

        for emp in employees:
            expense_type = emp["费用类型"]
            account = self.account_mapping["expense_accounts"][expense_type]
            pre_tax = float(emp["税前工资"])
            total_pre_tax += pre_tax

            debit_entries.append({
                "direction": "借",
                "account_code": account["code"],
                "account_name": account["name"],
                "amount": pre_tax,
                "auxiliary": {"部门": emp["部门"], "职员": emp["姓名"]},
                "summary": summary,
            })

        credit_entry = {
            "direction": "贷",
            "account_code": self.account_mapping["payable_account"]["code"],
            "account_name": self.account_mapping["payable_account"]["name"],
            "amount": total_pre_tax,
            "auxiliary": None,
            "summary": summary,
        }

        entries = debit_entries + [credit_entry]
        return {
            "voucher_type": "计提凭证",
            "summary": summary,
            "entries": entries,
            "debit_total": total_pre_tax,
            "credit_total": total_pre_tax,
            "balanced": total_pre_tax == total_pre_tax,
        }

    def generate_payment_voucher(self, employees: List[Dict], company_name: str, salary_year: int, salary_month: int) -> Dict:
        summary = f"支付{company_name}工资{salary_year}-{salary_month:02d}"
        totals = self.calculate_totals(employees)

        debit_entry = {
            "direction": "借",
            "account_code": self.account_mapping["payable_account"]["code"],
            "account_name": self.account_mapping["payable_account"]["name"],
            "amount": totals["税前工资合计"],
            "auxiliary": None,
            "summary": summary,
        }

        credit_entries = [
            {
                "direction": "贷",
                "account_code": self.account_mapping["social_insurance_account"]["code"],
                "account_name": self.account_mapping["social_insurance_account"]["name"],
                "amount": totals["个人社保合计"],
                "auxiliary": None,
                "summary": summary,
            },
            {
                "direction": "贷",
                "account_code": self.account_mapping["housing_fund_account"]["code"],
                "account_name": self.account_mapping["housing_fund_account"]["name"],
                "amount": totals["个人公积金合计"],
                "auxiliary": None,
                "summary": summary,
            },
            {
                "direction": "贷",
                "account_code": self.account_mapping["tax_account"]["code"],
                "account_name": self.account_mapping["tax_account"]["name"],
                "amount": totals["个税合计"],
                "auxiliary": None,
                "summary": summary,
            },
            {
                "direction": "贷",
                "account_code": self.account_mapping["bank_account"]["code"],
                "account_name": self.account_mapping["bank_account"]["name"],
                "amount": totals["实发工资合计"],
                "auxiliary": None,
                "summary": summary,
            },
        ]

        entries = [debit_entry] + credit_entries
        credit_total = totals["个人社保合计"] + totals["个人公积金合计"] + totals["个税合计"] + totals["实发工资合计"]
        return {
            "voucher_type": "支付凭证",
            "summary": summary,
            "entries": entries,
            "debit_total": totals["税前工资合计"],
            "credit_total": credit_total,
            "balanced": totals["税前工资合计"] == credit_total,
        }

    def generate_all_vouchers(self, employees: List[Dict], company_name: str, salary_year: int, salary_month: int) -> Dict:
        errors = self.validate_input(employees, company_name, salary_year, salary_month)
        if errors:
            return {"success": False, "errors": errors}

        accrual_voucher = self.generate_accrual_voucher(employees, company_name, salary_year, salary_month)
        payment_voucher = self.generate_payment_voucher(employees, company_name, salary_year, salary_month)
        totals = self.calculate_totals(employees)

        return {
            "success": True,
            "company_name": company_name,
            "salary_period": f"{salary_year}年{salary_month}月",
            "employee_count": len(employees),
            "totals": totals,
            "vouchers": [accrual_voucher, payment_voucher],
        }

    def format_voucher_output(self, result: Dict) -> str:
        if not result["success"]:
            return "输入数据校验失败：\n" + "\n".join(f"- {e}" for e in result["errors"])

        output = []
        output.append("=" * 60)
        output.append(f"公司名称：{result['company_name']}")
        output.append(f"工资期间：{result['salary_period']}")
        output.append(f"员工人数：{result['employee_count']}人")
        output.append("=" * 60)

        totals = result["totals"]
        output.append("\n【汇总数据】")
        output.append(f"  税前工资合计：{totals['税前工资合计']:.2f}")
        output.append(f"  个人社保合计：{totals['个人社保合计']:.2f}")
        output.append(f"  个人公积金合计：{totals['个人公积金合计']:.2f}")
        output.append(f"  个税合计：{totals['个税合计']:.2f}")
        output.append(f"  实发工资合计：{totals['实发工资合计']:.2f}")

        for voucher in result["vouchers"]:
            output.append("\n" + "-" * 60)
            output.append(f"【{voucher['voucher_type']}】")
            output.append(f"摘要：{voucher['summary']}")
            output.append("-" * 60)
            output.append(f"{'方向':<4} {'科目编码':<14} {'科目名称':<30} {'金额':>12} {'辅助核算'}")
            output.append("-" * 60)

            for entry in voucher["entries"]:
                aux = ""
                if entry["auxiliary"]:
                    aux_parts = [f"{k}:{v}" for k, v in entry["auxiliary"].items()]
                    aux = ", ".join(aux_parts)
                output.append(
                    f"{entry['direction']:<4} "
                    f"{entry['account_code']:<14} "
                    f"{entry['account_name']:<30} "
                    f"{entry['amount']:>12.2f} "
                    f"{aux}"
                )

            output.append("-" * 60)
            output.append(f"借方合计：{voucher['debit_total']:.2f}")
            output.append(f"贷方合计：{voucher['credit_total']:.2f}")
            output.append(f"借贷平衡：{'是' if voucher['balanced'] else '否'}")

        output.append("\n" + "=" * 60)
        return "\n".join(output)


def main():
    import argparse
    parser = argparse.ArgumentParser(description="薪资计提加支付账务处理")
    parser.add_argument("--input", "-i", help="输入的JSON文件路径", required=True)
    parser.add_argument("--output", "-o", help="输出文件路径（可选）")
    parser.add_argument("--json", action="store_true", help="以JSON格式输出")
    args = parser.parse_args()

    try:
        with open(args.input, "r", encoding="utf-8") as f:
            data = json.load(f)
    except Exception as e:
        print(f"读取输入文件失败：{e}", file=sys.stderr)
        sys.exit(1)

    employees = data.get("employees", [])
    company_name = data.get("company_name", "")
    salary_year = data.get("salary_year")
    salary_month = data.get("salary_month")
    custom_mapping = data.get("account_mapping")

    generator = SalaryVoucherGenerator(custom_mapping)
    result = generator.generate_all_vouchers(employees, company_name, salary_year, salary_month)

    if args.json:
        output_str = json.dumps(result, ensure_ascii=False, indent=2)
    else:
        output_str = generator.format_voucher_output(result)

    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(output_str)
        print(f"结果已保存到：{args.output}")
    else:
        print(output_str)


if __name__ == "__main__":
    main()
