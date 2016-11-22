

@if(!empty($enquiries) && $enquiries->count() > 0)
    <table class="table table-striped table-bordered table-responsive ajax-block data-tables">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Enquiry Type</th>
                <th>Subject</th>

                <th>Date</th>
                {{--<th>Status</th>--}}
                <th width="120px"></th>
            </tr>
        </thead>

        <tbody>
            @foreach($enquiries AS $enquiry)
                <tr>
                    <td>{{ $enquiry->id }}</td>
                    <td>{{ $enquiry->name }}</td>
                    <td>{{ $types[$enquiry->enquiry_type_id] }}</td>
                    <td>
                        @if(!empty($enquiry->subject))
                            {{ $enquiry->subject }}
                        @else
                            {{ $types[$enquiry->enquiry_type_id] }}
                        @endif
                    </td>

                    <td>{{ $enquiry->created_at->format('d/m/Y H:i') }}</td>

                    {{--<td>--}}
                        {{--@if ($enquiry->send_status == 1)--}}
                            {{--{{ 'Sent' }}--}}
                        {{--@else--}}
                            {{--{{ 'Failed' }}--}}
                        {{--@endif--}}
                    {{--</td>--}}

                    <td>
                        <div class="btn-group pull-right">
                            {{--@if($enquiry->send_status == 0)--}}
                                {{--<a href="{{ URL::route('admin.enquiry.send', $enquiry->id) }}" class="btn btn-danger">--}}
                                    {{--<span class="glyphicons send"></span>--}}
                                {{--</a>--}}
                            {{--@endif--}}

                            @if(Auth::user()->can('view_enquiry'))
                                <a href="{{ URL::route('admin.enquiry.view', $enquiry->id) }}" class="btn btn-default">
                                    <span class="mdi-image-remove-red-eye"></span>
                                </a>
                            @endif

                            @if(Auth::user()->can('delete_enquiry'))
                                <a href="{{ URL::route('admin.enquiry.delete', $enquiry->id) }}" class="btn btn-danger delete">
                                    <span class="mdi-action-delete"></span>
                                </a>
                            @endif
                        </div>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@else
<table class="table table-striped table-bordered table-responsive">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Enquiry Type</th>
                <th>Subject</th>
                <th>Date</th>
                {{--<th>Status</th>--}}
                <th width="120px"></th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td colspan="7">
                    <center>No Enquiries are available at this time.</center>
                </td>
            </tr>
        </tbody>
</table>
@endif
