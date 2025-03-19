<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    //

    protected $fillable = [
        'title', 'description', 'cover' , 'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function playlistItems()
    {
        return $this->hasMany(PlaylistItem::class);
    }
}