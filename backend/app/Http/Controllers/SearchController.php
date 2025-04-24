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

    public function userSearch(Request $request)
    {
        $users = $this->searchService->userSearch($request);

        if (!$users) {
            return Res::error('Failed to search');
        }

        return Res::success($users, 'Search results');
    }

    public function playlistSearch(Request $request)
    {
        $playlists = $this->searchService->playlistSearch($request);

        if (!$playlists) {
            return Res::error('Failed to search');
        }

        return Res::success($playlists, 'Search results');
    }
}
