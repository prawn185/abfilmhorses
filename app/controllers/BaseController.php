<?php

/**
 * Class BaseController
 *
 * @deprecated
 */
class BaseController extends Controller
{
    // Use Netmatters\Base\BaseController instead

    public function getSlide($id)
    {

    	$category = Netmatters\Article\Category::find($id)->id;

    	$count = 20;
    	return View::make('article::frontend.homepage', compact('category', 'count'));

    }
}
