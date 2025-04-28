<?php

namespace App\Services;

use App\Contracts\IUserService;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;

class UserService implements IUserService
{
    public function getPaginated(): array
    {
        return User::where('id', '!=', 1)
        ->orderBy('id', 'asc')
        ->paginate(10)
        ->toArray();
    }

    public function show(string $id): array
    {
        $user = User::with(['profile', 'followers'])->find($id);

        if (!$user) {
            throw new Exception('User does not exist');
        }

        $authUser = Auth::user();
        $isFollowing = $authUser ? $authUser->isFollowing($user->id) : false;

        return [
            'user' => $user,
            'is_following' => $isFollowing
        ];
    }

}
