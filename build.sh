#!/bin/bash

rm -rf dist && mkdir dist 

npx babel src --out-dir dist --ignore node_modules

cp src/package.son dist

cd dist && yarn install --production --modules-folder node_modules





