<div class="form-group">
    {{ Form::label('alt', 'Alt Tag', array('class' => 'col-xs-2 control-label')) }}
    <div class="col-xs-10">
        {{ Form::text('alt', $image->alt,
            array('class' => 'form-control focus-popover' ))
        }}
    </div>
</div>

<div class="form-group">
    {{ Form::label('title', 'Title', array('class' => 'col-xs-2 control-label')) }}
    <div class="col-xs-10">
        {{ Form::text('title', $image->title,
            array('class' => 'form-control focus-popover' ))
        }}
    </div>
</div>
<div class="form-group">
    {{ Form::label('link', 'Image Link', array('class' => 'col-xs-2 control-label')) }}
    <div class="col-xs-10">
        {{ Form::text("link", $image->link, array('class' => 'form-control focus-popover' )) }}
    </div>
</div>

<div class="form-group">
    {{ Form::label('description', 'Description', array('class' => 'col-xs-2 control-label')) }}
    <div class="col-xs-10">
        {{ Form::textarea("description", $image->description ?: '', ['class' => 'form-control']) }}
    </div>
</div>


@if ($image->type == 'gallery')

    @if (Config::get('gallery::config.link'))

        <div class="form-group">
            {{ Form::label("link", 'Link', array('class' => 'col-xs-2 control-label')) }}
            <div class="col-xs-10">
                {{ Form::text("link", $image->link ?: '', ['class' => 'form-control']) }}
            </div>
        </div>

    @endif

    @if (Config::get('gallery::config.link'))

        <div class="form-group">
            {{ Form::label("button_text", 'Button Text', array('class' => 'col-xs-2 control-label')) }}
            <div class="col-xs-10">
                {{ Form::text("button_text", $image->button_text ?: '', ['class' => 'form-control']) }}
            </div>
        </div>

    @endif

@endif
