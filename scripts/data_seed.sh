#!/bin/bash

# These must run in this order
php artisan db:seed --class=AccountDataSeeder --force
php artisan db:seed --class=AddressDataSeeder --force
php artisan db:seed --class=ContactDataSeeder --force
php artisan db:seed --class=UserDataSeeder --force

php artisan db:seed --class=ProductDataSeeder --force

php artisan db:seed --class=ArticleCategoryDataSeeder --force
php artisan db:seed --class=ArticleDataSeeder --force

# Unordered
php artisan db:seed --class=TestimonialDataSeeder --force
php artisan db:seed --class=TaskDataSeeder --force
php artisan db:seed --class=NoteAccountDataSeeder --force
