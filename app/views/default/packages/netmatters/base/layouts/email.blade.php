
<form id="email-form" action="{{ $data['url'] }}" class="standard-form create-form" method="POST">
    {{ Form::token() }}

    <div class="row">
        <div id="quantity-block" class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <label for="product_options_id" class="col-xs-4 control-label">Email To</label>
                <div class="col-xs-8">
                    <div class="input-group">
                        <input type="text" name="email-to" id="email-to" value="{{ $data['quote']->contact->email }}" class="form-control">
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div><!-- // End of .column -->
    </div><!-- // End of .row -->

    <div class="row">
        <div id="quantity-block" class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
                <label for="product_options_id" class="col-xs-4 control-label">Email Subject</label>
                <div class="col-xs-8">
                    <div class="input-group">
                        <input type="text" name="email-subject" id="email-subject" value="Quote #{{ $data['quote']->id }}" class="form-control">
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div><!-- // End of .column -->
    </div><!-- // End of .row -->
</form>
