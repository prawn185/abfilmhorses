@if (count($news)>0)
    <div class="container">

		<div class="slide clearfix">
            @foreach ($news as $article)

                <div class="item">
                    @if ($image = $article->image)

                        {{ HTML::image(Config::get('base::news_uploads') . $image->filename, $image->newstitle, ['class' => 'img-responsive news-img']) }}

                    @else

                        <a href="{{ URL::route('frontend.news.article', Str::slug($article->newstitle)) }}"><img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=Image+Coming+Soon&w=285&h=175" class="img-responsive news-img" alt="{{ $article->newstitle }}"></a>

                    @endif

                    <div class="title">
                        <h3><a href="{{ URL::route('frontend.news.article', Str::slug($article->newstitle)) }}">{{ $article->newstitle }}</a></h3>
                        <p><i class="fa fa-clock-o"></i>Posted {{ Carbon::parse($article->published_at)->format('d,m,y') }}</p>
                    </div>
                    <div class="button">
                        <a href="{{ URL::route('frontend.news.article', Str::slug($article->newstitle)) }}" class="btn red" role="button">
                            Read More
                            <i class="iconmoon arrow-right"></i>
                        </a>
                    </div>
                </div>
            @endforeach
        </div>

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
