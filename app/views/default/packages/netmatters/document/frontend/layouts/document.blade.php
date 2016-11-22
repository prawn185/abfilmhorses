@extends('base::layouts.frontend')

@section('main')
<div class="main content" role="main">
    <div class="container">
        <div class="row">
            <div id="main" class="col-xs-12" role="main">

                <div class="col-md-3">
                    @include('document::frontend.layouts.partials.navigation')
                </div>

                <div class="col-md-9">
                    @yield('document-main')
                </div>

            </div>
        </div>
    </div>
</div>
@stop
