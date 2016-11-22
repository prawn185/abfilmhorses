<?php

return array(
    'admin' => array(
        'product' => array(
            'controller' =>   'Netmatters\Product\AdminProductController'
        ),
        'option' => array(
            'controller' =>   'Netmatters\Product\AdminProductOptionController'
        ),
        'image' => array(
            'controller' =>   'Netmatters\Product\AdminProductImageController'
        ),
        'seo' => array(
            'controller' =>   'Netmatters\Product\AdminProductSeoController'
        ),
        'attribute' => array(
            'controller' =>   'Netmatters\Product\AdminProductAttributeController'
        ),
        'category' => array(
            'controller' =>   'Netmatters\Product\AdminProductCategoryController',
            'image' => array(
                'controller' => 'Netmatters\Product\AdminProductCategoryImageController'
            ),
            'related' => [
                'controller' => 'Netmatters\Product\AdminProductCategoryRelatedController',
            ],
            'seo'   => array(
                'controller' => 'Netmatters\Product\AdminProductCategorySeoController'
            ),
        ),
        'related' => [
            'controller' => 'Netmatters\Product\AdminRelatedController',
        ],
    ),

    'frontend' => array(
        'product' => array(
            'controller' => 'ProductController'
        ),
        'category' => array(
            'controller' => 'ProductCategoryController'
        )
    ),
);
