@if ($page->partials && count($page->partials) > 0)

    <div id="content">

        @foreach ($page->partials as $partial)

            <div {{ $partial->container_attributes }}>
                <div class="container">

                    <div class="section" id="partial-{{ $partial->id }}">

                        @if (!empty($partial->title))
                            <h2>{{ $partial->title }}</h2>
                        @endif

                        {{ $partial->present()->frontend }}

                    </div>

                </div>
            </div>

        @endforeach

    </div>

@endif
