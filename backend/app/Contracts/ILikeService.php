<?php

namespace App\Contracts;

use Illuminate\Pagination\LengthAwarePaginator;

interface ILikeService
{
    public function index(): array;

    public function getLikedSongs(): LengthAwarePaginator;

    public function toggleLike(string $type, string $id): string;

    public function getLikeCount(string $type, string $id): array;
}
