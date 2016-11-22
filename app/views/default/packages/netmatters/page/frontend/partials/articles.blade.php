<div id="feed-header">

    <div class="container">

        <ul class="nav nav-tabs" role="tablist">

            @foreach ($categories as $key => $category)
                <li class="{{ $key == 0 ? 'active' : ''}}">
                    <a href="#{{ Str::slug($category->name) }}" data-url="{{ URL::route('frontend.slide', $category->id) }}" role="tab" data-toggle="tab">
                        {{ $category->name }}
                    </a>
                </li>

            @endforeach

            {{--<li>--}}
                {{--<a href="#news" data-url="{{ URL::route('frontend.news.slide') }}" role="tab" data-toggle="tab">--}}
                    {{--News--}}
                {{--</a>--}}
            {{--</li>--}}


        </ul>

    </div>

</div>

<section id="feed-container">

    <div class="tab-content" data-snap-ignore="true">

        <div class="tab-pane active">
            @include('article::frontend.homepage', array('category' => $first_category->id, 'count' => '20'))
        </div>

    </div>

</section>