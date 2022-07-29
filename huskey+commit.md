# husky7.0.1 + commitlint 配置提交代码检查和规范踩坑指南

## husky 安装

### 项目内安装

```shell
npm i lint-staged husky -save-dev
```

### 创建.husky/目录并指定该目录为 git hooks 所在的目录

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```
