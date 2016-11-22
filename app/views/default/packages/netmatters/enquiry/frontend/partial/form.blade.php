@if($success = Session::get('message'))
    <div class="alert alert-success">
        {{ $success }}
    </div>
@endif

@include('base::error.message')

{{ Form::open(['route' => 'frontend.enquiry', 'method' => 'POST', 'class' => 'form-horizontal', 'id' => 'contact-form', 'onSubmit' => 'ga("send", "pageview", "/contact_us_complete")']) }}

    <div class="form-group">
        <div class="col-md-6 form-sm-group">
            {{ Form::label('name', 'Your Name', ['class' => 'required']) }}
            {{ Form::text('name', '', ['class' => 'form-control']) }}
        </div>

        <div class="col-md-6">
            {{ Form::label('email', 'Your Email', ['class' => 'required']) }}
            {{ Form::email('email', '', ['class' => 'form-control']) }}
        </div>
    </div>

    <div class="form-group">
        <div class="col-md-6 form-sm-group">
            {{ Form::label('telephone', 'Your Telephone Number', ['class' => 'required']) }}
            {{ Form::text('telephone', '', ['class' => 'form-control']) }}
        </div>
        <div class="col-md-6">
            {{ Form::label('email', 'Subject', ['class' => 'required']) }}
            {{ Form::text('subject', '', ['class' => 'form-control']) }}
        </div>
    </div>

    <div class="form-group">
        <div class="col-md-12">
            {{ Form::label('message', 'Message', ['class' => 'required']) }}
            {{ Form::textarea('message', '', ['class' => 'form-control']) }}
            {{ Form::hidden('robot', '') }}
        </div>
    </div>

    <div class="form-group">
        <div class="col-md-12">
            <button name="submit" class="btn red">
                Submit
                <i class="iconmoon arrow-right"></i>
            </button>
        </div>
    </div>


{{ Form::close() }}
