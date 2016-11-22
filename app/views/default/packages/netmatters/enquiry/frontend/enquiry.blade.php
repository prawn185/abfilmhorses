@extends('base::layouts.frontend')

{{-- Page Title --}}
@section('page_title')
    Contact Us
@stop

{{-- Page Meta Data, Robots, index ect --}}
@section('page_meta')
    <meta name="description" content="{{ Config::get('enquiry::main.name') }} Page"/>
    <meta property="og:description" content="{{ Config::get('enquiry::main.name') }} Page" />
    <meta property="og:image" content="{{ Config::get('base::frontend.logo.src') }}"/>
@stop

{{-- Header Css files --}}
@section('header_css')
    @parent
@stop

{{-- Page Content --}}
@section('main')

    <section id="contact" class="content">

        <div class="container">

            <div class="row">

                <div class="col-xs-12">
                    <h1>Contact Us</h1>
                </div>

                <div class="col-md-6 col-sm-spacer">

                    {{-- Enquiry Form --}}
                    @include('enquiry::frontend.partial.form')

                </div>

                <div class="col-md-6">
                    <div class="copy">
                        <p>Get in touch using the contact details below:</p>
                    </div>

                    <div class="social-icons clearfix">
                        <a href="{{ Config::get('base::twitter') }}">
                            {{ HTML::image(Config::get('base::frontend.images') . 'icons/twitter.jpg', 'Follow us on twitter') }}
                        </a>
                        <a href="{{ Config::get('base::facebook') }}">
                            {{ HTML::image(Config::get('base::frontend.images') . 'icons/facebook.jpg', 'Like us on facebook') }}
                        </a>
                        <a href="{{ Config::get('base::linkedin') }}">
                            {{ HTML::image(Config::get('base::frontend.images') . 'icons/linkedin.jpg', 'Follow us on linkedIn') }}
                        </a>
                        <a href="{{ Config::get('base::google_plus') }}">
                            {{ HTML::image(Config::get('base::frontend.images') . 'icons/google-plus.jpg', 'Add us on Google Plus') }}
                        </a>
                    </div>

                    <div class="row">

                        <div class="col-sm-6">

                            <p><strong>{{ Config::get('base::company_name') }}</strong></p>
                            <p>{{ Config::get('base::company_address') }}<br />
                            {{ Config::get('base::company_town') }}<br />
                            {{ Config::get('base::company_county') }}<br />
                            {{ Config::get('base::company_postcode') }}</p>

                        </div>

                        <div class="col-sm-6">

                            <p>Tel: {{ Config::get('base::company_telephone') }}</p>
                            <p>E-mail: {{ HTML::mailto(Config::get('base::company_email')) }}</p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </section>

    {{-- Map --}}
    @include('enquiry::frontend.partial.map')

@stop

{{-- Footer Js files --}}
@section('footer_javascript')
    @parent
    <script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false"></script>
    {{ HTML::script(Config::get('base::frontend.packages') . 'enquiry/assets/js/enquiry.js') }}
@stop
