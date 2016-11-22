@if (isset($products) && count($products) > 0)

    <div class="container hidden">

        <h2 class="grey">
            {{ Config::get('product::main.title') }}
        </h2>

    </div>

    <div class="section grey">

        <div class="container">

            <div id="product-list">
                <div class="row">
                    @include('product::frontend.category.partials.products')
                </div>
            </div>

            {{ $products->links() }}

        </div>

    </div>

@endif
