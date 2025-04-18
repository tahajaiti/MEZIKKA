<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RefreshToken extends Model
{
    //
    protected $fillable = [
        'user_id',
        'token',
        'expires_at',
    ];
    protected $casts = [
        'expires_at' => 'datetime',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function isExpired()
    {
        return $this->expires_at < now();
    }
    public function revoke()
    {
        $this->delete();
    }
}
