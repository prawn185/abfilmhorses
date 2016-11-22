@extends('layouts.frontend')

{{-- Page Title --}}
@section('page_title')
    {{ $title }}
@stop

{{-- Page Meta Data, Robots, index ect --}}
@section('page_meta')
    <meta name="description" content="FAQ's" />
    <meta property="og:description" content="FAQ's" />
    <meta property="og:image" content="{{ Config::get('base::frontend.logo.src') }}"/>
@stop

{{-- Header Css files --}}
@section('header_css')
    @parent
@stop

{{-- Page Content --}}
@section('main')

    <section id="faqs" role="main" class="main content">

        <div class="container">

            <div class="row">

                <div class="col-md-8 col-sm-spacer">

                    <h2>Lorem ipsum dolor sit amet</h2>
                    <hr class="header" />

                    <div class="panel-group" id="accordion">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                              <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                                  Collapsible Group Item #1
                                </a>
                              </h4>
                            </div>
                            <div id="collapseOne" class="panel-collapse collapse in">
                              <div class="panel-body">
                                <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.</p>

                                <p>Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              </div>
                            </div>
                            </div>
                            <div class="panel panel-default">
                            <div class="panel-heading">
                              <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                                  Collapsible Group Item #2
                                </a>
                              </h4>
                            </div>
                            <div id="collapseTwo" class="panel-collapse collapse">
                              <div class="panel-body">
                                <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              </div>
                            </div>
                            </div>
                            <div class="panel panel-default">
                            <div class="panel-heading">
                              <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                                  Collapsible Group Item #3
                                </a>
                              </h4>
                            </div>
                            <div id="collapseThree" class="panel-collapse collapse">
                              <div class="panel-body">
                                <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              </div>
                            </div>
                        </div>
                    </div>

                    <h2>In enim justo</h2>
                    <hr class="header" />

                    <div class="panel-group" id="accordion_2">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                              <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion_2" href="#collapseFour">
                                  Collapsible Group Item #1
                                </a>
                              </h4>
                            </div>
                            <div id="collapseFour" class="panel-collapse collapse">
                              <div class="panel-body">
                                <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et.</p>

                                <p>Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              </div>
                            </div>
                            </div>
                            <div class="panel panel-default">
                            <div class="panel-heading">
                              <h4 class="panel-title">
                                <a data-toggle="collapse" data-parent="#accordion_2" href="#collapseFive">
                                  Collapsible Group Item #2
                                </a>
                              </h4>
                            </div>
                            <div id="collapseFive" class="panel-collapse collapse">
                              <div class="panel-body">
                                <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</p>
                              </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-md-4" id="right-col-container">

                    <div id="right-col">

                        <h2>Couldn't find your answer?</h2>
                        <hr class="header" />

                        <p>Morbi risus nisl, adipiscing vel sagittis sit amet, condimentum vitae lectus. Pellentesque nec eros nulla. Vivamus nec ligula dolor. In facilisis suscipit gravida. Nunc malesuada.<br />&nbsp;</p>

                        {{ HTML::link('contact-us', 'Ask a question', array('class' => 'btn red')) }}

                    </div>

                </div>

            </div>

        </div>

    </section>

@stop

{{-- Footer Js files --}}
@section('footer_javascript')
    @parent
@stop
