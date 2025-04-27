<?php

namespace App\Contracts;

use App\Http\Requests\ProfileUpdateRequest;

interface IProfileService
{
    public function update(ProfileUpdateRequest $request);
}
