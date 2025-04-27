<?php

namespace App\Contracts;

use Illuminate\Http\Request;

interface ISearchService
{
    public function search(Request $request);

    public function userSearch(Request $request);

    public function playlistSearch(Request $request);
}