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

        if (!$query) {
            return false;
        }

        $songs = Song::query()
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
                'user',
                'user.profile'
            ])->withCount('likes')
            ->latest()
            ->limit(15)
            ->get();

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