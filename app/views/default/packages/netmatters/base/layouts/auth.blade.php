<!DOCTYPE html>
<!--[if lt IE 7 ]> <html id="top" lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html id="top" lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html id="top" lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html id="top" lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html id="top" lang="en" class="no-js login-page"> <!--<![endif]-->

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        {{-- Page Title --}}
        <title>
            @yield('page_title', 'Login')
        </title>

        {{-- Page Meta Data, Robots, index ect --}}
        @yield('page_meta')

        {{-- Favicon --}}
        <link rel="shortcut icon" href="{{ Config::get('base::admin.favicon') }}">

        <!-- Header Css files -->
        @section('header_css')
            <link rel="stylesheet" type="text/css" href="{{ Config::get('base::admin.css') }}admin-bootstrap.css" />
            <link rel="stylesheet" type="text/css" href="{{ Config::get('base::admin.css') }}admin-fonts.css" />
            <link rel="stylesheet" type="text/css" href="{{ Config::get('base::admin.css') }}admin-plugins.css" />
            <link rel="stylesheet" type="text/css" href="{{ Config::get('base::admin.css') }}admin.css" />
        @show

        <!-- IE CSS Override files -->
        <!--[if IE 9]>
            <link rel="stylesheet" type="text/css" href="{{ Config::get('base::admin.css') }}ie/ie9.css" />
        <![endif]-->
        <!--[if IE 8]>
            <link rel="stylesheet" type="text/css" href="{{ Config::get('base::admin.css') }}ie/ie8.css" />
        <![endif]-->
        <!--[if IE 7]>
            <link rel="stylesheet" type="text/css" href="{{ Config::get('base::admin.css') }}ie/ie7.css" />
        <![endif]-->
        <!--[if IE 6]>
            <link rel="stylesheet" type="text/css" href="{{ Config::get('base::admin.css') }}ie/ie6.css" />
        <![endif]-->

        <!-- Header Javascript files -->
        @section('header_javascript')
            {{-- Jquery CDN with local fallback --}}
            <script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.0.min.js"></script>
            <script>window.jQuery || document.write('<script src="{{ Config::get("base::admin.js") }}jquery-1.11.0.min.js"><\/script>')</script>
        @show

        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
          <script src="{{ Config::get('base::admin.js') }}/plugins/html5shiv.js"></script>
          <script src="{{ Config::get('base::admin.js') }}/plugins/respond.min.js"></script>
        <![endif]-->
    </head>

    <body>
        <div id="middle">
            <div class="container">
                @yield('main')
                <div class="clearfix"></div>
            </div><!-- End of .container -->
        </div><!-- End of #middle -->

        {{-- Footer Javascript files --}}
        @section('footer_javascript')
            {{-- Bootstrap CDN --}}
            <script type="text/javascript" src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
        @show
    </body>
</html>
