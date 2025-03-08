<?php

namespace App\Helpers;

use App\Models\Profile;
use Illuminate\Support\Str;

class Gen
{

    /**
     * Generate a unique username
     * @param string $name
     * @return string
     */

    public static function username(string $name)
    {

        $name = Str::slug($name);


        $base = [
            $name,
            substr($name, 0, 3) . rand(100, 999),
            $name . rand(1, 99),
            $name . Str::random(3)
        ];


        foreach ($base as $username) {
            if (!Profile::where("username", $username)->exists()) {
                return $username;
            }
        }

        return $name . Str::random(5);
    }

    /**
     * Check if a username exists
     * @param string $username
     * @return bool
     */

    public static function check(string $username)
    {
        return Profile::where("username", $username)->exists();
    }

}
