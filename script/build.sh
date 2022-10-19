PWD=$(cd `dirname $0`; pwd)
envCheck(){
    if [ -d "${PWD}/frontend" ]; then
        rm -rf ${PWD}/frontend
    fi
}
npmCheck(){
    npm ls npm-run-all
    if [ $? -ne 0 ]; then
        echo "npm-run-all not install."
        npm install npm-run-all
    fi
}
npmBuild(){
    cd $PWD
    npm config set registry https://registry.npm.taobao.org
    npm install
    npm i unplugin-vue-components
    npm run build
}
main(){
    envCheck
    npmCheck
    npmBuild
}
main
