<!DOCTYPE html>
<!--[if lt IE 7 ]>
<html id="top" lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>
<html id="top" lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>
<html id="top" lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>
<html id="top" lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html id="top" lang="en" class="no-js"> <!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta name="robots" content="noindex, nofollow"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>
        @section('page_title')

        @show
    </title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="{{ Config::get('main.favicon') }}">

    <!-- Header Css files -->
    @section('header_css')
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
    <style>
        *{margin:0;padding:0}
    </style>
    @show

</head>

<body style="font-family: 'Montserrat', 'Open Sans', sans-serif; font-size: 13px; margin: 0px; padding: 0px;">
    <table cellpadding="0" cellspacing="0" width="100%"
           style="margin: 0px; padding: 0px; width: 100%; border-spacing: 0; border-collapse: collapse;">
        <tr>
            <td>
                @include('base::layouts.pdf.header')
            </td>
        </tr>
        <tr width="100%">
            <td width="100%" class="container" style="padding: 20px 50px;">
                <center>
                    @yield('main')
                </center>
            </td>
        </tr>
    </table>
@include('base::layouts.pdf.footer')
</body>
</html>
