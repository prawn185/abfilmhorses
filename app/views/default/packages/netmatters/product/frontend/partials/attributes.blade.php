<div class="row">
    <table class="table table-bordered table-striped">
        <tr>
            <th>Attribute</th>
            <th>Value</th>
        </tr>
        @if($product->attributes->count() >= 1)
            @foreach($product->attributes as $attribute)
            <tr>
                <td>{{ $attribute->name }}</td>
                <td>{{ $attribute->pivot->value }}</td>
            </tr>
            @endforeach
        @else
            <tr>
                <td colspan="2" class="text-center"><em>This product has no attributes</em></td>
            </tr>
        @endif
    </table>
</div>
