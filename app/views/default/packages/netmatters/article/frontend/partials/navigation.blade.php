<h2 class="header">Categories</h2>
<hr class="header" />

<div class="list-group">
    @foreach($categories as $val)
        <a href="{{ $val->getUrl() }}" class="list-group-item">
            {{ $val->name }}
        </a>
        <a href="{{ URL::route('frontend.article.sub_category_' . $val->parent_id, $val->url) }}"
           class="list-group-item {{ $category->id == $val->id ? 'active' : '' }}">
                <span class="badge">{{ $val->article->count() }}</span>
            {{ $val->name }}
        </a>
    @endforeach
</div>
