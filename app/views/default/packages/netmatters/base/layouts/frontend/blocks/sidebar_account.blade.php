<div class="account">
    <div class="account-detail">
        <div class="account-image">
            @var $image = ImageHandler::path('/' . Config::get('base::user_avatar_path') . Auth::user()->avatar_filename, 'resize', 29, 29, false);

            @if (isset($image) && !empty(Auth::user()->avatar_filename) && file_exists(Config::get('base::avatar_path') . Auth::user()->avatar_filename))
                {{ HTML::image($image) }}
            @else
                {{ HTML::image('/packages/netmatters/base/images/default.png', Auth::user()->contact->firstname) }}
            @endif
        </div>

        <div class="account-name">
            {{ Auth::user()->contact->firstname }}<br/>
            <span class="user-role">{{ !empty(Auth::user()->roles->first()->name) ? Auth::user()->roles->first()->name : 'Role Unavailable' }}</span>
        </div>

        <div class="clearfix"></div>
    </div>{{-- End of .account-detail --}}

    <div class="clearfix"></div>
</div>{{-- End of .account --}}