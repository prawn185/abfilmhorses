<div class="pull-right action-buttons">
    <a href="{{ URL::previous() }}" title="Return to Previous Page" class="btn btn-default btn-tooltip">
        <i class="mdi-content-clear"></i>
    </a>

    @if (Auth::user()->can($permission))
        <button type="submit" title="Save" class="btn btn-success btn-tooltip">
            <i class="mdi-content-save"></i>
        </button>
    @endif
</div>
