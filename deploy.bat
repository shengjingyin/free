@echo off
set deploy_path="D:\dev-tool\nginx-1.16.1\html\lowcode"

call pnpm install

echo "===================1、安装依赖完成========================="

call pnpm build

echo "===================2、打包完成========================="

rd /s/q  %deploy_path%

md %deploy_path%

echo "===================3、删除旧的部署包完成========================="

xcopy /e/y .\dist %deploy_path%

echo "===================4、部署完成========================="

rd /s/q  .\dist

