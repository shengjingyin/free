@echo off
@REM ���ط���Ŀ¼
set deploy_path="D:\dev-tool\nginx-1.16.1\html\lowcode"
@REM ���Ŀ¼
set build_path=".\dist"
@REM ��Ŀ����·��
set item_path=%cd%

echo "=================== start ========================="

call pnpm install

echo "=================== install success ========================="

call pnpm build

echo "=================== build success ========================="

rd /s/q  %deploy_path%

md %deploy_path%

echo "=================== clear success ========================="

@REM ���𱾵� nginx
copy %build_path%\index.html %build_path%\404.html
cd %build_path%
echo > .nojekyll

xcopy /e/y %build_path% %deploy_path%

echo "=================== nginx deploy success ========================="

@REM ����Զ��github-page
call git init
call git config user.name "shengjingyin"
call git config user.email "739178270@qq.com"
call git checkout -B main
call git add -A
call git commit -m 'deploy'
call git remote add github https://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@github.com/shengjingyin/free.git

call git push -f github main:gh-pages
echo "=================== github deploy success ========================="
cd %item_path%
rd /s/q  %build_path%

echo "=================== end ========================="
