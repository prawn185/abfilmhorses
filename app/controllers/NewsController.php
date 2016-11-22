<?php

class NewsController extends BaseController
{

    public function __construct()
    {
        // Domain ID
        $this->domainId = Config::get('base::netmatters_domain_id');
    }

    /*
     * ---------------------------------------------------------------
     * News List
     * ---------------------------------------------------------------
     */

    public function getNews()
    {

        // All External Netmatters News Articles
        $news = NmNews::join('news_site_pivot', 'news.newsid', '=', 'news_site_pivot.news_id')
            ->where('shownews', 'Show')->where('news_site_pivot.domain_id', $this->domainId)
            ->orderBy('newsdate', 'DESC')->groupBy('news.newsid')->paginate(12);

        return View::make('page.news.list', compact('news'));
    }


    /*
     * ---------------------------------------------------------------
     * News Article
     * ---------------------------------------------------------------
     */

    public function getArticle($url)
    {

        // All External Netmatters News Articles
        $news = NmNews::join('news_site_pivot', 'news.newsid', '=', 'news_site_pivot.news_id')
            ->where('shownews', 'Show')->where('news_site_pivot.domain_id', $this->domainId)->get();

        // Check Path against news articles
        foreach ($news as $val) {

            if ($url == Str::slug($val->newstitle)) {
                $id = $val->newsid;
                break;
            }
        }

        // Check we have an ID
        if (!isset($id)) {
            App::abort(404);
        }

        // Load Post
        $post = NmNews::find($id);

        // Set Canonical
        $netmattersDomains = Config::get('base::main.company.domains');

        if (!empty($post->primary_domain_id) && $post->primary_domain_id != $this->domainId) {
            $post->canonical = $netmattersDomains[$post->primary_domain_id] . 'news/' . Str::slug($post->newstitle);
        }

        // Replace URLS
        $post->newscontent = str_replace(Config::get('base::main.company.netmatters.non-secure') . 'contact-us', URL::to('/contact-us'), $post->newscontent);

        return View::make('page.news.post', compact('post'));

    }

    public function getNewsSlide()
    {
        // All External Netmatters News Articles
        $news = NmNews::join('news_site_pivot', 'news.newsid', '=', 'news_site_pivot.news_id')
            ->where('shownews', 'Show')->where('news_site_pivot.domain_id', $this->domainId)
            ->orderBy('newsdate', 'DESC')->groupBy('news.newsid')->take(20)->get();

        return View::make('page::frontend.partials.homepage', compact('news'));
    }

}
