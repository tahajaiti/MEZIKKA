<?php

namespace App\Http\Controllers;

use App\Helpers\Res;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{


    public function show(Request $request, string $id)
    {

        $user = User::where('id', $id)->first();

        if (!$user) {
            return Res::error('User not found', 404);
        }


        return $user->load(['profile', 'followers']);
    }

}
