{{-- Include Main sidebar --}}
@include('layouts.blocks.sidebar', ['menu' => $products, 'title' => Config::get('product::main.title')])