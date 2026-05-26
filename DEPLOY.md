# 多语种学习平台 - 部署指南

本指南将帮助你将多语种学习平台部署到 Vercel，让更多人可以使用！

## 目录
- [前置准备](#前置准备)
- [快速部署](#快速部署)
- [数据库配置（推荐）](#数据库配置推荐)
- [环境变量配置](#环境变量配置)
- [常见问题](#常见问题)

---

## 前置准备

在开始部署前，请确保你已经：

1. ✅ 有一个 GitHub 账号（用于托管代码）
2. ✅ 有一个 Vercel 账号（免费注册）
3. ✅ 代码已经推送到 GitHub 仓库

---

## 快速部署

### 方法一：使用 Vercel Dashboard（推荐）

1. **推送到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <你的 GitHub 仓库地址>
   git push -u origin main
   ```

2. **登录 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 账号登录

3. **导入项目**
   - 点击 "Add New..." → "Project"
   - 选择你的 GitHub 仓库
   - 点击 "Import"

4. **配置项目**
   - Project Name: 输入你的项目名称（如 `language-learning-platform`）
   - Framework Preset: 会自动识别为 Vite
   - Root Directory: 保持默认
   - Build Command: `npm run build`（已配置）
   - Output Directory: `dist`（已配置）

5. **点击 Deploy**
   - 等待 1-2 分钟
   - 部署成功后会获得一个类似 `https://your-project.vercel.app` 的链接

### 方法二：使用 Vercel CLI

如果你喜欢使用命令行：

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel
```

---

## 数据库配置（推荐）

目前项目使用 JSON 文件存储数据，在 Vercel Serverless 环境中，数据会在每次冷启动后重置。**强烈建议配置数据库以实现数据持久化！**

### 选项 A：使用 Supabase（推荐，免费额度充足）

1. **注册 Supabase**
   - 访问 https://supabase.com
   - 创建账号并登录

2. **创建新项目**
   - 点击 "New Project"
   - 填写项目信息
   - 等待数据库初始化（约 2 分钟）

3. **获取连接信息**
   - 进入 Project Settings → API
   - 复制 `Project URL` 和 `anon/public` key

4. **运行数据库迁移**
   - 进入 SQL Editor
   - 复制 `supabase/migrations/001_init.sql` 的内容
   - 粘贴并运行

5. **安装 Supabase 客户端**
   ```bash
   npm install @supabase/supabase-js
   ```

6. **更新代码以使用 Supabase**
   - 参考 `api/data/storage.ts`，将文件操作替换为 Supabase API 调用

### 选项 B：其他数据库选择

- **MongoDB Atlas**: 免费 512MB 存储
- **PlanetScale**: MySQL 免费版
- **Neon**: PostgreSQL Serverless

---

## 环境变量配置

在 Vercel Dashboard 中配置环境变量：

1. 进入你的项目 → Settings → Environment Variables
2. 添加以下变量（根据需要）：

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NODE_ENV` | 环境类型 | `production` |
| `VITE_API_URL` | API 地址（生产环境留空） | - |

如果你使用了数据库，还需要添加：
- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

---

## 自定义域名

部署成功后，你可以绑定自己的域名：

1. 在 Vercel 项目中进入 Settings → Domains
2. 添加你的域名（如 `learn.yourdomain.com`）
3. 按照提示配置 DNS 解析
4. 等待 SSL 证书签发（通常几分钟）

---

## 常见问题

### Q: 部署后 API 404 怎么办？
A: 检查 `vercel.json` 配置是否正确，确保重写规则已设置。

### Q: 数据丢失了？
A: 这是因为使用 JSON 文件存储在 Serverless 环境中是临时的。请配置数据库。

### Q: 如何更新代码？
A: 只需推送到 GitHub，Vercel 会自动重新部署！

### Q: 免费额度够吗？
A: Vercel 免费版包含：
- 100GB 带宽/月
- 无限次部署
- Serverless Functions 100GB-hours/月
足够初期使用！

---

## 下一步

部署成功后，你可以：
- 🎨 自定义品牌和样式
- 📊 接入分析工具（如 Vercel Analytics）
- 🔒 添加更多安全功能
- 📱 优化移动端体验

祝你部署顺利！🚀
