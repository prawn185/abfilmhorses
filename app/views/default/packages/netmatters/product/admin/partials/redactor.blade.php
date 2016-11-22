@section('header_css')
    @parent
    <link rel="stylesheet" type="text/css" href="{{ Config::get('base::admin.js') }}plugins/redactor/redactor.css" />
@stop

<div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12">
        {{ Form::textarea('content', $product->content,
            array(
                'class'             => 'form-control focus-popover hasRedactor',
                'placeholder'       => 'Enter description here',
                'rows'              => '20',
                'data-url'          => URL::to(Config::get('base::admin_prefix')).'/image/',
                'data-document-url' => URL::route('admin.document.list')
            )
        )}}
    </div>{{-- End of .column --}}

    <div class="col-xs-12 col-sm-12 col-md-12">
        <div class="wysiwyg-footer">
            <div class="word-count pull-left"></div>
            <div class="draft-state pull-right"></div>
            <div class="clearfix"></div>
        </div>
    </div>{{-- End of .column --}}
</div>{{-- End of .row --}}

@section('footer_javascript')
    @parent
    <script type="text/javascript" src="{{ Config::get('base::admin.js') }}plugins/redactor/redactor.min.js"></script>
@stop
