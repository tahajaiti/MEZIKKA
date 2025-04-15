<?php

namespace App\Http\Controllers;

use App\Helpers\Res;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{


    public function show(Request $request, string $id)
    {
        $user = User::with(['profile', 'followers'])->find($id);

        if (!$user) {
            return Res::error('User not found', 404);
        }

        $authUser = Auth::user();
        $isFollowing = $authUser ? $authUser->isFollowing($user->id) : false;

        return Res::success([
            'user' => $user,
            'is_following' => $isFollowing,
        ]);
    }


}
