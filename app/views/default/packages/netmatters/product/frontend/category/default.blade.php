@extends('layouts.frontend')

{{-- Page Title --}}
@section('page_title')
    {{ $category->title }}
@stop

{{-- Page Meta Data, Robots, index ect --}}
@section('page_meta')
    <meta name="description" content="{{ $category->description }}" />
@stop

{{-- Header Css files --}}
@section('header_css')
    @parent
    <link rel="stylesheet" type="text/css" href="{{ Config::get('base::frontend.css') }}product.css" />
@stop

{{-- Page Title --}}
@section('title')
    {{ $category->name }}
@stop

{{-- Page Content --}}
@section('main')

    <div class="main" role="main">

        <div class="container">

            <div class="row">

                <div class="col-md-3 col-sm-4 spacer-xs">
                    @include('layouts.blocks.sidebar', ['menu' => $categories, 'title' => 'Packages'])
                </div>

                <div class="col-md-9 col-sm-8 content cms">

                    {{ $category->content }}

                </div>

            </div>

        </div>

    </div>

    @if (isset($products) && count($products) > 0)

        <div class="container">

            <h2 class="grey">
                {{ Config::get('product::main.title') }}
            </h2>

        </div>

        <div class="section grey">

            <div class="container">

                <div id="product-list">
                    <div class="row">
                        @include('product::frontend.category.partials.products')
                    </div>
                </div>

                {{ $products->links() }}

            </div>

        </div>

    @endif

@stop

{{-- Footer Js files --}}
@section('footer_javascript')
    @parent
    <script type="text/javascript" src="{{ Config::get('base::frontend.js') }}pages/category.js"></script>
@stop
