<?php

namespace App\Services;

use App\Contracts\IStatisticsService;
use App\Models\Genre;
use App\Models\Playlist;
use App\Models\Song;
use App\Models\User;

class StatisticsService implements IStatisticsService {


    public function getStats(): array {
        return [
            'total_users' => User::count(),
            'total_songs' => Song::count(),
            'total_playlists' => Playlist::count(),
            'total_genres' => Genre::count()
        ];
    }

}