<div class="row">

    <ul class="col-sm-6 col-md-3">
        {{ Menu::make('footer_1', 'menu::frontend.partials.static') }}
    </ul>
    <ul class="col-sm-6 col-md-3">
        {{ Menu::make('footer_2', 'menu::frontend.partials.static') }}
    </ul>
    <div class="spacer"></div>
    <ul class="col-sm-6 col-md-3">
        <li><a href="/contact-us">Contact Us</a>
            <ul>
                <li>{{ Config::get('base::company_address') }}</li>
                <li>{{ Config::get('base::company_town') }}</li>
                <li>{{ Config::get('base::company_county') }}</li>
                <li>{{ Config::get('base::company_postcode') }}</li>
                <li>&nbsp;</li>
                <li>Tel: {{ Config::get('base::company_telephone') }}</li>
                <li>Email: {{ HTML::mailto(Config::get('base::company_email')) }}</li>
            </ul>
        </li>
    </ul>
    <ul class="col-sm-6 col-md-3">
        <li><span>Connect</span>
            <ul>
                <li><a href="{{ Config::get('base::twitter') }}"><i class="fa fa-twitter"></i>Twitter</a></li>
                <li><a href="{{ Config::get('base::facebook') }}"><i class="fa fa-facebook"></i>Facebook</a></li>
                <li><a href="{{ Config::get('base::linkedin') }}"><i class="fa fa-linkedin"></i>Linkedin</a></li>
                <li><a href="https://plus.google.com/+NetmattersCoUk/posts"><i class="fa fa-google-plus"></i>Google Plus</a></li>
            </ul>
        </li>
    </ul>

</div>
