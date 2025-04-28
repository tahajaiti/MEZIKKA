<?php

namespace App\Http\Controllers;

use App\Contracts\IStatisticsService;
use App\Helpers\Res;
use Illuminate\Http\Request;

class StatisticsController extends Controller
{

    private IStatisticsService $statisticsService;

    public function __construct(IStatisticsService $statisticsService)
    {
        $this->statisticsService = $statisticsService;
    }

    public function getUserStats(string $period)
    {
        $userGrowth = $this->statisticsService->getUserStats($period);

        if (!$userGrowth) {
            return Res::error('Failed to get user growth');
        }

        return Res::success($userGrowth, 'User growth retrieved successfully');
    }

    public function getSongStats(string $period)
    {
        $songGrowth = $this->statisticsService->getSongStats($period);

        if (!$songGrowth) {
            return Res::error('Failed to get song growth');
        }

        return Res::success($songGrowth, 'Song growth retrieved successfully');
    }

    public function getPlaylistStats(string $period)
    {
        $playlistGrowth = $this->statisticsService->getPlaylistStats($period);

        if (!$playlistGrowth) {
            return Res::error('Failed to get playlist growth');
        }

        return Res::success($playlistGrowth, 'Playlist growth retrieved successfully');
    }

    public function getLikeStats(string $period) {
        $likeGrowth = $this->statisticsService->getLikeStats($period);

        if (!$likeGrowth) {
            return Res::error('Failed to get likes growth');
        }

        return Res::success($likeGrowth, 'Likes growth retrieved successfully');
    }

}