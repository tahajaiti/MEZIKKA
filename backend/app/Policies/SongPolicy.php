<?php

namespace App\Policies;

use App\Models\Song;
use App\Models\User;

class SongPolicy
{

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Song $song): bool
    {
        return $user->id === $song->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Song $song): bool
    {
        return $user->id === $song->user_id;
    }
}