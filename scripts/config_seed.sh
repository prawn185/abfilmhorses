#!/bin/bash

# Account
php artisan db:seed --class=AccountSetupSeeder --force
php artisan db:seed --class=AccountTypeTableSeeder --force

# Address
php artisan db:seed --class=AddressSetupSeeder --force
php artisan db:seed --class=AddressTypeTableSeeder --force

# Ads
php artisan db:seed --class=AdsSeeder --force

# Article
php artisan db:seed --class=ArticleSetupSeeder --force

# Base
php artisan db:seed --class=HearAboutUsTableSeeder --force
php artisan db:seed --class=ModuleNavbarGroupTableSeeder --force
php artisan db:seed --class=ModuleTableIconUpdateSeeder --force
php artisan db:seed --class=NotificationSetupSeeder --force
php artisan db:seed --class=SettingSetupSeeder --force
php artisan db:seed --class=SupportSetupSeeder --force
php artisan db:seed --class=TemplatePartialSeeder --force

# Booking
php artisan db:seed --class=BookingTableSeeder --force

# Cart
php artisan db:seed --class=CartSetupSeeder --force
php artisan db:seed --class=DeliveryOptionSeeder --force
php artisan db:seed --class=DeliveryOptionTypeSeeder --force

#Contact
php artisan db:seed --class=ContactSetupSeeder --force

# Document
php artisan db:seed --class=DocumentSetupSeeder --force

# Enquiry
php artisan db:seed --class=EnquirySetupSeeder --force

# Event
php artisan db:seed --class=EventSetupSeeder --force

# Gallery
php artisan db:seed --class=GalleryDatabaseSeeder --force

# Image
php artisan db:seed --class=ImageSetupSeeder --force

# Knowledgebase
php artisan db:seed --class=KnowledgebaseSetupSeeder --force

# Membership
php artisan db:seed --class=MembershipSeeder --force

# Menu
php artisan db:seed --class=MenuSetupSeeder --force

# Newsletter
php artisan db:seed --class=NewsletterSetupSeeder --force

# Order
php artisan db:seed --class=OrderSetupSeeder --force

#Page
php artisan db:seed --class=PageSetupSeeder --force
php artisan db:seed --class=HomePageSeeder --force

#Product
php artisan db:seed --class=ProductSetupSeeder --force

# Quote
php artisan db:seed --class=QuoteSetupSeeder --force

# Sitemap
php artisan db:seed --class=SitemapSeeder --force

# Social
php artisan db:seed --class=SocialSetupSeeder --force

# Task
php artisan db:seed --class=TaskSetupSeeder --force

# Team
php artisan db:seed --class=TeamSetupSeeder --force

# Testimonial
php artisan db:seed --class=TestimonialSetupSeeder --force

# Widget
php artisan db:seed --class=WidgetSeeder --force

# User
php artisan db:seed --class=RoleSetupSeeder --force
php artisan db:seed --class=RoleTableSeeder --force
php artisan db:seed --class=UserSetupSeeder --force
php artisan db:seed --class=UserTableSeeder --force
php artisan db:seed --class=UserRoleTableSeeder --force
php artisan db:seed --class=PermissionRoleTableSeeder --force
php artisan db:seed --class=DashboardTableSeeder --force
php artisan db:seed --class=DashboardWidgetSeeder --force
php artisan db:seed --class=ModuleTableIconUpdateSeeder --force






