@if ($news->count() >= 1)

    <div class="container">

        <ul class="slide clearfix">

            @foreach ($news as $item)

                @include('page.news.partials.featured')

            @endforeach

        </ul>

        <div class="next hidden-xs hidden-sm">
            <div>
                <span></span>
                <i class="fa fa-angle-right"></i>
            </div>
        </div>

        <div class="prev hidden-xs hidden-sm">
            <div>
                <span></span>
                <i class="fa fa-angle-left"></i>
            </div>
        </div>

    </div>

@else

    <div class="container">
        <h3>There are no articles within this category</h3>
    </div>

@endif
