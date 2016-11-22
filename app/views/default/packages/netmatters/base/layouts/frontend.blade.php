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
        <title>
            @yield('page_title')
        </title>

        <meta property="og:title" content="@yield('page_title') | {{ Config::get('base::company_name') }}" />

        {{-- Page Meta Data, Robots, index ect --}}
        <meta name="robots" content="index, follow" />
        @yield('page_meta')

        {{-- Page Canonical Link --}}
        @yield('page_canonical', '<link rel="canonical" href="' . URL::current() . '">')

        {{-- Favicon --}}
        <link rel="shortcut icon" href="{{ Config::get('base::frontend.favicon') }}">

        {{-- Header Css files --}}
        @section('header_css')
            <link href='//fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
            <link rel="stylesheet" type="text/css" href="{{ Config::get('base::frontend.css') }}frontend-bootstrap.css" />
            <link rel="stylesheet" type="text/css" href="{{ Config::get('base::frontend.css') }}frontend.css" />
        @show

        {{-- Header Javascript files --}}
        @section('header_javascript')
        @show

        {{-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries --}}
        <!--[if lt IE 9]>
        <script src="{{ Config::get('base::frontend.js') }}html5shiv.js"></script>
            <script src="{{ Config::get('base::frontend.js') }}respond.min.js"></script>
        <![endif]-->

        @if(!empty($htmlSnipits))
            @foreach ($htmlSnipits as $snipit)
                @if($snipit->position == 'header')
                    {{ $snipit->code }}
                @endif
            @endforeach
        @endif
            @include('base::layouts.frontend.blocks.tracking')
    </head>

    <body>



        <div id="container">

            {{-- Header section --}}
            <header id="header">
                @include('base::layouts.frontend.blocks.menu')
            </header>

            {{-- Breadcrumb section --}}
            @if (!Request::is('/'))
                @include('base::layouts.frontend.blocks.breadcrumbs')
            @endif

            {{-- Content section --}}
            <div id="middle">
                <div class="container">
                    {{-- @include('base::layouts.frontend.blocks.notice') --}}
                </div>
                @yield('main')
            </div>


            {{-- Footer Main section --}}
            <footer id="footer">
                <div class="container">
                    @include('base::layouts.frontend.blocks.footer')
                </div>
            </footer>

            {{-- Footer Base section --}}
            <footer id="base" class="hidden-xs hidden-sm">
                <div class="container">
                    @include('base::layouts.frontend.blocks.footer-base')
                </div>
            </footer>

            <!-- Netmatters Uptime Ping Test Response -->

        </div>

        {{-- Utilities, js / ie warning, modal ect --}}
        @include('base::layouts.frontend.blocks.utilities')

        {{-- Footer Javascript files --}}
        @section('footer_javascript')
            <script type="text/javascript" src="{{ Config::get('base::frontend.js') }}jquery-1.11.0.min.js"></script>
            <script type="text/javascript" src="{{ Config::get('base::frontend.js') }}bootstrap.min.js"></script>
            <script type="text/javascript" src="{{ Config::get('base::admin.js') }}plugins/jquery.validate.js"></script>
            <script type="text/javascript" src="{{ Config::get('base::frontend.plugins') }}snap.js"></script>
            <script type="text/javascript" src="{{ Config::get('base::frontend.js') }}main.js"></script>
            <script type="text/javascript">
            WebFontConfig = {
                google: { families: [ 'Open+Sans:400italic,600italic,400,600,700:latin', 'Raleway:400,500,600,700:latin' ] }
            };

            (function() {
                var wf = document.createElement('script');
                wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
                wf.type = 'text/javascript';
                wf.async = 'true';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(wf, s);
            })();
            </script>

        @show

        <!-- Quantcast Tag -->
        <script type="text/javascript">
        var _qevents = _qevents || [];

        (function() {
            var elem = document.createElement('script');
            elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
            elem.async = true;
            elem.type = "text/javascript";
            var scpt = document.getElementsByTagName('script')[0];
            scpt.parentNode.insertBefore(elem, scpt);
        })();

        _qevents.push({
            qacct:"p-kB7qqYTRVv695"
        });
        </script>

            <noscript>
        <div style="display:none;">
        <img src="//pixel.quantserve.com/pixel/p-kB7qqYTRVv695.gif" border="0" height="1" width="1" alt="Quantcast"/>
        </div>
        </noscript>
        <!-- End Quantcast tag -->

        @if(!empty($htmlSnipits))
            @foreach ($htmlSnipits as $snipit)
                @if($snipit->position == 'footer')
                    {{ $snipit->code }}
                @endif
            @endforeach
        @endif


    </body>

</html>
