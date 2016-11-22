<li class="col-sm-6 col-md-3">
    <div class="item">
        <a href="{{ URL::route('frontend.news.article', Str::slug($item->newstitle)) }}">
            <span style="background-image: url({{ Config::get('base::uploads_path') . $item->image->filename }})" class="img-cover"></span>
        </a>
        <div class="title">
            <h3><a href="{{ URL::route('frontend.news.article', Str::slug($item->newstitle)) }}">{{ Str::limit($item->newstitle, 25) }}</a></h3>
            <p><i class="fa fa-clock-o"></i>Posted {{ Carbon::createFromTimeStamp($item->newsdate)->diffForHumans() }}</p>
        </div>
        <div class="button">
            <a href="{{ URL::route('frontend.news.article', Str::slug($item->newstitle)) }}" class="btn red" role="button">
                Read More
                <i class="iconmoon arrow-right"></i>
            </a>
        </div>
    </div>
</li>
