@extends('layouts.frontend')

{{-- Page Title --}}
@section('page_title')
    {{ $page->title }}
@stop

{{-- Page Meta Data, Robots, index ect --}}
@section('page_meta')
    <meta name="description" content="{{ $page->description }}" />
    <meta property="og:description" content="{{ $page->description }}" />
    <meta property="og:image" content="{{ Config::get('base::frontend.logo.src') }}"/>
@stop

{{-- Header Css files --}}
@section('header_css')
    @parent
@stop

{{-- Page Content --}}
@section('main')

    <div id="banner">

        @if (Gallery::has(1))

        <div class="container hidden-xs">
            <ul class="slide clearfix">

                @foreach (Gallery::make(1)->images as $key => $image)
                <li class="item">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="item-image" style="background-image: url('{{ ImageHandler::path($image->path . $image->name, "resize", 595) }}')"></div>
                        </div>

                        <div class="col-sm-6">
                            <div class="item-text">
                                <h2>{{ $image->title }}</h2>
                                <div class="clearfix"></div>
                                <p class="description">{{ preg_replace('/\{bullet\}(.*)\{\/bullet\}/i', '<span class="bullet"><span class="tick"><i class="fa fa-check"></i></span>$1</span>', nl2br(Str::limit($image->description, 500))) }}</p>

                                @if ($image->link)
                                <div class="button">
                                    <a href="{{ $image->link }}" class="btn red" {{ strpos($image->link, Request::root()) === false ? 'target="_blank"' : '' }} role="button">
                                        {{ $image->button_text ?: 'Read More' }}
                                        <i class="iconmoon arrow-right"></i>
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>
                    </div>
                </li>
                @endforeach

            </ul>

            <div class="next hidden-xs">
                <div>
                    <span></span>
                    <i class="fa fa-angle-right"></i>
                </div>
            </div>

            <div class="prev hidden-xs">
                <div>
                    <span></span>
                    <i class="fa fa-angle-left"></i>
                </div>
            </div>
        </div>

        @endif

    </div>

    <section id="package-list">

        <div class="container">

            {{ Menu::make('package_menu', 'layouts.blocks.package_menu') }}

        </div>

    </section>

    <section id="testimonial" class="text-center">

        <h3>What our clients think</h3>

        <div class="container">

            <div class="row">

                <div class="col-lg-8 col-lg-offset-2">

                    @include('testimonial::frontend.partials.list', array('limit' => '1'))

                </div>

            </div>

        </div>

    </section>

    <div id="feed-header">

        <div class="container">

            <div class="row">

                <div class="col-md-6">

                    <ul class="nav nav-tabs" role="tablist">
                        <li class="active"><a href="#cs" role="tab" data-toggle="tab">Case Studies</a></li>
                        <li><a href="#b" role="tab" data-toggle="tab">Blog</a></li>
                        <li><a href="#n" role="tab" data-toggle="tab">News</a></li>
                    </ul>

                </div>

                <div class="col-md-6">

                </div>

            </div>

        </div>

    </div>

    <section id="feed-container">

        <div class="tab-content">
            <div class="tab-pane active" id="cs">
                @include('article::frontend.homepage', array('limit' => '20', 'category' => '2'))
            </div>
            <div class="tab-pane" id="b">
                @include('article::frontend.homepage', array('limit' => '20', 'category' => '1'))
            </div>
            <div class="tab-pane" id="n">
                @include('article::frontend.homepage', array('limit' => '20', 'category' => '4'))
            </div>
        </div>

    </section>

@stop

{{-- Footer Js files --}}
@section('footer_javascript')
    @parent
    <script type="text/javascript" src="{{ Config::get('base::frontend.plugins') }}jquery.bxslider.min.js"></script>
@stop
