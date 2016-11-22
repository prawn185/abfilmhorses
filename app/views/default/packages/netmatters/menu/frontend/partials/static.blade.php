
@if (!empty($menu->items))
    @foreach ($menu->items as $item)

        <li class="{{ (Request::path() == $item['value'] || Request::url() == $item['value']) ? 'active' : '' }}" >
            <a href="{{ $item->getURL() }}" {{ $item->target == 1 ? 'target="_blank"' : '' }}>{{ $item['name'] }}</a>

            @if ($item->items->count())
                <ul>
                    @foreach ($item->items as $child)
                    <li>
                        {{ $child->toAnchor() }}
                    </li>
                    @endforeach
                </ul>
            @endif

        </li>

    @endforeach
@else
    <li class="active">No items found</li>
@endif
