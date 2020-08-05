#!/usr/bin/env sh

set -e

cd front
npm run build
rm -Rf ../back/public
mkdir ../back/public
mv dist/* ../back/public/
rmdir dist

cd -
