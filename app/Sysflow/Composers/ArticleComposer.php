<?php

namespace Sysflow\Composers;

use Netmatters\Article\Category;

class ArticleComposer
{

    /*
     * ---------------------------------------------------------------
     * GET MENU
     * ---------------------------------------------------------------
     */

    public function compose($view)
    {

        $viewData = $view->getData();

        $category_ids = ['10', '11', '13'];

        $categories = Category::where('status', 'Live')->whereIn('id', $category_ids)->orderBy('order')->get();
        $category = $categories->first();
        // Pass the data to the partial
        $view->with(
            array(
                'first_category' => $category,
                'categories'  => $categories,

            )
        );

    }
}


