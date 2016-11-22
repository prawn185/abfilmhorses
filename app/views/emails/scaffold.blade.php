@section('pre_html')

@show

<!DOCTYPE html>
<html lang="en-US">
	<head>
		<meta charset="utf-8">

		<title>
			@section('email_title')

			@show
		</title>

		<style type="text/css">
			#outlook a{padding:0;} /* Force Outlook to provide a "view in browser" button. */
			body{
				width:100% !important;
				margin:0;
			}

			body{-webkit-text-size-adjust:none;} /* Prevent Webkit platforms from changing default text sizes. */
			body{margin:0; padding:0;}
			img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
			table td{border-collapse:collapse;}
			#backgroundTable{height:100% !important; margin:0; padding:0; width:100% !important;}

			@import url(http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700); /* Loading Open Sans Google font */

			body,
			#backgroundTable{
				background-color:#FFF;
				font-family:Open Sans;
				font-size: 13px;
			}

			.TopbarLogo{
				padding:10px;
				text-align:left;
				vertical-align:middle;
			}
			h1, .h1{
				color:#444444;
				display:block;
				font-family:Open Sans;
				font-size:35px;
				font-weight: 400;
				line-height:100%;
				margin-top:2%;
				margin-right:0;
				margin-bottom:1%;
				margin-left:0;
				text-align:left;
			}
			h2, .h2{
				color:#444444;
				display:block;
				font-family:Open Sans;
				font-size:30px;
				font-weight: 400;
				line-height:100%;
				margin-top:2%;
				margin-right:0;
				margin-bottom:1%;
				margin-left:0;
				text-align:left;
			}
			h3, .h3{
				color:#444444;
				display:block;
				font-family:Open Sans;
				font-size:24px;
				font-weight:400;
				margin-top:2%;
				margin-right:0;
				margin-bottom:1%;
				margin-left:0;
				text-align:left;
			}
			h4, .h4{
				color:#444444;
				display:block;
				font-family:Open Sans;
				font-size:18px;
				font-weight:400;
				line-height:100%;
				margin-top:2%;
				margin-right:0;
				margin-bottom:1%;
				margin-left:0;
				text-align:left;
			}
			h5, .h5{
				color:#444444;
				display:block;
				font-family:Open Sans;
				font-size:14px;
				font-weight:400;
				line-height:100%;
				margin-top:2%;
				margin-right:0;
				margin-bottom:1%;
				margin-left:0;
				text-align:left;
			}
			.textdark {
				color: #444444;
				font-family: Open Sans;
				font-size: 13px;
				line-height: 150%;
				text-align: left;
			}
			.textwhite {
				color: #fff;
				font-family: Open Sans;
				font-size: 13px;
				line-height: 150%;
				text-align: left;
			}
			.fontwhite { color:#fff; }
			.btn {
				background-color: #e5e5e5;
				background-image: none;
				filter: none;
				border: 0;
				box-shadow: none;
				padding: 7px 14px;
				text-shadow: none;
				font-family: "Segoe UI", Helvetica, Arial, sans-serif;
				font-size: 14px;
				color: #333333;
				cursor: pointer;
				outline: none;
				-webkit-border-radius: 0 !important;
				-moz-border-radius: 0 !important;
				border-radius: 0 !important;
			}
			.btn:hover,
			.btn:focus,
			.btn:active,
			.btn.active,
			.btn[disabled],
			.btn.disabled {
				font-family: "Segoe UI", Helvetica, Arial, sans-serif;
				color: #333333;
				box-shadow: none;
				background-color: #d8d8d8;
			}
			.btn.red {
				color: white;
				text-shadow: none;
				background-color: #d84a38;
			}
			.btn.red:hover,
			.btn.red:focus,
			.btn.red:active,
			.btn.red.active,
			.btn.red[disabled],
			.btn.red.disabled {
				background-color: #bb2413 !important;
				color: #fff !important;
			}
			.btn.green {
				color: white;
				text-shadow: none;
				background-color: #35aa47;
			}
			.btn.green:hover,
			.btn.green:focus,
			.btn.green:active,
			.btn.green.active,
			.btn.green.disabled,
			.btn.green[disabled]{
				background-color: #1d943b !important;
				color: #fff !important;
			}

			.padded {
				border-collapse: collapse;
			}

			.padded td {
				border-color: #dee3e5;
				border-style: solid;
				border-width: 1px;
				padding: 10px;
				text-align: left;
			}

			.padded a {
				color: #2F6FAD;
				font-weight: bold;
				text-decoration: none;
			}

			#total-cost td {
				background-color: #808185;
				border: 1px solid #6f7074;
				color: #fff;
				font-weight: bold;
			}

			#view-quote td {
				background-color: #2F6FAD;
				border: 1px solid #2F6FAD;
				font-weight: bold;
				text-align: center;
			}

			#view-quote td a {
				color: #fff;
			}

			#footer a {
				color: #2F6FAD;
				text-decoration: none;
			}

			#contact {
				font-weight: bold;
				color: #333;
				text-transform: uppercase;
			}

			#contact a {
				color: #333;
				text-decoration: none;
			}

		</style>
	</head>
	<body>
		<table border="0" cellpadding="20" cellspacing="0" width="100%" style="height:52px;">
			<tr>
				<td align="center">
					<center>
						<table border="0" cellpadding="0" cellspacing="0" width="700px" style="height:100%;">
							<tr>
								<td align="left" valign="middle">
									<a href="{{ URL::to('/') }}">
										<img src="{{ URL::to(Config::get('base::frontend.logo.src'))}}"
											alt="{{ Config::get('base::company_name') }}"/>
									</a>
								</td>
								<td align="right" id="contact">
									<p>{{ Config::get('base::company_telephone') }}</p>
									<p>{{ HTML::mailto(Config::get('base::company_email')) }}</p>
								</td>
							</tr>
						</table>
					</center>
				</td>
			</tr>
		</table>

		<table border="0" cellpadding="20" cellspacing="0" width="100%" cellpadding="20">
			<tr>
				<td align="center">
					<center>

						@yield('main')

					</center>
				</td>
			</tr>
		</table>

		<table border="0" cellpadding="0" cellspacing="0" width="100%">
			<tr>
				<td align="center">
					<center>
						<table border="0" cellpadding="0" cellspacing="0" width="700px" style="height:100%;" id="footer">
							<tr>
								<td align="left" valign="middle" style="font-size:12px; padding: 20px 0">

									<a href="{{ URL::to('/terms-and-conditions') }}" target="_blank">
										Terms &amp; Conditions
									</a> &nbsp; • &nbsp;
                                    <a href="{{ URL::route('frontend.enquiry') }}" target="_blank">
                                    	Contact
                                    </a>

								</td>
							</tr>
						</table>
					</center>
				</td>
			</tr>
		</table>
	</body>
</html>
