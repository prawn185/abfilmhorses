@template('Homepage')
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
    <link rel="stylesheet" type="text/css" href="{{ Config::get('base::frontend.css') }}owl.carousel.css" />
    <link rel="stylesheet" type="text/css" href="{{ Config::get('base::frontend.css') }}owl.theme.css" />
    <link rel="stylesheet" type="text/css" href="{{ Config::get('base::frontend.css') }}owl.transitions.css" />
@stop

{{-- Page Content --}}
@section('main')

    @if (Gallery::has(1))

        <div id="homepagebanner">
            <div class="load loading">
                <div class="loader"></div>
                <div id="owl-demo" class="owl-carousel owl-theme" data-snap-ignore="true">
                    @foreach (Gallery::make(1)->images as $key => $image)
                        <div class="item">
                            <a href="{{ $image->link }}">
                                <img src="{{ ImageHandler::path($image->path . $image->name, "resize", '2000') }}" class="img-responsive" alt="{{ $image->name }}">
                            </a>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        <div class="clearfix"></div>

    @endif

    <div class="main content home" role="main">

        <div class="container">

            <div class="row">

                <div class="col-md-12 cms">

                    @foreach ($page->partials as $partial)
                        {{ $partial->present()->frontend }}
                    @endforeach

                </div>

            </div>

        </div>{{-- End of .container --}}

    </div>

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

    {{-- homepage articles --}}
    @include('page::frontend.partials.articles')

@stop

{{-- Footer Js files --}}
@section('footer_javascript')
    @parent
    <script type="text/javascript" src="{{ Config::get('base::frontend.plugins') }}owl.carousel.min.js"></script>
    <script type="text/javascript" src="//maps.google.com/maps/api/js?sensor=false"></script>
    {{ HTML::script(Config::get('base::frontend.packages') . 'enquiry/assets/js/enquiry.js') }}
@stop