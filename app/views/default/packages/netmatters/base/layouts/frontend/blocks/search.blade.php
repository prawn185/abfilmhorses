
{{ Form::open(['route' => 'admin.search', 'method' => 'POST', 'class' =>'search-form m-t-sm']) }}

    <div class="input-group">
        {{ Form::text('search', '', array('class' => 'form-control', 'placeholder' =>'Search' , 'disabled' => 'disabled')) }}

        <span class="input-group-btn">
            <button disabled type="submit"><i class="mdi-action-search"></i></button>
        </span>
    </div>

{{ Form::close() }}
