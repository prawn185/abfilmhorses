#!/bin/bash

# rm -rf public/packages

php artisan asset:publish netmatters/account
php artisan asset:publish netmatters/address
php artisan asset:publish netmatters/base
php artisan asset:publish netmatters/booking
php artisan asset:publish netmatters/cart
php artisan asset:publish netmatters/contact
php artisan asset:publish netmatters/order
php artisan asset:publish netmatters/page
php artisan asset:publish netmatters/quote
php artisan asset:publish netmatters/task
php artisan asset:publish netmatters/user
