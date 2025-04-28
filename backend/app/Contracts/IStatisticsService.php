<?php

namespace App\Contracts;


interface IStatisticsService
{
    public function getUserStats(int $period): array;
    public function getSongStats(int $period): array;
    public function getPlaylistStats(int $period): array;
    public function getLikeStats(int $period): array;

    public function getTopGenres();
    public function getTopSongs();
}
