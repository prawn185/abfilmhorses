<?php

class NewsComposer
{
    public function compose($view)
    {
        // If any data has been passed from the include then get it
        $viewData = $view->getData();

        $limit = $viewData['limit'];

        // All External Netmatters News Articles
        $news = NmNews::join('news_site_pivot', 'news.newsid', '=', 'news_site_pivot.news_id')
            ->where('shownews', 'Show')->where('news_site_pivot.domain_id', Config::get('base::main.netmatters.domain_id'))
            ->orderBy('newsdate', 'DESC')->groupBy('news.newsid')->take($limit)->get();

        // Pass the data to the view partial
        $view->with(['news' => $news]);
    }
}
