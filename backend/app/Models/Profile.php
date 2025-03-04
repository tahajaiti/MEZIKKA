<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    //

    protected $fillable = [
        "bio",
        "avatar"
    ];

    public function user (){
        return $this->belongsTo(User::class);
    }
}