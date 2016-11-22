<!DOCTYPE html>
<!--[if lt IE 7 ]> <html id="top" lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html id="top" lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html id="top" lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html id="top" lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html id="top" lang="en" class="no-js"> <!--<![endif]-->

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        {{-- Page Title --}}
        <title>@yield('page_title', Config::get('base::company_name'))</title>

        {{-- Favicon --}}
        <link rel="shortcut icon" href="{{ Config::get('base::frontend.favicon') }}">

        {{-- Header Css files --}}
        @section('header_css')
            <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet" type="text/css">
            <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet" type="text/css">
            <link href='//fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
            <link href='//fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>
            <link rel="stylesheet" type="text/css" href="{{ Config::get('base::admin.css') }}error.css" />
        @show
    </head>


    <body id="page-top" data-spy="scroll" data-target=".navbar-custom">

        {{-- Header section --}}
        <nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
            <div class="container">
                <div class="collapse navbar-collapse navbar-right navbar-main-collapse">
                    <ul class="nav navbar-nav">
                        <li class="page-scroll">
                            <a href="mailto:support@netmatters.com?subject=Site Under Maintenance">Email Support</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


        {{-- Content section --}}
        <section class="intro">
            <div class="intro-body">
                <div class="container">

                    @yield('main')

                </div>
            </div>
        </section>


        {{-- Footer Javascript files --}}
        @section('footer_javascript')
            <script src="//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
        @show
    </body>
</html>