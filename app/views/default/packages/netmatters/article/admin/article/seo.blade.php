@extends('base::layouts.admin')



{{-- Content header --}}
@section('content_header')
    @parent
    {{ Form::open(['route' => ['admin.article.seo', $article->id], 'method' => 'POST', 'class' => 'form-horizontal seo-form']) }}


    <div id="page-head">
        <div class="container-fluid padder-lg">
            <div class="row">
                <div class="col-xs-6 col-md-9">
                    <h1>
                        {{ $article->name }} Details
                    </h1>
                    <span class="timestamps hidden-xs">
                        Created: {{ (!empty($page->created_at)) ? $page->created_at->format('d/m/Y') : date('d/m/Y') }} |
                        Modified: {{ (!empty($page->updated_at)) ? $page->updated_at->format('d/m/Y') : date('d/m/Y') }}
                    </span>
                </div>
                <div class="col-xs-6 col-md-3">
                    <div class="pull-right action-buttons">
                        @if (Auth::user()->can('read_article'))
                            <a href="{{ URL::route('admin.article') }}" class="btn btn-default">
                                <span class="glyphicons remove"></span>
                            </a>
                        @endif
                        @if (Auth::user()->can('update_article'))
                            <button type="submit" title="Save SEO" class="btn btn-tooltip btn-success submit-btn">
                                <span class="mdi-content-save"></span>
                            </button>
                        @endif
                    </div>
                </div>
            </div>
            @include('article::admin.article.partials.navigation')


        </div>
    </div>
@stop

@section('main')


    @include('article::admin.article.partials.seo')


    {{ Form::close() }}

@stop
