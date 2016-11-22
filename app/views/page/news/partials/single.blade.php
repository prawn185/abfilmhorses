{{-- Header Css files --}}
@section('header_css')
    @parent
    {{ HTML::style(Config::get('base::frontend.css') . 'news.css') }}
@stop

@if ($news)

    <div id="news">

        {{-- Include Single Post --}}
        @include('page.news.partials.item', ['item' => $news])

    </div>

@endif
