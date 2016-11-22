<div class="pull-right action-buttons">
    <a href="{{ URL::route('admin.user.dashboard') }}" title="Back to Dashboard" class="btn btn-default btn-tooltip">
        <span class="glyphicons show_big_thumbnails"></span>
    </a>

    @if(Auth::user()->can($permission))
        <a href="{{ URL::route($route) }}" title="Add" class="btn btn-success btn-tooltip">
            <span class="mdi-content-add"></span>
        </a>
    @endif
</div>
