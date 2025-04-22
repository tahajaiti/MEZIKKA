<?php

namespace App\Http\Controllers;

use App\Helpers\Res;
use App\Services\SearchService;
use Illuminate\Http\Request;

class SearchController extends Controller
{

    private SearchService $searchService;

    public function __construct(SearchService $searchService)
    {
        $this->searchService = $searchService;
    }

    public function search (Request $request)
    {
        $songs = $this->searchService->search($request);

        if (!$songs) {
            return Res::error('Failed to search');
        }

        return Res::success($songs, 'Search results');
    }

}
