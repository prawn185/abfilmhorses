@extends('layouts.frontend')


@section('header_css')
    @parent
    <link rel="stylesheet" type="text/css" href="{{ Config::get('base::frontend.css') }}frontend/quote.min.css"/>
@stop


@section('main')
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                {{ $testimonials->description }}
                <p><strong>{{ $testimonials->name }}</strong></p>
                <p style="text-align:center;"><a href="{{ URL::route('frontend.testimonial.list') }}">Go Back</a></p>
            </div>
        </div>
    </div>
@stop


@section('footer_javascript')
    @parent
@stop
