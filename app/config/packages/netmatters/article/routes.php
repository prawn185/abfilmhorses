<?php

return array(
    'admin'    => array(
        'article' => array(
            'controller' => 'Netmatters\Article\AdminArticleController',
            'category'   => array(
                'controller' => 'Netmatters\Article\AdminArticleCategoryController'
            ),
            'related'    => [
                'controller' => 'Netmatters\Article\AdminRelatedController',
            ]
        )
    ),
    'frontend' => array(
        'category' => array(
            'controller' => 'Netmatters\Article\ArticleController',
        ),
        'article'  => array(
            'controller' => 'Netmatters\Article\ArticleController',
        )
    )
);
