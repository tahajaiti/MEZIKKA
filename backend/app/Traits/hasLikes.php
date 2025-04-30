<?php

namespace App\Traits;

use App\Models\Like;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait hasLikes
{
    public function likes(): MorphMany
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    protected static function bootHasLikes(): void
    {
        static::deleting(function ($model) {
            $model->likes()->delete();
        });
    }
}
