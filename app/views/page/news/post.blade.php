@extends('layouts.frontend')

{{-- Page Title --}}
@section('page_title')
    {{ $post->newstitle }}
@stop

{{-- Page Meta Data, Robots, index ect --}}
@section('page_meta')
    <meta name="description" content="{{ $post->newstitle }}" />
@stop

{{-- Canonical Link --}}
@section('page_canonical')
    <link rel="canonical" href="{{ !empty($post->canonical) ? $post->canonical : URL::current() }}">
@stop

{{-- Header Css files --}}
@section('header_css')
    @parent
    {{ HTML::style(Config::get('base::frontend.css') . 'plugins/owl.carousel.css') }}
    {{ HTML::style(Config::get('base::frontend.css') . 'news.css') }}
@stop

{{-- Header Title --}}
@section('title')
    {{ $post->newstitle }}
@stop

{{-- Page Content --}}
@section('main')

    <section id="article-list">

        <div id="post">

            <div class="container">

                <div class="row">

                    <div class="col-md-6 spacer-xs spacer-sm cms content">

                        <div class="title">
                            <h3>{{ $post->newstitle }}</h3>
                            <p><i class="fa fa-clock-o"></i>Posted {{ Carbon::createFromTimeStamp($post->newsdate)->diffForHumans() }}</p>
                        </div>

                        {{ nl2br($post->newscontent) }}
                    </div>

                    <div class="col-md-6">

                        @if ($images = $post->images)

                            <div class="image-slider">

                                @foreach ($images as $image)
                                    <div class="slide">
                                        {{ HTML::image(Config::get('base::news_uploads') . $image->filename, $post->newstitle, ['class' => 'img-full']) }}
                                    </div>
                                @endforeach

                            </div>

                        @endif

                    </div>

                </div>

            </div>

        </div>

    </section>

@stop

{{-- Footer Js files --}}
@section('footer_javascript')
    @parent
    {{ HTML::script(Config::get('base::frontend.plugins') . 'owl.carousel.min.js') }}
    {{ HTML::script(Config::get('base::frontend.js') . 'news.js') }}
@stop
