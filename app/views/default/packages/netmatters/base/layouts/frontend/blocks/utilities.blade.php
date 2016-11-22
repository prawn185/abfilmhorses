

{{-- Ajax Load Indicator --}}
        <div id="quick-load" style="display:none">
            <div class="loading-spinner">
                <div class="rect1"></div>
                <div class="rect2"></div>
                <div class="rect3"></div>
                <div class="rect4"></div>
                <div class="rect5"></div>
            </div>
        </div>


{{-- Back to top link --}}
        <div id="top-shortcut" style="display:none;">
            <a href="#top">
                <span class="glyphicons up_arrow"></span>
            </a>
        </div>


{{-- Bootstrap Modal --}}
        <div class="modal fade" id="modal">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Modal title</h4>
                    </div>

                    <div class="modal-body ajax-block">
                        <p>Modal Content</p>
                    </div>

                    <div class="modal-footer">
                        <a href="#" class="btn btn-default" data-dismiss="modal">Cancel</a>
                        <a href="#" class="btn btn-primary">Ok</a>
                    </div>

                </div>{{-- /.modal-content --}}
            </div>{{-- /.modal-dialog --}}

            <div class="clearfix"></div>
        </div>{{-- /.modal --}}


{{-- Javascript Disabled Message --}}
        <noscript>
            <div class="noscript">
                <div class="notice-inner">
                    <div class="notice-title">
                        <strong>JavaScript Disabled:</strong>
                        You must have JavaScript enabled to utilize the functionality of this website.
                    </div>
                </div>
            </div>
        </noscript>


{{-- Internet Explorer Message --}}
<!--[if lt IE 9]>
<div class="ie-message">
                <div class="notice-inner">
                    <div class="notice-title">
                        <strong>Legacy Browser Detected:</strong>
                        Please update to the latest version of
                        <a href="http://www.browserchoice.eu/BrowserChoice/browserchoice_en.htm" target="_blank">Internet Explorer</a> to continue.
                    </div>
                </div>
            </div>
<![endif]-->
