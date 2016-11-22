
@if ($errors->any())
    {{ implode('', $errors->all('<div class="flash alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>:message</div>')) }}
@endif
