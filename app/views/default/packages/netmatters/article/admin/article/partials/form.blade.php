{{-- Header CSS --}}
@section('header_css')
    @parent
    <link rel="stylesheet" type="text/css" href="{{ Config::get('base::admin.js') }}plugins/redactor/redactor.css" />
@stop

<div class="panel panel-default">
    <div class="panel-heading">
        Article Details
    </div>

    <div class="panel-body">

        <div class="row">

            <div class="col-xs-12 col-sm-12 col-md-6">

                <div class="form-group">
                    {{ Form::label('name', 'Name', array('class' => 'col-xs-4 control-label')) }}
                    <div class="col-xs-8">
                        {{ Form::text('name', $article->name, ['class' => 'form-control focus-popover']) }}
                    </div>
                </div>

                @if (Config::get('article::main.user_id'))

                    <div class="form-group">
                        {{ Form::label('user_id', 'User', array('class' => 'col-xs-4 control-label')) }}
                        <div class="col-xs-8">

                            {{ Form::select('user_id', $contact, isset($article->user_id) ? $article->user_id : Auth::user()->id,
                                array('class' => 'form-control', 'data-live-search' => "true")) }}

                        </div>
                    </div>

                @endif

                @if (Config::get('article::main.account_id'))

                    <div class="form-group">
                        {{ Form::label('account_id', 'Account', array('class' => 'col-xs-4 control-label')) }}
                        <div class="col-xs-8">

                            {{ Form::select('account_id', $accounts, isset($article->account_id) ? $article->account_id : Auth::user()->account_id,
                                array('class' => 'form-control', 'data-live-search' => "true")) }}

                        </div>
                    </div>

                @endif

                <div class="form-group">
                    {{ Form::label('published_at', 'Date', array('class' => 'col-xs-4 control-label')) }}
                    <div class="col-xs-8">
                        <div class="input-group">
                            <span class="input-group-addon add-on">
                                <span class="glyphicons calendar">
                                </span>
                            </span>

                            {{
                                Form::text('published_at', isset($article->published_at) ? Carbon::parse($article->published_at)->format('d/m/Y') : Carbon::now()->format('d/m/Y'),
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

            <div class="col-xs-12 col-sm-12 col-md-6">

                <div class="form-group">
                    {{ Form::label('status', 'Status', array('class' => 'col-xs-4 control-label')) }}

                    <div class="col-xs-8">
                        {{ Form::select('status', ['Live' => 'Live', 'Hidden' => 'Hidden'], $article->status ?: 'Live', ['class' => 'form-control focus-popover number-field']) }}
                    </div>

                </div>

                <div class="form-group">
                    {{ Form::label('category_ids', 'Categories', array('class' => 'col-xs-4 control-label')) }}

                    <div class="col-xs-8">
                        {{ Form::select('category_ids[]', $categories->lists('name', 'id'), $article->categories->lists('id'),
                            array('class' => 'form-control', 'multiple', 'data-live-search' => "true")) }}
                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

@if (Auth::user()->can('view_social'))
    @include('social::admin.partials.twitter.publish')
@endif

{{ Form::textarea('content', $article->content ?: '',
    [
    'class'             => 'form-control focus-popover hasRedactor',
    'rows'              => '20',
    'data-url'          => URL::to(Config::get('base::admin_prefix'))  . '/image/',
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
