<?php

namespace App\Services;

use App\Models\Playlist;
use App\Models\Song;
use App\Models\User;
use App\Services\Interfaces\ISearchService;
use Illuminate\Http\Request;



class SearchService implements ISearchService
{

    public function search(Request $request)
    {

        $query = $request->input('q');
        $sort = $request->input('sort', 'newest');

        if (!$query) {
            return response()->json([], 200);
        }

        $songsQuery = Song::query()
            ->where(function ($q) use ($query) {
                $q->where('name', 'ilike', "%{$query}%")
                    ->orWhere('description', 'ilike', "%{$query}%")
                    ->orWhereHas('genre', function ($q) use ($query) {
                        $q->where('name', 'ilike', "%{$query}%");
                    })
                    ->orWhereHas('user.profile', function ($q) use ($query) {
                        $q->where('username', 'ilike', "%{$query}%");
                    });
            })
            ->with([
                'genre:id,name',
                'user:id',
                'user.profile:id,user_id,username'
            ])
            ->withCount('likes');

        switch ($sort) {
            case 'most_liked':
                $songsQuery->orderByDesc('likes_count');
                break;
            case 'least_liked':
                $songsQuery->orderBy('likes_count');
                break;
            case 'oldest':
                $songsQuery->orderBy('created_at');
                break;
            case 'newest':
            default:
                $songsQuery->orderByDesc('created_at');
                break;
        }

        $songs = $songsQuery->limit(15)->get();

        return $songs;
    }

    public function userSearch(Request $request)
    {

        $query = $request->input('q');
        $sort = $request->input('sort', 'newest');

        if (!$query) {
            return false;
        }

        $usersQuery = User::query()
            ->where(function ($q) use ($query) {
                $q->where('name', 'ilike', "%{$query}%")
                    ->orWhereHas('profile', function ($q) use ($query) {
                        $q->where('username', 'ilike', "%{$query}%");
                    });
            })
            ->with(['profile'])
            ->withCount('followers');

        switch ($sort) {
            case 'most_followed':
                $usersQuery->orderByDesc('followers_count');
                break;
            case 'least_followed':
                $usersQuery->orderBy('followers_count');
                break;
            case 'newest':
                $usersQuery->latest();
                break;
            case 'oldest':
                break;
            default:
                $usersQuery->latest();
                break;
        }

        $users = $usersQuery->limit(15)->get();

        return $users;
    }

    public function playlistSearch(Request $request)
    {
        $query = $request->input('q');
        $sort = $request->input('sort', 'newest');

        if (!$query) {
            return response()->json([], 200);
        }

        $playlistQuery = Playlist::query()
            ->where(function ($q) use ($query) {
                $q->where('title', 'ilike', "%{$query}%")
                    ->orWhere('description', 'ilike', "%{$query}%")
                    ->orWhereHas('user.profile', function ($q) use ($query) {
                        $q->where('username', 'ilike', "%{$query}%");
                    });
            })
            ->with([
                'user:id',
                'user.profile:id,user_id,username'
            ])
            ->withCount('likes','songs');

        switch ($sort) {
            case 'most_liked':
                $playlistQuery->orderByDesc('likes_count');
                break;
            case 'least_liked':
                $playlistQuery->orderBy('likes_count');
                break;
            case 'oldest':
                $playlistQuery->orderBy('created_at');
                break;
            case 'newest':
            default:
                $playlistQuery->orderByDesc('created_at');
                break;
        }

        $playlists = $playlistQuery->limit(15)->get();

        return $playlists;
    }

}