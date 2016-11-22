<?php


use Netmatters\Article\Category;
use Netmatters\Article\Interfaces\ArticleCommentRepository;

use Netmatters\Article\Interfaces\ArticleRepository;
use Netmatters\Article\Interfaces\CategoryRepository;
use Netmatters\Article\Validators\ArticleCommentValidator;


/**
 * Class ArticleController
 *
 * @package Netmatters\Article
 */
class ArticleController extends Netmatters\Article\ArticleController
{
    /**
     * Constructor
     *
     * @param ArticleRepository       $articleRepository
     * @param CategoryRepository      $categoryRepository
     * @param ArticleCommentValidator $articleCommentValidator
     */
    public function __construct(ArticleRepository $articleRepository, CategoryRepository $categoryRepository, ArticleCommentValidator $articleCommentValidator, ArticleCommentRepository $articleCommentRepository)
    {
        $this->articleRepository  = $articleRepository;
        $this->categoryRepository = $categoryRepository;

        $this->articleCommentRepository = $articleCommentRepository;
        $this->articleCommentValidator = $articleCommentValidator;

        $this->article = $this->articleRepository->getModel();
        $this->comment = $this->articleCommentRepository->getModel();
    }


    /**
     * Get post function
     *
     * @param $url
     * @return \Illuminate\View\View
     */
    public function getPost($url)
    {
        $article = $this->articleRepository->findUrlOr404($url);

        if($article->status == 'Hidden') {

            $cat = $article->categories()->allActiveItems()->first();

            if(!empty($cat)) {
                return Redirect::to($cat->url)->with(['message' => 'Article not found']);
            } else {
                return Redirect::to('/')->with(['danger' => 'Article not found']);
            }

        }

        $comment = $this->articleCommentRepository->getModel();
        return View::make('article::frontend.post', compact('article', 'comment'));
    }



    /**
     * Get category function
     *
     * @param $url
     * @return \Illuminate\View\View
     */
    public function getCategory($url)
    {
        $category = $this->categoryRepository->findUrlOr404($url);
        $articles = $category->articleList;

        $parent = false;
        if ($category && $category->parent_id != 0) {
            $parent = Category::find($category->parent_id);

            if (!$parent || $parent->status != 'Live') {
                $parent = false;
            }
        }

        # Use first category as a fallback
        if (!$category || !$parent) {
            $category = Category::allActiveItems()->where('parent_id', 0)->first();
            $parent = false;
        }


        // Breadcrumbs override
        $breadcrumbs = [
            [
                'url'   => URL::to('/'),
                'label' => 'Home'
            ],
            [
                'url'   => URL::route('frontend.article.category_' . (!$parent ? $category->id : $parent->id)),
                'label' => (!$parent ? $category->name : $parent->name)
            ],
            $category->name
        ];

        return View::make('article::frontend.index', compact('category', 'articles', 'breadcrumbs'));
    }


}
