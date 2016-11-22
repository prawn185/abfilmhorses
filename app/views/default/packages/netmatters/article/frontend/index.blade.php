@extends('base::layouts.frontend')

{{-- Page Title --}}
@section('page_title')
    {{ $category->meta_title }}
@stop

{{-- Page Meta Data, Robots, index ect --}}
@section('page_meta')
    <meta name="description" content="{{ $category->meta_description }}" />
    <meta property="og:description" content="{{ $category->meta_description }}" />
    <meta property="og:image" content="{{ Config::get('base::frontend.logo.src') }}"/>

@stop

{{-- Canonical Link --}}
@section('page_canonical')
    <link rel="canonical" href="{{ !empty($category->canonical) ? $category->canonical : URL::current() }}">
@stop

{{-- Header Css files --}}
@section('header_css')
    @parent
    <link rel="stylesheet" type="text/css" href="{{ Config::get('base::frontend.css') }}article.css" />
@stop

@section('main')

    <section id="article-list" class="content">

        <div class="container" id="main">

            <div class="row">

                <div class="col-md-8 col-sm-spacer">

                        @if ($articles->count() >= 1)
                            @foreach ($articles as $article)
                            <div id="article">
                                @include('article::frontend.partials.article')
                                </div>
                            @endforeach
                        @else
                            <p>There are no articles within this section.</p>
                        @endif

                        {{ $articles->links(); }}

                </div>

                <div class="col-md-4">

                    @include('article::frontend.partials.navigation', array('cat' => $category->parent_id == 0 ? $category->id : $category->parent_id))
                </div>

            </div>

        </div>

    </section>

@stop
