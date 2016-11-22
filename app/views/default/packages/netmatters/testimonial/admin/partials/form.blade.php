{{-- Header CSS --}}
@section('header_css')
    @parent
    <link rel="stylesheet" type="text/css" href="{{ Config::get('base::admin.js') }}plugins/redactor/redactor.css" />
@stop

<div class="panel panel-default">
    <div class="panel-heading">
        Customer Details
    </div>

    <div class="panel-body">

        <div class="row">

            <div class="col-xs-12 col-sm-12 col-md-6">

                <div class="form-group">
                    {{ Form::label('name', 'Name', array('class' => 'col-xs-4 control-label')) }}
                    <div class="col-xs-8">
                        {{ Form::text('name', $testimonial->name, ['class' => 'form-control focus-popover']) }}
                    </div>
                </div>

            </div>

            <div class="col-xs-12 col-sm-12 col-md-6">

                <div class="form-group">
                    {{ Form::label('company', 'Company', array('class' => 'col-xs-4 control-label')) }}
                    <div class="col-xs-8">
                        {{ Form::text('company', $testimonial->company, ['class' => 'form-control focus-popover']) }}
                    </div>
                </div>

            </div>

        </div>

        <div class="row">

            <div class="col-xs-12 col-sm-12 col-md-6">

                <div class="row">
                    {{ Form::label('published_at', 'Date', array('class' => 'col-xs-4 control-label')) }}
                    <div class="col-xs-8">
                        <div class="input-group">
                            <span class="input-group-addon add-on">
                                <span class="glyphicons calendar">
                                </span>
                            </span>

                            {{
                                Form::text('published_at', isset($testimonial->published_at) ? Carbon::parse($testimonial->published_at)->format('d/m/Y') : Carbon::now()->format('d/m/Y'),
                                [
                                    'class' => 'form-control focus-popover datepicker',
                                    'placeholder' => 'dd/mm/yyyy',
                                    'data-content' => 'dd/mm/yyyy',
                                    'data-format' => 'dd/mm/yyyy'
                                ])
                            }}
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>

</div>

{{ Form::textarea('description', $testimonial->description ?: '',
    [
    'class'             => 'form-control focus-popover hasRedactor',
    'rows'              => '10',
    'data-url'          => URL::to(Config::get('base::admin_prefix')).'/image/',
    'data-document-url' => URL::route('admin.document.list')
    ]
)}}

<div class="wysiwyg-footer">
    <div class="word-count pull-left"></div>
    <div class="draft-state pull-right"></div>
    <div class="clearfix"></div>
    </div>

{{-- Footer Javascript --}}
@section('footer_javascript')
    @parent
    <script type="text/javascript" src="{{ Config::get('base::admin.js') }}plugins/redactor/redactor.min.js"></script>
@stop
