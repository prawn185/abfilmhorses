<div id="map"
    data-lat="{{ Config::get('base::company_lat') }}"
    data-lng="{{ Config::get('base::company_lng') }}"
    data-name="{{ Config::get('base::company_name') }}"
    data-address="{{ Config::get('base::company_address'), Config::get('base::company_town'), Config::get('base::company_county'), Config::get('base::company_postcode') }}">
</div>
