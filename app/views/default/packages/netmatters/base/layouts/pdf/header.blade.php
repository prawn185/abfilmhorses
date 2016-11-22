<!-- Main Header -->
<table width="100%" cellspacing="0" cellpadding="0" id="header" style="margin-top: 20px;">
    <tr>
        <td width="70%">
        @if (Config::get('base::admin.useLogo') == true)
                <img src="{{ URL::to('/') }}{{ Config::get('base::frontend.logo.src') }}" alt="{{ Config::get('base::company_name') }}">
            @else
                <span class="glyphicons fire"></span> {{ Config::get('base::company_name') }}
            @endif

        </td>
        <td>
            <table cellspacing="0" class="contact text-right" bgcolor="#ffffff" style="margin-right: 30px; text-align: right; border-collapse: collapse; border-spacing: 0;
                   border-color: #808080">
                <tr>
                    <td style="font-family: 'Montserrat', Arial;">Email: {{ Config::get('base::company_email') }}</td>
                </tr>
                <tr>
                    <td style="font-family: 'Montserrat', Arial; padding-bottom:20px;">Telephone: {{ Config::get('base::company_telephone') }}</td>
                </tr>

            </table>
        </td>
    </tr>
    <tr>
        <td></td>
    </tr>
    <tr id="breadcrumb" width="100%">
        <td colspan="2">
            <table width="100%" style="background: #333; padding: 14px 0 13px 16px;">
                <tr width="100%">
                    <td colspan="2" width="100%">
                        <span style="color: #FFF;font-size: 16px;margin: 0 0 0 10px; font-family: 'Montserrat', Arial; text-transform: uppercase;">
                            {{ $title or 'Quote/Order'}}</span>
                    </td>
                </tr>
                @if(isset($quote) and is_object($quote))
                    <tr>
                        <td>
                            <p style="color: #333; font-size: 10px; margin: 0 0 10px 15px; display: inline; font-family: 'Montserrat', Arial;">
                                Quote No: {{ $quote->id }}
                            </p>
                        </td>
                    </tr>
                @endif
            </table>
        </td>
    </tr>
</table>
