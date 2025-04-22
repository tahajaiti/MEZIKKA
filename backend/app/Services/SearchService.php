<?php

namespace App\Services;

use App\Models\Song;
use App\Models\User;
use Illuminate\Http\Request;



class SearchService
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

        if (!$query) {
            return false;
        }

        $users = User::query()
            ->where(function ($q) use ($query) {
                $q->where('name', 'ilike', "%{$query}%")
                    ->orWhereHas('profile', function ($q) use ($query) {
                        $q->where('username', 'ilike', "%{$query}%");
                    });
            })->with('profile')->latest()->limit(15)->get();

        return $users;
    }

}
