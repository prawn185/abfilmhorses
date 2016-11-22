@extends('base::emails.scaffold')


@section('main')
    <table style="font-family: arial, sans-serif">
        <tr>
            <td>
                <p>You have received an email through the contact form on your website. Please see the details below.</p>
            </td>
        </tr>
        @foreach($fields as $field => $value)
        <tr>
            <td><strong>{{ $field }}</strong></td>
            <td>{{ $value }}</td>
        </tr>
        @endforeach
    </table>@stop
