@template('Default')
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


    @if ($page->images && count($page->images) > 0)

        <div id="internalbanner">
            <div class="load loading">
                <div class="loader"></div>
                <div id="owl-internal" class="owl-carousel owl-theme" data-snap-ignore="true">
                    @foreach ($page->images as $key => $image)
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


    <div class="main content"  role="main">
        <div class="container">
            
            <div class="row">

                <div class="col-xs-12">
                    <h1>
                        @section('title')
                            {{ isset($name) ? $name : (isset($page) ? $page->name : '') }}
                        @show
                    </h1>
                </div>


                <div class="col-md-12 cms">

                    @foreach ($page->partials as $partial)
                        {{ $partial->present()->frontend }}
                    @endforeach

                </div>

                @if ($products = $page->getRelated('Product'))
                    @foreach ($products as $RelatedProduct)
                        <div class="col-md-6">
                            <div class="related-panel">
                                <div class="row">
                                    <div class="col-md-5">
                                        {{-- Image Object: Set last param as false to remove placeholder ---}}
                                        @var $image = $RelatedProduct->coverImage(275, 200);

                                        @if (isset($image))
                                            <a href="{{ $RelatedProduct->getUrl() }}">
                                                {{ HTML::image($image->src, $image->title, ['class' => 'img-responsive', 'width' => '100%']) }}
                                            </a>
                                        @endif
                                    </div>
                                    <div class="col-md-7">
                                        <div class="panel-heading">
                                            <h3 class="panel-title">
                                                <a href="{{ $RelatedProduct->getUrl() }}">
                                                    {{ $RelatedProduct->name }}
                                                </a>
                                            </h3><br>
                                            <p>{{ str_limit(strip_tags($RelatedProduct->content), $limit = 105, $end = '...') }}</p>
                                            <a class="blue-button" href="{{ $RelatedProduct->getUrl() }}">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @endif

                @if ($pages = $page->getRelated('Page'))
                    @foreach ($pages as $RelatedPage)
                        <div class="col-md-6">
                            <div class="related-panel">
                                <div class="row">
                                    <div class="col-md-5">
                                        {{-- Image Object: Set last param as false to remove placeholder ---}}
                                        @var $image = $RelatedPage->coverImage(275, 200);

                                        @if (isset($image))
                                            <a href="{{ $RelatedPage->getUrl() }}">
                                                {{ HTML::image($image->src, $image->title, ['class' => 'img-responsive', 'width' => '100%']) }}
                                            </a>
                                        @endif
                                    </div>
                                    <div class="col-md-7">
                                        <div class="panel-heading">
                                            <h3 class="panel-title">
                                                <a href="{{ $RelatedPage->getUrl() }}">
                                                    {{ $RelatedPage->name }}
                                                </a>
                                            </h3><br>
                                            <p>{{ str_limit(strip_tags($RelatedPage->content), $limit = 105, $end = '...') }}</p>
                                            <a class="blue-button" href="{{ $RelatedPage->getUrl() }}">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @endif

                @if ($articles = $page->getRelated('Article'))
                    @foreach ($articles as $RelatedArticle)
                        <div class="col-md-6">
                            <div class="related-panel">
                                <div class="row">
                                    <div class="col-md-5">
                                        {{-- Image Object: Set last param as false to remove placeholder ---}}
                                        @var $image = $RelatedArticle->coverImage(275, 200);

                                        @if (isset($image))
                                            <a href="{{ $RelatedArticle->getUrl() }}">
                                                {{ HTML::image($image->src, $image->title, ['class' => 'img-responsive', 'width' => '100%']) }}
                                            </a>
                                        @endif
                                    </div>
                                    <div class="col-md-7">
                                        <div class="panel-heading">
                                            <h3 class="panel-title">
                                                <a href="{{ $RelatedArticle->getUrl() }}">
                                                    {{ $RelatedArticle->name }}
                                                </a>
                                            </h3><br>
                                            <p>{{ str_limit(strip_tags($RelatedArticle->content), $limit = 105, $end = '...') }}</p>
                                            <a class="blue-button" href="{{ $RelatedArticle->getUrl() }}">Read More</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @endif

                @if ($testimonials = $page->getRelated('Testimonial'))
                    @foreach ($testimonials as $RelatedTestimonial)

                        <div class="col-md-6">
                            <div class="related-panel">
                                <div class="row">
                                    <div class="col-md-5">
                                        {{-- Image Object: Set last param as false to remove placeholder ---}}
                                        @var $image = $RelatedTestimonial->coverImage(275, 200);

                                        @if (isset($image))
                                            <a href="{{ $RelatedTestimonial->path }}">
                                                {{ HTML::image($image->src, $image->title, ['class' => 'img-responsive', 'width' => '100%']) }}
                                            </a>
                                        @endif
                                    </div>
                                    <div class="col-md-7">
                                        <div class="panel-heading">
                                            <h3 class="panel-title">
                                                <a href="{{ $RelatedTestimonial->path }}">
                                                    {{ $RelatedTestimonial->name }}
                                                </a>
                                            </h3><br>
                                            <p>{{ str_limit(strip_tags($RelatedTestimonial->description), $limit = 105, $end = '...') }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                @endif

            </div>

        </div>{{-- End of .container --}}
    </div>
@stop

{{-- Footer Js files --}}
@section('footer_javascript')
    @parent
    <script type="text/javascript" src="{{ Config::get('base::frontend.plugins') }}owl.carousel.min.js"></script>
@stop
