<?php

namespace App\Helpers;

use App\Models\Profile;
use Illuminate\Support\Str;

class Gen {



    public static function username(string $name) {

        $name = Str::slug($name);


        $base = [
            $name,
            substr($name, 0, 3) . rand(100, 999),
            $name . rand(1,99),
            $name . Str::random(3)
        ];


        foreach($base as $username) {
            if (!Profile::where("username", $username)->exists()) {
                return $username;
            }
        }

        return $name . Str::random(5);
    }

}
