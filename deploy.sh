#!/bin/bash
echo '-----------------clean-------------------'
rm -rf dist
echo 'clean success'

echo '-----------------build-------------------'
. ~/.nvm/nvm.sh
nvm use v15.2.0
yarn run build

echo '----------------tar dist-----------------'
tar -czvf wenzhou-visual.tar.gz ./dist

echo '------------upload dist.tar.gz-----------'
scp ./wenzhou-visual.tar.gz  root@8.136.176.8:/root

echo '--------------ssh and deploy-------------'
ssh root@8.136.176.8 "cd /home/docker/nginx-docker/data/wenzhou-visual;sh deploy.sh"

