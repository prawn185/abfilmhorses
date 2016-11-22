@extends('layouts.frontend')

{{-- Page Title --}}
@section('page_title')
    {{ $title }}
@stop

@section('header_css')
    @parent
@stop

@section('page_meta')
    <meta name="description" content="{{ $title }}" />
    <meta property="og:description" content="{{ Str::limit(strip_tags($title), 100) }}" />
    <meta property="og:image" content="{{ Config::get('base::frontend.logo.src') }}"/>
@stop


@section('main')

<section class="main content" id="testimonial-list">

    <div class="container">

        <div class="row">

            <div class="col-sm-6">

            @foreach ($testimonials as $key => $testimonial)

                @if ($key == round(count($testimonials) / 2))
                </div>
                <div class="col-md-6">
                @endif

                @if ($testimonial->description != '')

                    <h2>
                        {{ $testimonial->name }}

                        @if (isset($testimonial->company) && $testimonial->company != '')
                            - <strong>{{ $testimonial->company }}</strong>
                        @endif
                    </h2>

                    <div class="testimonial">
                        {{ $testimonial->description }}
                    </div>

                @endif

            @endforeach

            </div>

        </div>

    </div>

</section>

@stop


@section('footer_javascript')
    @parent
@stop
