<!-- Fixed navbar -->
<div class="navbar" role="navigation">
    <div class="container">

        <div class="row">
            <a href="/" class="col-xs-8 col-sm-5 col-lg-4 logo">
                {{ HTML::image(Config::get('base::frontend.logo.src'), 'Scalable Business Information Systems by Sysflow') }}
            </a>

            <div class="col-xs-4 col-sm-7 col-lg-8" id="top-menu">

                <a href="tel:{{ str_replace(' ', '', Config::get('base::company_telephone')) }}" class="telephone-number hidden-xs">
                    {{ Config::get('base::company_telephone') }}
                </a>

                <button type="button" class="navbar-toggle">
                    <span class="sr-only"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <div id="main-menu" class="collapse navbar-collapse">

                    {{-- Load in the CMS menu block --}}
                    <ul class="nav navbar-nav navbar-right">
                        {{ Menu::make('main_menu', 'menu::frontend.partials.menu') }}
                    </ul>

                </div>

            </div><!--/.nav-collapse -->

        </div>
    </div>
</div>

<div class="visible-xs clearfix telephone-xs">
    <div class="container">
        <a href="tel:{{ str_replace(' ', '', Config::get('base::company_telephone')) }}" class="btn red btn-block">
            {{ Config::get('base::company_telephone') }}
        </a>
    </div>
</div>
