
<div class="callback-form">

    @if($success = Session::get('message'))
        <div class="alert alert-success">
            {{ $success }}
        </div>
    @endif

    @include('base::error.message')


    {{ Form::open(['method' => 'POST', 'url' => '/request-callback', 'id' => 'callback-request-form']) }}

    <div class="col-md-12 ">
        <div class="row">
            <div class="col-sm-3">
                {{ Form::text('name', '', ['class' => 'form-control', 'placeholder' => 'Name']) }}
                <span class="help-block"></span>
            </div>

            <div class="col-sm-3">
                {{ Form::text('telephone', '', ['class' => 'form-control', 'placeholder' => 'Telephone']) }}
                <span class="help-block"></span>
            </div>

            <div class="col-sm-3">
                {{ Form::text('time', '', ['class' => 'form-control', 'placeholder' => 'Preferred Time']) }}
                <span class="help-block"></span>
            </div>
            <div class="col-sm-3">
                {{ Form::hidden('robohp', '') }}
                {{ Form::submit('Call Me Back', ['class' => 'btn btn-primary btn-block']) }}
            </div>
        </div>
    </div>

    {{ Form::close() }}
</div>
