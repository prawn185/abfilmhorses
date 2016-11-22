
<div id="message-area">
    <div ng-controller="bootstrapController" ng-cloak>
        <alert ng-repeat="alert in alerts" ng-if="alerts" class="animate-if" type="[[ alert.type ]]" close="closeAlert($index)">
            [[ alert.msg ]]
        </alert>
    </div>

    @if (Session::has('message'))
        <div class="flash alert alert-{{ Session::get('message_type','info') }}">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            {{ Session::get('message') }}
        </div>
    @endif

    @include('base::error.message')
    <div class="clearfix"></div>
</div>
