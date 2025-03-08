<?php
namespace App\Services;

use App\Facades\JWT;




class ProfileService
{


    public function update(array $data)
    {
        $user = JWT::user();
        $profile = $user->profile;

        return $profile;
    }




}