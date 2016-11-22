<div class="col-md-3 col-sm-4 spacer-xs">

    @if (isset($attributes) && count($attributes) > 0)

        <nav id="sidebar">
            <div class="title">
                <div class="row">
                    <div class="col-xs-6"></div>
                    <div class="col-xs-6"></div>
                </div>
                <h2>Packages</h2>
            </div>

            @foreach ($attributes as $attribute)
                <ul>
                        <li>
                            <a href="/modules/{{ Str::slug($attribute->name, $separator = '-') }}">
                                {{ $attribute->name }}
                            </a>
                        </li>
                </ul>
            @endforeach

        </nav>

    @endif

</div>

@if (isset($products) && count($products) > 0)

    @foreach ($products as $key => $product)

        <div class="col-md-9 product">

            @var $itemImage = \NmProduct::mainImage($product, 400, 250, false);

            <div class="item">

                <div class="row">

                    @if ($itemImage)

                        <div class="col-xs-4">
                            <a href="{{ $product->getUrl() }}" title="View {{ $product->name }}" style="background-image: url({{ $itemImage->src }})" class="bg-cover"></a>
                        </div>

                    @endif

                    <div class="col-xs-{{ $itemImage ? 8 : 12 }}">

                        <div class="copy">
                            <h4>
                                <a href="{{ $product->getUrl() }}" title="View {{ $product->name }}">
                                    {{ $product->name }}
                                </a>
                            </h4>

                            <p>
                                {{ Str::limit(strip_tags($product->summary), 90) }}
                            </p>

                            <a href="{{ $product->getUrl() }}" class="btn red">
                                Read More
                                <i class="iconmoon arrow-right"></i>
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>



    @endforeach

@endif
