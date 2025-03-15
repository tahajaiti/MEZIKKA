<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Song extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'file_path',
        'cover_path',
        'description',
        'metadata',
        'parent_id',
        'remix_id',
        'user_id'
    ];

    protected $casts = [
        'metadata' => 'json',
    ];

    /**
     * Get the original song if this song is a remix.
     */
    public function original()
    {
        return $this->belongsTo(Song::class, 'parent_id');
    }

    /**
     * Get all the remixes of this song.
     */
    public function remixes()
    {
        return $this->hasMany(Song::class, 'parent_id');
    }

    /**
     * Get the song that this song remixes.
     */
    public function remixOf()
    {
        return $this->belongsTo(Song::class, 'remix_id');
    }

    
}
