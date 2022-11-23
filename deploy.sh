#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build

# 进入构建文件夹
cd dist
# 解决刷新404问题
cp index.html 404.html

# 放置 .nojekyll 以绕过 Jekyll 的处理。
echo > .nojekyll


git init
git checkout -B main
git add -A
git commit -m 'deploy'


git push -f git@github.com:shengjingyin/free.git main:gh-pages

cd -