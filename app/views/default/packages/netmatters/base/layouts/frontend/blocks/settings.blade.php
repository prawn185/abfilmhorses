<ul class="toolbar nav navbar-nav navbar-right">
    <li class="dropdown">
        <a href="#" class="btn btn-tooltip" data-toggle="dropdown" type="button" title="User Settings">
            <i class="mdi-action-settings"></i>
        </a>

        <ul class="dropdown-menu dropdown-menu-right extended">
            <li>
                <a href="{{ URL::route('admin.user.dashboard') }}">
                    <span class="mdi-action-dashboard"></span> Dashboard
                </a>
            </li>

            @if (Auth::user()->can('read_about'))
                <li>
                    <a href="{{ URL::route('admin.about') }}">
                        <span class="mdi-action-info-outline"></span> About
                    </a>
                </li>
            @endif

            @if (Auth::user()->can('read_dashboard_setting'))
                <li>
                    <a href="{{ URL::route('admin.setting.profile') }}">
                        <span class="mdi-action-settings"></span> Settings
                    </a>
                </li>
            @endif

        </ul>
    </li>
</ul>
