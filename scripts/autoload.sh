#!/bin/bash

for dir in ../workbench/netmatters/*; do (cd "$dir" && composer dump-autoload); done

cd ../
php artisan dump-autoload