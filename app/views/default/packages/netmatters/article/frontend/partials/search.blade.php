{{ Form::open(array('route' => 'admin.search', 'method' => 'GET', 'class' => 'form-horizontal wizard search-form')) }}

{{ Form::hidden('category_id', $cat) }}
{{ Form::text('search', '', array('class' => 'form-control', 'placeholder' => 'Search')) }}

    <button type="submit">
        <i class="fa fa-search"></i>
    </button>

{{ Form::close() }}
