<?php

namespace App\Contracts;


interface IStatisticsService
{
    public function stats(string $modelType, int $period): array;

    public function getTopGenres();
    public function getTopSongs();
}
