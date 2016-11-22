<?php

/*
 *---------------------------------------------------------------
 * REDIRECT ROUTES
 *---------------------------------------------------------------
*/

Route::get('content-management-system', function() {
	return Redirect::to('/', 301);
});

Route::get('news/almary-green', function() {
	return Redirect::to('/case-studies/almary-green', 301);
});

Route::get('article', function() {
	return Redirect::to('/', 301);
});

Route::get('testimonials', function() {
	return Redirect::to('/case-studies', 301);
});

Route::get('small-business-websites', function() {
	return Redirect::to('/', 301);
});

Route::get('farnell-clarke', function() {
	return Redirect::to('/case-studies/farnell-clarke', 301);
});

Route::get('news/html', function() {
	return Redirect::to('/', 301);
});

Route::get('module/contact-manager-module', function() {
	return Redirect::to('/', 301);
});



Route::get('task-management-systems', function() {
	return Redirect::to('/task-management-software', 301);
});
Route::get('new-modules', function() {
	return Redirect::to('/modules', 301);
});
Route::get('sysflow-project-management-software', function() {
	return Redirect::to('/project-management-software', 301);
});
Route::get('sysflow-quote-engines', function() {
	return Redirect::to('/quoting-software', 301);
});
Route::get('news/news/dragon-boat-racing-team-scoops-top-spot', function() {
	return Redirect::to('/news/dragon-boat-racing-team-scoops-top-spot', 301);
});
Route::get('news/news/netmatters-strengthens-business-development-graham-tester-joins-the-team', function() {
	return Redirect::to('/news/netmatters-strengthens-business-development-graham-tester-joins-the-team', 301);
});
Route::get('news/news/business-development-executive', function() {
	return Redirect::to('/news/business-development-executive', 301);
});
Route::get('sysflow-business-software', function() {
	return Redirect::to('/solutions', 301);
});
Route::get('news/news/netmatters-merges-with-premier-networks', function() {
	return Redirect::to('/news/netmatters-merges-with-premier-networks', 301);
});
Route::get('modules/make', function() {
	return Redirect::to('/modules', 301);
});
Route::get('news/collease', function() {
	return Redirect::to('/news', 301);
});
Route::get('bookeeping-software', function() {
	return Redirect::to('/bookkeeping-software', 301);
});
Route::get('structutal-analysis-software', function() {
	return Redirect::to('/structural-analysis-software', 301);
});
Route::get('civil-engineeing-software', function() {
	return Redirect::to('/civil-engineering-software', 301);
});
Route::get('logisitcs-software', function() {
	return Redirect::to('/logistics-software', 301);
});
Route::get('claims-managemnet-software', function() {
	return Redirect::to('/claims-management-software', 301);
});
Route::get('cash-regsiter-software', function() {
	return Redirect::to('/cash-Register-software', 301);
});
Route::get('news/news/team-members-recognised-with-notable-employee-accolade', function() {
	return Redirect::to('/news/team-members-recognised-with-notable-employee-accolade', 301);
});

Route::get('/cdn-cgi/nexp/dok3v=1613a3a185/', function() {
	return Redirect::to('/', 301);
});
Route::get('/custom-development', function() {
	return Redirect::to('/', 301);
});
Route::get('/ecommerce-website-package', function() {
	return Redirect::to('/ecommerce-websites', 301);
});
Route::get('/modules/model', function() {
	return Redirect::to('/modules', 301);
});
Route::get('/modules/new-attribute', function() {
	return Redirect::to('/modules', 301);
});
Route::get('/news/category/company-news', function() {
	return Redirect::to('/news', 301);
});
Route::get('/news/category/website-development', function() {
	return Redirect::to('/news', 301);
});
Route::get('/news/first4auto', function() {
	return Redirect::to('/news', 301);
});
Route::get('/news/news/auction-house-uk-win-two-gold-awards', function() {
	return Redirect::to('/news/auction-house-uk-win-two-gold-awards', 301);
});
Route::get('/news/news/august039s-notable-employee-recognitions', function() {
	return Redirect::to('/news/august039s-notable-employee-recognitions', 301);
});
Route::get('/news/news/finely-tuned-athletes-run-wild-at-netmatters', function() {
	return Redirect::to('/news/finely-tuned-athletes-run-wild-at-netmatters', 301);
});
Route::get('/news/news/netmatters-are-happy-to-announce-our-first-apprentice', function() {
	return Redirect::to('/news/netmatters-are-happy-to-announce-our-first-apprentice', 301);
});
Route::get('/news/news/netmatters-welcomes-new-project-manager', function() {
	return Redirect::to('/news/netmatters-welcomes-new-project-manager', 301);
});
Route::get('/news/news/ready-to-take-your-website-to-the-next-level', function() {
	return Redirect::to('/news/ready-to-take-your-website-to-the-next-level', 301);
});
Route::get('/news/news/september039s-notable-employee-recognitions', function() {
	return Redirect::to('/news/september039s-notable-employee-recognitions', 301);
});
Route::get('/news/sysflow-platform-is-on-its-way', function() {
	return Redirect::to('/news', 301);
});
Route::get('/standard-website-package', function() {
	return Redirect::to('/', 301);
});
Route::get('/sysflow-crm', function() {
	return Redirect::to('/crm-systems', 301);
});
Route::get('/sysflow-ecommerce-package', function() {
	return Redirect::to('/ecommerce-websites', 301);
});
Route::get('/sysflow-hybrid-cms', function() {
	return Redirect::to('/content-management-systems', 301);
});
Route::get('/the-scalable-solution', function() {
	return Redirect::to('/about-us', 301);
});




Route::get(
	'slide/{id}', [
		'as' => 'frontend.slide',
		'uses' => 'BaseController@getSlide'
	]
);

Route::get(
	'news', [
		'as' => 'frontend.news',
		'uses' => 'NewsController@getNews'
	]
);

Route::get(
	'news/{url}', [
		'as' => 'frontend.news.article',
		'uses' => 'NewsController@getArticle'
	]
);

Route::get(
	'news-slide', [
		'as' => 'frontend.news.slide',
		'uses' => 'NewsController@getNewsSlide'
	]
);
