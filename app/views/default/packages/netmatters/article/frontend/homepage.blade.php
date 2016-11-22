@if (count($news)>0)
    <div class="container">

		<div class="slide clearfix">
            @foreach ($news as $article)
                <div class="item">
                    <a href="{{ $article->getUrl() }}">
                        @var $image = \Netmatters\Article\Article::mainImage($article, 278, 175, true);
                       {{ HTML::image($image->src, $image->title, ['class' => 'img-responsive news-img']) }}
                    </a>
                    <div class="title">
                        <h3><a href="{{ $article->getURL() }}">{{ $article->name }}</a></h3>
                        <p><i class="fa fa-clock-o"></i>Posted {{ Carbon::parse($article->published_at)->format('d,m,y') }}</p>
                    </div>
                    <div class="button">
                        <a href="{{ $article->getUrl() }}" class="btn red" role="button">
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



