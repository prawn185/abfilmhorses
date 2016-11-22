<?php
if (Session::has('cart')) {
    $cart = Session::get('cart');

    if (count($cart) > 0) {
        $items = \Netmatters\Product\Product::whereIn('id', array_keys($cart))->get();
        $count = (count($cart));
    }
}
?>

<div class="dropdown">
    <a id="cart" href="{{ URL::route('cart.items') }}">
    <button class="btn btn-primary btn-checkout">
        <span class="glyphicons cart_in">
                <span class="badge">{{ (!empty($count)) ? '' . $count . '' : '0' }}</span>
                Checkout
        </span>
    </button>
    </a>
</div>


