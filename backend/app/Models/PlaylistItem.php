<?php

namespace App\Models;

use App\Models\Song;
use App\Models\Playlist;
use Illuminate\Database\Eloquent\Model;

class PlaylistItem extends Model
{
    //

    protected $fillable = [
        'playlist_id', 'song_id', 'order'
    ];

    public function playlist()
    {
        return $this->belongsTo(Playlist::class);
    }

    public function song()
    {
        return $this->belongsTo(Song::class);
    }

    public static function nextOrder(string $id) {
        return self::where('playlist_id', $id)->max('order') + 1;
    }
}
