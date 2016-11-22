
<ul ng-controller="notificationController" class="toolbar nav navbar-nav navbar-right" ng-cloak>

    <li class="dropdown task-dropdown">

        <a class="btn btn-tooltip notification_icon" data-toggle="dropdown" title="View Notifications" ng-click="read()">
            <i ng-class="{unread: unread != 0}" class="mdi-social-notifications-none"></i>
            <span ng-class="{unread: unread != 0}" ng-show="unread != 0">[[ unread ]]</span>
        </a>

        <ul class="dropdown-menu dropdown-menu-right extended notification_list">
            <li class="toolbar-header">
                You have <span class="badge">[[ unread ]]</span> unread notifications
            </li>
            <li class="notifications" ng-repeat="notification in notifications">
                <a ng-class="{unread: notification.read_at == null}" href="[[ notification.url ]]">
                    [[ notification.text ]] <small class="pull-right">[[ notification.diff ]]</small>
                </a>
            </li>
        </ul>

    </li>
</ul>