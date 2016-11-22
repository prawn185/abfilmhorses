<section id="breadcrumbs">

    <div class="container">

        <div class="row">

            <div class="col-sm-12">

                <ul class="breadcrumb">
                    @if (isset($breadcrumbs) && !empty($breadcrumbs))
                        @foreach ($breadcrumbs as $breadcrumb)
                            @if(is_array($breadcrumb))
                                <li><a href="{{ $breadcrumb['url'] }}">{{ $breadcrumb['label'] }}</a></li>
                            @else
                                <li>{{ $breadcrumb }}</li>
                            @endif
                        @endforeach
                    @endif
                </ul>

            </div>

        </div>

    </div>

</section>


