<?php

namespace App\Contracts;

interface IFollowService
{
    public function follow(string $id): bool;

    public function unfollow(string $id): bool;

    public function myFollows();

    public function myFollowers();

    public function follows(string $id);
}