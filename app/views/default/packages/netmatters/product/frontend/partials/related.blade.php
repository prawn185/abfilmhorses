
<div class="row">
    @foreach ($relatedItems as $index => $item)

        <?php
            // Get the main image for the product
            $itemImage = \NmProduct::mainImage($item, 400, 250);
        ?>

        <div class="item col-xs-3 col-sm-3 col-md-3">
            <div class="thumbnail">

                <a href="{{ URL::route('frontend.product.view', $item->url) }}" title="View {{ $item->name }}">
                    <img src="{{ $itemImage->src }}" class="group list-group-image" title="{{ $itemImage->title }}" alt="{{ $itemImage->title }}" />
                </a>

                <div class="caption">
                    <h4 class="group inner list-group-item-heading">
                        <a href="{{ URL::route('frontend.product.view', $item->url) }}" title="View {{ $item->name }}">
                            {{ $item->name }}
                        </a>
                    </h4>
                    <div class="row">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <p class="lead">&pound;{{ $item->price }}</p>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            {{ Form::open(array('route' => 'cart.add', 'method' => 'POST', 'class' => 'pull-left')) }}
                                {{ Form::hidden('id', $item->id) }}
                                {{ Form::hidden('name', $item->name) }}
                                {{ Form::hidden('qty', 1) }}
                                {{ Form::hidden('price', $item->price) }}
                                {{ Form::hidden('options[size]', 'large') }}
                                {{ Form::hidden('options[colour]', 'red') }}
                                <button type="submit" title="Add to cart" class="btn btn-primary btn-tooltip">
                                    <span class="glyphicons cart_in"></span> Add to cart
                                </button>
                            {{ Form::close() }}
                        </div>
                    </div>
                </div>{{-- End of .caption--}}

            </div>{{-- End of .thumbnail --}}
        </div>{{-- End of .column --}}
    @endforeach
</div>
