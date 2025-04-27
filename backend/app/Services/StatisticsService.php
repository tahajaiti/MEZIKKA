<?php

namespace App\Services;

use App\Contracts\IStatisticsService;
use App\Models\Genre;
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

        $totalCount = $model::count();

        if ($period === 0 || $totalCount === 0) {
            return [
                'total' => $totalCount,
                'growth' => 0.00
            ];
        }

        $startPeriodDate = now()->subDays($period)->startOfDay();
        $newRecordCount = $model::where('created_at', '>=', $startPeriodDate)->count();

        $growthRate = 0.00;
        $previousCount = $totalCount - $newRecordCount;

        if ($previousCount > 0 && $newRecordCount > 0) {
            $growthRate = $newRecordCount / $previousCount * 100;
        }

        return [
            'total' => $totalCount,
            'growth' => round($growthRate, 2)
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
}
