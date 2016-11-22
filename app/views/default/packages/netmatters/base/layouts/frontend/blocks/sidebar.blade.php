@if (count($menu) > 0)

    <nav id="sidebar">

        <div class="title">
            <div class="row">
                <div class="col-xs-6"></div>
                <div class="col-xs-6"></div>
            </div>
            <h2>{{ $title }}</h2>
        </div>

        <ul>
            @foreach($menu as $item)
                <li {{ $item->getUrl() == URL::full() ? 'class="active"' : '' }}>
                    <a href="{{ $item->getUrl() }}">
                        {{ $item->name }}
                    </a>
                </li>
            @endforeach
        </ul>

    </nav>

@endif
