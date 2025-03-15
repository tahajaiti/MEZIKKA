<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SongPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'song_file' => 'required|file|mimes:mp3,ogg,wav,flac',
            'cover_file' => 'required|file|mimes:jpeg,png|max:2048',
            'description' => 'string',
            'metadata' => 'json',
        ];
    }
}
