<?php


namespace App\Contracts;


interface IUserService
{
    public function getPaginated(): array;
    public function show(string $id): array;


}
