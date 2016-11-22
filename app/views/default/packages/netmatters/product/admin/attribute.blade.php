@extends('base::layouts.admin')

@section('main')
    <div class="row">
        <div class="col-md-12 form-title">

            <div class="pull-left">
                <h1>
                    <span class="highlight">{{ $product->name }}</span>
                </h1>
                    <span class="timestamps hidden-xs">
                        Created: {{ (!empty($product->created_at)) ? $product->created_at->format('d/m/Y') : date('d/m/Y') }} |
                        Modified: {{ (!empty($product->updated_at)) ? $product->updated_at->format('d/m/Y') : date('d/m/Y') }}
                    </span>
            </div>

            <div class="pull-right action-buttons">
                <div class="btn-group">
                    <a href="{{ URL::route('admin.product.delete', $product->id) }}"
                       title="Delete" class="btn btn-danger delete btn-tooltip">
                        <span class="glyphicons bin"></span>
                    </a>
                </div>

                <div class="btn-group">
                    @if (Auth::user()->can('read_product'))
                    <a href="{{ URL::route('admin.product') }}" title="Cancel" class="btn btn-default btn-tooltip">
                        <span class="glyphicons remove_2"></span> Cancel
                    </a>
                    @endif
                </div>
            </div>

            <div class="clearfix"></div>
        </div>{{-- End of .column --}}
    </div>{{-- End of .row --}}


    {{-- Load the Navigation Partial --}}
    @include('product::admin.partials.navigation')


    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">Product Attributes</div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-xs-6">
                            <table class="table table-bordered table-striped data-table">
                                <tr>
                                    <th>Name</th>
                                    
                                </tr>
                                @if($product->attributes->count() >= 1)
                                    @foreach($product->attributes as $attribute)
                                        <tr>
                                            <td>
                                                <div class="pull-left">
                                                    {{ $attribute->name }}
                                                </div>
                                                {{ Form::open(['route' => ['admin.product.delete.product-attribute', $product->id], 'method' => 'delete']) }}
                                                {{ Form::hidden('product_attribute_pivot_id', $attribute->pivot->id) }}
                                                <button type="submit" class="btn btn-sm btn-danger pull-right">
                                                        <i class="glyphicon glyphicon-trash"></i>
                                                    </button>
                                                {{ Form::close() }}
                                            </td>
                                        </tr>
                                    @endforeach
                                @else
                                    <tr>
                                        <td colspan="2" class="text-center"><em>This product has no attributes</em></td>
                                    </tr>
                                @endif
                            </table>
                        </div>




                        <div class="col-xs-6">
                            {{ Form::open(['route' => ['admin.product.attribute', $product->id], 'method' => 'POST', 'class' => 'form-horizontal', 'role' => 'form']) }}

                                <div class="form-group">
                                    {{ Form::label('product_attribute_id', 'Name', ['class' => 'col-xs-4 control-label']) }}
                                    <div class="col-xs-8">
                                        <div class="input-group hover-popover" data-content="Please choose or create an attribute name e.g Colour">
                                            {{ Form::select('product_attribute_id', $preparedAttributes, null, ['class' => 'form-control', 'data-live-search' => 'true', 'id' => 'attribute-field']) }}
                                            {{ Form::text('name', '', ['class' => 'form-control hide', 'id' => 'add-attribute-field', 'placeholder' => 'Attribute Name']) }}
                                            <span class="input-group-addon btn btn-success btn-tooltip" id="add-attribute-name" title="Add New">
                                                <i class="glyphicon glyphicon-plus-sign"></i>
                                            </span>
                                            <span class="input-group-addon btn btn-danger btn-tooltip" id="delete-attribute" title="Delete" data-productid="{{ $product->id }}">
                                                <i class="glyphicon glyphicon-remove"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-xs-8">
                                    {{ Form::hidden('value', 1, ['class' => 'form-control']) }}
                                    {{ Form::hidden('operand_type_id', 0, ['class' => 'form-control']) }}
                                    {{ Form::hidden('field_type_id', 0, ['class' => 'form-control']) }}
                                    {{ Form::hidden('price', 0, ['class' => 'form-control']) }}
                                    </div>
                                </div>




                                <div class=" clearfix">
                                    {{ Form::submit('Add', ['class' => 'pull-right btn btn-success']) }}
                                </div>

                            {{ Form::close() }}
                        </div>
                    </div>
                </div><!--// End of .panel-body -->
            </div><!--// End of .panel -->
        </div><!--// End of .column -->
    </div><!-- // End of .row -->
@stop

@section('footer_javascript')
@parent
<script type="text/javascript" src="{{ Config::get('base::admin.js') }}pages/product.js"></script>

{{-- Attribute Script --}}
<script type="text/javascript">

    $(document).ready(function() {

        $(document).on('click', '#add-attribute-name', function() {
            $('#attribute-field, #attribute-field + div.btn-group').addClass('hide');
            $('#add-attribute-field').removeClass('hide').focus();
        });

        $(document).on('click', '#delete-attribute', function() {

            var url         = "{{ URL::route('admin.product.delete.attribute') }}";
            var currentUrl  = "{{ URL::full() }}";
            var token       = $('input[name="_token"]').val();
            var data  = {
                'attributeId':  $('#attribute-field').val(),
                '_token':       token,
                'productId':    $(this).data('productid')
            };

            $.ajax({
                    url: url,
                    data: data,
                    type: 'POST',
                    success: function(result)
                    {
                        // Reload the block
                        $('#main').load(currentUrl + ' #main > *');

                        // Notify the user
                        BsComponents.notifyUser('<strong>' + $("#attribute-field").attr("id") + '</strong>' + ' updated', 'success');

                        // Re-bind the selectpicker
                        $('#attribute-field').selectpicker('refresh');
                    },
                    error: function(result) {

                    }
                });

        });

    })
</script>
@stop
