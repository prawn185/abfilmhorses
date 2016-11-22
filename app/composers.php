<?php


// Register The Composer files
View::composers(
    array(
        'NewsSingleComposer' => array(
            'page.news.partials.single'
        ),
        'Sysflow\Composers\ArticleComposer' => array(
            'page::frontend.partials.articles'
        ),
    )
);
