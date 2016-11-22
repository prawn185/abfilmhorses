
<div class="row">
    @if (isset($productImages) && count($productImages) > 0)
        @foreach($productImages as $productImage)
            <div class="col-xs-4">
                <div class="product-image">
                    @if ($productImage->width > 400)
                        <img src="{{ ImageHandler::path($productImage->path . $productImage->name, 'resizeCrop', 400, null) }}"
                            class="img-responsive" alt="{{ $productImage->name }}" />
                    @else
                        <img src="{{ $productImage->path . $productImage->name }}" class="img-responsive" alt="{{ $productImage->name }}" />
                    @endif
                </div>
            </div>
        @endforeach
    @else
        <img src="https://placehold.it/675x370&amp;text=Awaiting+Image" class="img-responsive" alt="Awaiting Image" />
    @endif
</div>
