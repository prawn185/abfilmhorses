@if (count($menu->items))

    @foreach ($menu->items as $item)

        @if(Request::path() == $item->value || Request::url() == $item->getURL())

            @if ($item->items->count())

                @foreach ($item->items as $child)

                    @var $page = \Netmatters\Page\Page::find($child->item_id);
                    @var $image = \Netmatters\Page\Page::mainImage($page, 240, 240, true);
                    <div class="col-md-6">
                        <div class="overview-item">
                            <div class="row">
                                <div class="col-sm-6 col-md-12 col-lg-6">
                                    <a href="{{ $page->getUrl() }}" class="circle">
                                    <img src="{{ $image->src }}" alt="{{ $page->name }}"></a>
                                </div>
                                <div class="col-sm-6 col-md-12 col-lg-6">
                                    <div class="description">
                                        <h2><a href="{{ $page->getUrl() }}">{{ $page->name }}</a></h2>
                                        <p>
                                            {{ substr($page->content, 0, 100) }}...
                                        </p>
                                    </div>
                                    <a href="{{ $page->getUrl() }}" class="btn red">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>

                @endforeach

            @endif

        @endif

    @endforeach

@endif
