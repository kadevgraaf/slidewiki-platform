#!/bin/bash

echo "
    ___ _ _    _   __      ___ _   _ 
   / __| (_)__| |__\ \    / (_) |_(_)
   \__ \ | / _\` / -_) \/\/ /| | / / |
   |___/_|_\__,_\___|\_/\_/ |_|_\_\_|

"
env | grep "SLIDEWIKI_.*"

cat /nodeApp/microservices.js.template | envsubst > /nodeApp/configs/microservices.js
npm run build
