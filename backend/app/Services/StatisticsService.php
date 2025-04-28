<?php

namespace App\Services;

use App\Contracts\IStatisticsService;
use App\Models\Genre;
use App\Models\Like;
use App\Models\Playlist;
use App\Models\Song;
use App\Models\User;
use InvalidArgumentException;

class StatisticsService implements IStatisticsService
{


    private function getStatsForModel(string $model, int $period): array
    {
        if ($period < 0) {
            throw new InvalidArgumentException('Period cannot be negative');
        }

        if (!class_exists($model)) {
            throw new InvalidArgumentException('Invalid model class provided');
        }

        if ($period === 0) {
            $totalCount = $model::count();

            return [
                'total' => $totalCount,
                'growth' => 0.00,
            ];
        }

        $startPeriodDate = now()->subDays($period)->startOfDay();

        $totalCount = $model::where('created_at', '>=', $startPeriodDate)->count();
        $previousCount = $model::where('created_at', '<', $startPeriodDate)->count();

        $growthRate = 0.00;
        if ($previousCount > 0) {
            $growthRate = ($totalCount / $previousCount) * 100;
        }

        return [
            'total' => $totalCount,
            'growth' => round($growthRate, 2),
        ];
    }

    public function getUserStats(int $period): array
    {
        return $this->getStatsForModel(User::class, $period);
    }

    public function getSongStats(int $period): array
    {
        return $this->getStatsForModel(Song::class, $period);
    }

    public function getPlaylistStats(int $period): array
    {
        return $this->getStatsForModel(Playlist::class, $period);
    }

    public function getLikeStats(int $period): array{
        return $this->getStatsForModel(Like::class, $period);
    }

    public function getTopGenres() {
        return Genre::withCount('songs')->orderByDesc('songs_count')->take(5)->get();
    }

    public function getTopSongs() {
        return Song::withCount('likes')->orderByDesc('likes_count')->take(5)->get();
    }
}