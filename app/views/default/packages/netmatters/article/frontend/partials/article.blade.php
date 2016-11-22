<div class="item">
    <div class="news">
        {{-- Image Object: Set last param as false to remove placeholder ---}}
        @var $image = \Netmatters\Article\Article::mainImage($article, 790, 300, true);
        @if (isset($image))
            <a href="{{ $article->getUrl() }}">
                {{ HTML::image($image->src, $image->title, ['class' => 'img-responsive news-img']) }}
            </a>
        @endif

        <div class="title">
            <h3>
                <a href="{{ $article->getUrl() }}">
                    {{ $article->name }}
                </a>
            </h3>
            <p><i class="fa fa-clock-o"></i>Posted {{ Carbon::parse($article->published_at)->format('d/m/Y') }}</p>
        </div>

        <p>{{ str_limit($article->content, 150) }}</p>

        <a href="{{ $article->getUrl() }}">
            <strong>Read More</strong>
        </a>
    </div>
</div>
