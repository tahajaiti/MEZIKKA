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

    private const MODEL_TYPES = [
        'user' => User::class,
        'song' => Song::class,
        'playlist' => Playlist::class,
        'like' => Like::class,
    ];

    public function __call($method, $args) {

        if ($method === 'stats'){

            $modelName = self::MODEL_TYPES[$args[0]] ?? null;

            switch ($args[0]) {
                case 'user':
                    return $this->getStatsForModel($modelName,$args[1]);
                case 'song':
                    return $this->getStatsForModel($modelName,$args[1]);
                case 'playlist':
                    return $this->getStatsForModel($modelName,$args[1]);
                case 'like':
                    return $this->getStatsForModel($modelName,$args[1]);
                default:
                    throw new InvalidArgumentException('Invalid model type provided');
            }
        }
    }

    public function stats(string $modelType, int $period): array
    {
        $modelName = self::MODEL_TYPES[$modelType] ?? null;

        if (!$modelName) {
            throw new InvalidArgumentException('Invalid model type provided');
        }

        return $this->getStatsForModel($modelName, $period);
    }

    public function getTopGenres() {
        return Genre::withCount('songs')->orderByDesc('songs_count')->take(5)->get();
    }

    public function getTopSongs() {
        return Song::withCount('likes')->orderByDesc('likes_count')->take(5)->get();
    }

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
}
