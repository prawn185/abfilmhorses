@extends('layouts.frontend')

{{-- Page Title --}}
@section('page_title')
    {{ Config::get('base::company_name') }} News
@stop

{{-- Page Meta Data, Robots, index ect --}}
@section('page_meta')
    <meta name="description" content="" />
@stop

{{-- Header Title --}}
@section('title')
    News
@stop

{{-- Page Content --}}
@section('main')

    <section id="article-list" class="news">

        <div class="container">

            @if (count($news) > 0)

                <div class="row">

                    @foreach ($news as $key => $item)

                        <div class="col-md-6">

                            @include('page.news.partials.item')

                        </div>

                        @if (($key + 1) % 2 === 0)
                            <div class="clearfix hidden-sm"></div>
                        @endif

                    @endforeach

                </div>

                {{ $news->links() }}

            @endif

        </div>

    </section>

@stop

{{-- Footer Js files --}}
@section('footer_javascript')
    @parent
@stop
