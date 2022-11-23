@echo off
set deploy_path="D:\dev-tool\nginx-1.16.1\html\lowcode"
set build_path=".\dist"
set item_path=%cd%
echo %item_path%
pause
call pnpm install

echo "===================1、install success========================="

call pnpm build

echo "===================2、build success========================="

rd /s/q  %deploy_path%

md %deploy_path%

echo "===================3、clear success========================="

@REM 部署本地 nginx
copy %build_path%\index.html %build_path%\404.html

echo > .nojekyll
xcopy /e/y %build_path% %deploy_path%

echo "===================4、nginx deploy success========================="

@REM 部署远程github-page
cd %build_path%
call git init
call git checkout -B main
call git add -A
call git commit -m 'deploy'

call git push -f git@github.com:shengjingyin/free.git main:gh-pages
echo "===================5、github deploy success========================="
cd ../
rd /s/q  %build_path%

