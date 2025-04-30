<?php

namespace App\Models;

use App\Traits\hasLikes;
use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    use hasLikes;

    protected $fillable = [
        'title',
        'description',
        'cover',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function songs()
    {
        return $this->belongsToMany(Song::class, 'playlist_items')
            ->withPivot('order')
            ->withTimestamps()
            ->orderBy('playlist_items.order');
    }
}
