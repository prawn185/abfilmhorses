@if (count($menu->items))
    @foreach ($menu->items as $item)
    <li id="{{ $item->id }}" class="{{ (Request::path() == $item->value || Request::url() == $item->value) ? 'active' : '' }} {{ $item->items->count() ? 'dropdown' : '' }}" >
        <a href="{{ $item->getURL() }}" {{ ($item->target == 1) ? 'target="_blank"' : '' }}>
            {{ $item->getName() }}
            <span class="tab"></span>
        </a>

        @if ($item->items->count())

            <div class="dropdown-menu">
                <div class="container">
                    <div class="m-inner">
                        <div class="row">
                            @foreach ($item->items as $child)
                                <div class="col-lg-2">
                                    <a href="{{ url($child->getUrl()) }}">

                                        @if ($child->getImage())
                                            <img class="visible-lg" src="{{ $child->getImage() }}" alt="{{ $child->name }}" />
                                        @endif

                                        <span class="dual visible-lg">
                                            {{ snap_two_lines($child->name) }}
                                        </span>

                                        <span class="single hidden-lg">
                                            {{ $child->name }}
                                        </span>

                                    </a>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>

        @endif
    </li>
    @endforeach
@endif
