<div class="item">

    <div class="head clearfix">

        @if ($image = $item->image)

            <div class="img-news">
                <a href="{{ URL::route('frontend.news.article', Str::slug($item->newstitle)) }}">
                    <span class="img-cover"
                        style="background-image: url({{ Config::get('base::news_uploads') . $image->filename }})"></span>
                </a>
            </div>

        @endif

        <div class="title{{ $image ? ' title-img' :'' }}">

            <h3>{{ HTML::link(URL::route('frontend.news.article', Str::slug($item->newstitle)), Str::limit($item->newstitle, 30)) }}</h3>
            <p><i class="fa fa-clock-o"></i>Posted {{ Carbon::createFromTimeStamp($item->newsdate)->diffForHumans() }}</p>

        </div>

    </div>

    <p>{{ Str::limit(strip_tags($item->newscontent), 90) }}</p>

    <a href="{{ URL::route('frontend.news.article', Str::slug($item->newstitle)) }}" class="btn red">
        Read More
        <i class="iconmoon arrow-right"></i>
    </a>

</div>
