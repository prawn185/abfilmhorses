@if ($menu->items)
    <ul class="row">

    @foreach ($menu->items as $package)
            <div class="col-md-6 packages">

        <div class="icon-container">
            <a href="{{ $package->getURL() }}" class="icon">
                {{ HTML::image($package->getImage(), $package->getName()) }}
            </a>
        </div>

        <div class="package-desc">

            <h2>
                <a href="{{ $package->getURL() }}">
                    {{ $package->getName() }}
                </a>
            </h2>

            <p>{{ strip_tags($package->description) }}</p>

            <a href="{{ $package->getURL() }}" class="btn red package-btn">
                View Packages & View Solutions
                <i class="iconmoon arrow-right"></i>
            </a>

        </div>

    </div>
        @endforeach

</ul>
@endif
