@echo off
set deploy_path="D:\dev-tool\nginx-1.16.1\html\lowcode"

call pnpm install

echo "===================1����װ�������========================="

call pnpm build

echo "===================2��������========================="

rd /s/q  %deploy_path%

md %deploy_path%

echo "===================3��ɾ���ɵĲ�������========================="

xcopy /e/y .\dist %deploy_path%

echo "===================4���������========================="

rd /s/q  .\dist

