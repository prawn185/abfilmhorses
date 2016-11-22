@extends('base::layouts.frontend')

{{-- Page Title --}}
@section('page_title')
    {{ $article->meta_title }}
@stop

{{-- Page Meta Data, Robots, index ect --}}
@section('page_meta')

    @var $image = \Netmatters\Article\Article::mainImage($article, 790, 300, true);
    <meta name="description" content="{{ $article->meta_description }}" />
    <meta property="og:description" content="{{ Str::limit(strip_tags($article->meta_description), 100) }}" />
    <meta property="og:image" content="{{ !empty($article->images->first()->src_name) ? $image->src : Config::get('base::frontend.logo.src') }}"/>


@stop

{{-- Canonical Link --}}
@section('page_canonical')
    <link rel="canonical" href="{{ !empty($article->canonical) ? $article->canonical : URL::to($article->getUrl()) }}">
@stop

{{-- Header Css files --}}
@section('header_css')
    @parent
    <link rel="stylesheet" type="text/css" href="{{ Config::get('base::frontend.css') }}article.css" />
@stop

@section('main')

    <section id="article-list" class="content">

        <div class="container">

            <div class="row" id="main" role="main">

                <div class="col-md-12 col-sm-spacer">

                    <div id="article">
 
                        @var $image = \Netmatters\Article\Article::mainImage($article, 790, 300, true);
                        @if (isset($image))
                            {{ HTML::image($image->src, $image->title, ['class' => 'img-responsive news-img']) }}
                        @endif

                        <div class="title">
                            <h3>{{ $article->name }}</h3>
                            <p><i class="fa fa-clock-o"></i>Posted {{ Carbon::parse($article->published_at)->format('d/m/Y') }}</p>
                        </div>

                        {{ $article->content }}

                    </div>

                </div>


            </div>

        </div>

    </section>

@stop
