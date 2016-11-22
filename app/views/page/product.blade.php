@extends('layouts.frontend')


{{-- Header Css files --}}
@section('header_css')
    @parent
    <link rel="stylesheet" type="text/css" href="{{ Config::get('base::frontend.css') }}product.css" />
@stop


{{-- Page Content --}}
@section('main')

    <div class="main content"  role="main">
        <div class="container">

            <div class="row">

                <div class="col-md-3 col-sm-4 spacer-xs">
                    <nav id="sidebar">
                        <div class="title">
                            <div class="row">
                                <div class="col-xs-6"></div>
                                <div class="col-xs-6"></div>
                            </div>
                            <h2>Packages</h2>
                        </div>
                        @foreach ($attributes as $attribute)
                        <ul>
                                <li>
                                    <a href="/modules/{{ Str::slug($attribute->name, $separator = '-') }}">
                                        {{ $attribute->name }}
                                    </a>
                                </li>
                        </ul>
                        @endforeach
                    </nav>
                </div>
                @foreach ($products as $product)
                        <div class="col-md-8 product">
                            @var $itemImage = \NmProduct::mainImage($product, 400, 250, false);
                            <div class="item">
                                <div class="row">
                                    @if ($itemImage)
                                        
                                        <div class="col-xs-4">
                                            <a href="{{ $product->getUrl() }}" title="View {{ $product->name }}">
                                                <img src = "{{ $itemImage->src }}"/>
                                            </a>        
                                        </div>

                                    @endif

                                    <div class="col-xs-{{ $itemImage ? 8 : 12 }}">

                                        <div class="copy">
                                            <h4>
                                                <a href="{{ $product->getUrl() }}" title="View {{ $product->name }}">
                                                    {{ $product->name }}
                                                </a>
                                            </h4>

                                            <p>
                                                {{ Str::limit(strip_tags($product->summary), 90) }}
                                            </p>

                                            <a href="{{ $product->getUrl() }}" class="btn red">
                                                Read More
                                                <i class="iconmoon arrow-right"></i>
                                            </a>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    @endforeach
            </div>
        </div>
    </div>
@stop

{{-- Footer Js files --}}
@section('footer_javascript')
    @parent
@stop