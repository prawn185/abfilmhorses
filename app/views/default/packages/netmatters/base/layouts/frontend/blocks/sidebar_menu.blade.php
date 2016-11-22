<div class="menu-wrapper scroller" data-handle-color="#AAA">
    <ul class="nav nav-list">

        @foreach ($navbar_groups as $key => $val)
            <li class="group {{ $val->route ? (Request::is(NmHelper::routeToUri($val->route, false) . '*')) ? 'active' : '' : '' }}">
                <a href="{{ $val->route ? URL::route($val->route) : '' }}" title="{{ $val->name }}" class="right-tooltip" >
                    <i class="{{ $val->icon }}"></i>
                    <span class="text">{{ $val->name }}</span>
                    <span class="indicator"></span>
                </a>

                @if (count($val->modules))
                    <ul class="sub-nav">
                        @foreach ($val->modules as $module)
                            @if (Auth::user()->can($module->permission->lists('key')))
                            <li class="{{(Request::is(NmHelper::routeToUri($module->route, false) . '*')) ? 'active' : '' }}">
                                <a href="{{ URL::route($module->route) }}" title="{{ $module->name }}" class="right-tooltip" >
                                    <i class="{{ $module->icon }}" {{ !empty($module->color) ? 'style="color:#' . $module->color . '"' : '' }}></i>
                                    <span class="text">{{ $module->name }}</span>
                                    <span class="indicator"></span>
                                </a>
                            </li>
                            @endif
                        @endforeach
                    </ul>
                @endif

            </li>
        @endforeach

        @foreach ($modules as $key => $val)
            <li class="{{(Request::is(NmHelper::routeToUri($val->route, false) . '*')) ? 'active' : '' }}">
                <a href="{{ URL::route($val->route) }}" title="{{ $val->name }}" class="right-tooltip" >
                    <i class="{{ $val->icon }}" {{ !empty($val->color) ? 'style="color:#' . $val->color . '"' : '' }}></i>
                    <span class="text">{{ $val->name }}</span>
                    <span class="indicator"></span>
                </a>
            </li>
        @endforeach
    </ul>

    <div class="clearfix"></div>
</div>{{-- End of .side-nav --}}