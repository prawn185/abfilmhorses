@template('Category')
@extends('base::layouts.frontend')

{{-- Page Title --}}
@section('page_title')
    {{ $page->title }}
@stop

{{-- Page Meta Data, Robots, index ect --}}
@section('page_meta')
    <meta name="description" content="{{ $page->description }}" />
    <meta property="og:description" content="{{ Str::limit(strip_tags($page->description), 100) }}" />
    <meta property="og:image" content="{{ !empty($page->images->first()->filename) ? Config::get('base::main.company.netmatters.uploads') . $page->images->first()->filename : Config::get('base::frontend.logo.src') }}"/>
@stop

{{-- Header Css files --}}
@section('header_css')
    @parent
@stop

{{-- Page Content --}}
@section('main')
    <div class="main content"  role="main">
        <div class="container">

            <div class="row">

                <div class="col-md-12">
                    <h1>
                        @section('title')
                            {{ isset($title) ? $title : (isset($page) ? $page->title : '') }}
                        @show
                    </h1>
                </div>

                <div class="col-md-12 cms">

                    @foreach ($page->partials as $partial)
                        {{ $partial->present()->frontend }}
                    @endforeach

                    {{ Menu::make('main_menu', 'menu::frontend.partials.modules') }}

                </div>

            </div>

        </div>{{-- End of .container --}}
    </div>
@stop

{{-- Footer Js files --}}
@section('footer_javascript')
    @parent
@stop
