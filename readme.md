# Demo Sysflow - Written on Laravel 4.2

Documentation for the entire framework can be found on the [Laravel website](http://laravel.com/docs).

## Coding Standards

Whilst working on NetAdmin you should follow and apply the [PSR2 standards](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md).


## Naming Conventions

### Databases


#### Tables

Database Tables should be named in the singular. IE: Format, Employee, Download not Downloads or Employees.


#### Columns

Database Columns should follow the following rules:


### Models

Model names should be named in the singular. IE: Office, Customer, Attachment not Offices, Customers, Attachments


### Packages

Package names should be named in the singular. IE: Office, Customer, Attachment not Offices, Customers, Attachments


### Folder Structure

The models folder structure should follow the following rules:


### Controllers

Controller names should be named in the singular. IE: Office, Customer, Attachment not Offices, Customers, Attachments

Controllers should follow the pattern of one of the following

Admin{Item}Controller - Admin Area Section
{Item}Controller - Front End Section

## Folder Structure

Folders should be laid out in the following...


### Views


#### Naming

View names should follow the following rules:

Partial Views should be prefixed with an underscore. as such **/product/_form.blade.php** would be a partial form view of a product. **/product/add.blade.php** would then be the Add Product page.


#### Folder Structure

Folders should be laid out in the following...


## CSS

Should be separated by


## Routing

Routing should be comprised of Named Routes for the primary functions at a minimum. (view, edit, list, add, delete, undelete)

Currently we are using restful controllers with any additional routes being put in before or after the restful controller.

	// Dashboard
	Route::get('/', array('uses'=>'AdminDashboardController@showDashboard', 'as' => 'adminHome'));

	// Controllers
	Route::controller(
		'users',
		'AdminUserController',
		array(
			'getView' => 'adminUsersView',
			'getEdit' => 'adminUsersEdit',
			'getList' => 'adminUsersList',
			'getAdd' => 'adminUsersAdd',
			'getUndelete' => 'adminUsersUndelete',
			'postDelete' => 'adminUsersDelete'
		)
	);


## Packages

As much code being created should be made generic and placed into a package. This package can then be built upon and pulled into later projects. All packages should be modular and any changes that could break previous sites will need to be made into a new version. Make sure to use the required field correctly and not allow the site to break if a module is not included.

### Creating a package


#### Locally

Create in work bench and hook up to the server. Then create a git submodule to hook into the main NetAdmin repo.


#### Server

	mkdir /home/git/packages/{package}.git;
	cd /home/git/packages/{package}.git;
	git init --bare;

Then create a local git repo and push the workbench git into the new repo
ssh://root@5.77.55.5:1337/home/git/packages/{package}.git


### Including a package

Add the package to the composer.json.

	"repositories": [
	        {
	            "type": "git",
	            "url": "git://5.77.55.5/base.git"
	        }
	    ],

	"require": {
		"netmatters/base":"dev-master"
	},


### Versioning a package


## Useful Commands


### Update Autoloads

This code will update the auto load functions in Laravel.

	php artisan dump-autoload


### Publish Views

This line should be executed from the command line in the root project folder.

	php artisan view:publish --path="workbench/netmatters/{package}/src/views" packages/netmatters/{package}


### Publish assets

	php artisan asset:publish netmatters/base
	php artisan asset:publish --bench netmatters/base


## Deployment Issues

When deploying you need to create extra folders in the app directory. This will become part of the install script eventually.

* app/controllers
* app/models
* app/library
* app/views

First create the project with

	composer create-project laravel/laravel --prefer-dist

Then Add the composer.json and update the config/app with the aliases and providers.

	composer update


## Known Issues


### Products / Categories
If you try to save a category without selecting a product or vice versa an eloquent pivot many to many error is displayed.


### Cart Items
If the same item is added to the cart the quantity does not increase.


### Saving Page with HTML Ents

DomDocument::loadHTML error when saving page with content that contains '&' for example.


## Wishlist


### Packages Short Term


#### Base

Add to base package. An About/Support/Help page. On this page it'll make a call back to us for full information via an ajax json call. Possibly manage this from the admin system?

* Information about us e.g. email or phone number
* Ability to send an email for support directly to us
* List of installed modules and their versions
* List of available modules


#### Note

A polymorphic notes package with partial and modal forms


#### Log

A polymorphic log module which can be called in any controller to log against something


#### Mailchimp / Campaign Monitor


#### Nexmo SMS API


#### Document Library

Expand the document module to include a Sharepoint style document library

* Folders
* User permissions.



#### Image Library
* Resize Function
* Crop Function
* Watermark Function


#### CMS

Package to manage the front-end of the site in an SEO friendly fashion

* Manage URL changes (Add 301 redirects)
* Menus Static/Dynamic
* Images / Image Library
* Page Layout
* Blog Layout
* Blog Items Layout
* WYSIWYG editor (redactor)
* Slug field
* Page Title
* Page Description
* Page Keywords
* Canonical Url
* Tags
* Facebook, Google+ meta data
* Categories
* HTML Sitemap
* XML Sitemap


#### Ecommerce System
* Categories
* Products
* Orders
* Invoices
* Payment Gateways (Stripe)


#### Maps API
* Google Maps
* Google Street View
* Map Snapshot
* Draw Area
* Radius Search
* Multiple Pins
* Google Places, i.e pubs ect


#### Charts


### Packages Long Term


#### Employee Holiday / Sickness


#### Inventory Management

Manage office equipment e.g PCs, monitors, mobile phones


#### SEO Module add-on for CMS


#### HR Module

* Holiday, Sickness
* Employee Training/Management
* Payroll
* Pension Check. Mandatory checks every 6 months.
* Procedure checks. Health and Safety, Fire drill. Some reoccurring, some on start etc.


#### Login System
* Facebook
* Twitter
* Google


#### Project Management
* Larger system to manage projects
* Allow collaborative messages, documents and tasks assigned to each
* Internal and external email messages. Store against Customer / Project / Task


#### Postcode
* Postcode Anywhere


#### Import / Export formats
* XML
* JSON
* CSV
* Excel
* PDF
* Word
* FTP


#### Site Search
