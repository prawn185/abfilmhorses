
@if (Auth::user()->can(array('view_notifications')))
    {{--<ul class="toolbar nav navbar-nav navbar-right">--}}
        {{--<li class="dropdown task-list">--}}
            {{--<a href="#" class="btn btn-tooltip dropdown-toggle" type="button" title="View Tasks">--}}
                {{--<span class="glyphicons notes_2"></span>--}}
            {{--</a>--}}
            {{--<ul class="dropdown-menu dropdown-menu-right extended">--}}
                {{--<li class="toolbar-header">--}}
                    {{--You have <span class="badge">0</span> tasks--}}
                {{--</li>--}}
                {{--<li class="load">--}}

                {{--</li>--}}
                {{--<li class="toolbar-footer">--}}
                    {{--<a href="{{ URL::route('logout') }}">--}}
                        {{--See all tasks <span class="glyphicons circle_arrow_right"></span>--}}
                    {{--</a>--}}
                {{--</li>--}}
            {{--</ul>--}}
        {{--</li>--}}
        {{--<li>--}}
            {{--<a href="/ajax/task-time" title="Log Time?" class="btn btn-default btn-tooltip task-time">--}}
                {{--<span class="glyphicons stopwatch"></span>--}}
            {{--</a>--}}
        {{--</li>--}}
    {{--</ul>--}}
@endif
