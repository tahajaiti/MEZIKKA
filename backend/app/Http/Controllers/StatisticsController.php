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


    public function getStatistics()
    {
        $statistics = $this->statisticsService->getStats();

        if (!$statistics) {
            return Res::error('Failed to get statistics');
        }

        return Res::success($statistics, 'Statistics retrieved successfully');
    }

}
