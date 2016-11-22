<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

	<title>Unauthorised</title>

    <!-- Bootstrap Core CSS -->
    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet" type="text/css">

    <!-- Fonts -->
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href='http://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>

	<style>
	body {
		width: 100%;
		height: 100%;
		font-family: Lora,"Helvetica Neue",Helvetica,Arial,sans-serif;
		color: #fff;
		background-color: #000;
	}

	html {
		width: 100%;
		height: 100%;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin: 0 0 35px;
		text-transform: uppercase;
		font-family: Montserrat,"Helvetica Neue",Helvetica,Arial,sans-serif;
		font-weight: 700;
		letter-spacing: 1px;
	}

	p {
		margin: 0 0 25px;
		font-size: 18px;
		line-height: 1.5;
	}

	@media(min-width:767px) {
		p {
			margin: 0 0 35px;
			font-size: 20px;
			line-height: 1.6;
		}
	}

	a {
		color: #28c3ab;
		-webkit-transition: all .2s ease-in-out;
		-moz-transition: all .2s ease-in-out;
		transition: all .2s ease-in-out;
	}

	a:hover,
	a:focus {
		text-decoration: none;
		color: #176e61;
	}

	.light {
		font-weight: 400;
	}

	.navbar {
		margin-bottom: 0;
		border-bottom: 1px solid rgba(255,255,255,.3);
		text-transform: uppercase;
		font-family: Montserrat,"Helvetica Neue",Helvetica,Arial,sans-serif;
		background-color: #000;
	}

	.navbar-brand {
		font-weight: 700;
	}

	.navbar-brand:focus {
		outline: 0;
	}

	.navbar-custom a {
		color: #fff;
	}

	.navbar-custom .nav li a {
		-webkit-transition: background .3s ease-in-out;
		-moz-transition: background .3s ease-in-out;
		transition: background .3s ease-in-out;
	}

	.navbar-custom .nav li a:hover,
	.navbar-custom .nav li a:focus,
	.navbar-custom .nav li.active {
		outline: 0;
		background-color: rgba(255,255,255,.2);
	}

	.navbar-toggle {
		padding: 4px 6px;
		font-size: 16px;
		color: #fff;
	}

	.navbar-toggle:focus,
	.navbar-toggle:active {
		outline: 0;
	}

	@media(min-width:767px) {
		.navbar {
			padding: 20px 0;
			border-bottom: 0;
			letter-spacing: 1px;
			background: 0 0;
			-webkit-transition: background .5s ease-in-out,padding .5s ease-in-out;
			-moz-transition: background .5s ease-in-out,padding .5s ease-in-out;
			transition: background .5s ease-in-out,padding .5s ease-in-out;
		}

		.top-nav-collapse {
			padding: 0;
			background-color: #000;
		}

		.navbar-custom.top-nav-collapse {
			border-bottom: 1px solid rgba(255,255,255,.3);
		}
	}

	.intro {
		display: table;
		width: 100%;
		height: auto;
		padding: 100px 0;
		text-align: center;
		color: #fff;
		background: url(http://www.netmatters.co.uk/assets/error.jpg) no-repeat bottom center scroll;
		background-color: #000;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		background-size: cover;
		-o-background-size: cover;
	}

	.intro-body {
		display: table-cell;
		vertical-align: middle;
	}

	.brand-heading {
		font-size: 32px;
	}

	.intro-text {
		font-size: 18px;
	}

	@media(min-width:767px) {
		.intro {
			height: 100%;
			padding: 0;
		}

		.brand-heading {
			font-size: 60px;
		}

		.intro-text {
			font-size: 25px;
		}
	}

	.btn-circle {
		width: 70px;
		height: 70px;
		margin-top: 15px;
		padding: 7px 16px;
		border: 2px solid #fff;
		border-radius: 35px;
		font-size: 40px;
		color: #fff;
		background: 0 0;
		-webkit-transition: background .3s ease-in-out;
		-moz-transition: background .3s ease-in-out;
		transition: background .3s ease-in-out;
	}

	.btn-circle:hover,
	.btn-circle:focus {
		outline: 0;
		color: #fff;
		background: rgba(255,255,255,.1);
	}

	.page-scroll .btn-circle i.animated {
		-webkit-transition-property: -webkit-transform;
		-webkit-transition-duration: 1s;
		-moz-transition-property: -moz-transform;
		-moz-transition-duration: 1s;
	}

	.page-scroll .btn-circle:hover i.animated {
		-webkit-animation-name: pulse;
		-moz-animation-name: pulse;
		-webkit-animation-duration: 1.5s;
		-moz-animation-duration: 1.5s;
		-webkit-animation-iteration-count: infinite;
		-moz-animation-iteration-count: infinite;
		-webkit-animation-timing-function: linear;
		-moz-animation-timing-function: linear;
	}

	@-webkit-keyframes pulse {    
		0 {
			-webkit-transform: scale(1);
			transform: scale(1);
		}

		50% {
			-webkit-transform: scale(1.2);
			transform: scale(1.2);
		}

		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}

	@-moz-keyframes pulse {    
		0 {
			-moz-transform: scale(1);
			transform: scale(1);
		}

		50% {
			-moz-transform: scale(1.2);
			transform: scale(1.2);
		}

		100% {
			-moz-transform: scale(1);
			transform: scale(1);
		}
	}

	.content-section {
		padding-top: 100px;
	}

	@media(min-width:767px) {
		.content-section {
			padding-top: 250px;
		}

	}

	.btn {
		text-transform: uppercase;
		font-family: Montserrat,"Helvetica Neue",Helvetica,Arial,sans-serif;
		font-weight: 400;
		-webkit-transition: all .3s ease-in-out;
		-moz-transition: all .3s ease-in-out;
		transition: all .3s ease-in-out;
	}

	.btn-default {
		border: 1px solid #28c3ab;
		color: #28c3ab;
		background-color: transparent;
	}

	.btn-default:hover,
	.btn-default:focus {
		border: 1px solid #28c3ab;
		outline: 0;
		color: #000;
		background-color: #28c3ab;
	}

	.btn-huge {
		padding: 25px;
		font-size: 26px;
	}

	.banner-social-buttons {
		margin-top: 0;
	}

	::-moz-selection {
		text-shadow: none;
		background: #fcfcfc;
		background: rgba(255,255,255,.2);
	}

	::selection {
		text-shadow: none;
		background: #fcfcfc;
		background: rgba(255,255,255,.2);
	}

	img::selection {
		background: 0 0;
	}

	img::-moz-selection {
		background: 0 0;
	}

	body {
		webkit-tap-highlight-color: rgba(255,255,255,.2);
	}
	</style>
	
</head>

<body id="page-top" data-spy="scroll" data-target=".navbar-custom">

    <nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
        <div class="container">

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse navbar-right navbar-main-collapse">
                <ul class="nav navbar-nav">
                    <li class="page-scroll">
                        <a href="mailto:support@netmatters.com?subject=Site Under Maintenance">Email Support</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <section class="intro">
        <div class="intro-body">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <h1 class="brand-heading">Unauthorised</h1>
                        <p class="intro-text">The server could not load your page.</p>
						<p>Please check back shortly or contact our <a href="mailto:support@netmatters.com?subject=Site Under Maintenance">Email Support</a></p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Core JavaScript Files -->
    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>

</body>

</html>
