#!/bin/bash

# 读取输入的指定值
specifiedValue=$1

# 判断操作系统类型
if [[ "$(uname)" == "Darwin" ]]; then
  isMac=true
elif [[ "$(expr substr $(uname -s) 1 5)" == "Linux" ]]; then
  isLinux=true
elif [[ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ]]; then
  isWindows=true
fi

# 设置默认环境变量
if [[ $specifiedValue == "prod" ]]; then
  defaultEnv="prod"
elif [[ $specifiedValue == "dev" ]]; then
  if [[ $isMac == true ]]; then
    defaultEnv="dev"
  else
    defaultEnv="devWin"
  fi
else
  defaultEnv=$specifiedValue
fi

# 要修改的文件路径
filePath="src/config/env.ts"

# 替换默认环境值
sed -i'' "s/const defaultEnv = '.*'/const defaultEnv = '${defaultEnv}'/" $filePath

echo "默认环境值已成功修改为: $defaultEnv"
