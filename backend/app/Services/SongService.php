<?php

namespace App\Services;

use App\Contracts\ISongService;
use App\Models\Song;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\SongPostRequest;
use Illuminate\Support\Facades\Storage;

class SongService implements ISongService
{
    public function index($paginate = true)
    {
        return $this->getSongs($paginate);
    }

    public function getMostLiked($paginate = true)
    {
        return $this->getSongs($paginate, 'likes_count');
    }

    public function getByGenre(string $genre, $paginate = true)
    {
        return $this->getSongs($paginate, null, $genre);
    }

    private function getSongs($paginate = true, $sortBy = null, $genre = null)
    {
        $user = Auth::user();

        $query = Song::with(['user.profile', 'genre'])->withCount('likes');

        if ($sortBy === 'likes_count') {
            $query->orderByDesc('likes_count');
        }

        if ($genre && strtolower($genre) !== 'all') {
            $query->whereHas('genre', function ($q) use ($genre) {
                $q->whereRaw('name ILIKE ?', [$genre]);
            });
        }

        if ($paginate) {
            $songs = $query->latest()->paginate(10);
        } else {
            $songs = $query->latest()->get();
        }

        $songs->each(function ($song) use ($user) {
            $song->liked_by_user = $user ? in_array($song->id, $user->likes()->pluck('likeable_id')->toArray()) : false;
        });

        return $songs;
    }

    public function userSongs(string $id)
    {
        $user = User::findOrFail($id);
        return Song::where('user_id', $user->id)->get();
    }

    public function show(string $songId): ?Song
    {
        return Song::with(['user.profile', 'genre'])->withCount('likes')->findOrFail($songId);
    }

    public function create(SongPostRequest $request): ?Song
    {
        $user = Auth::user();
        $data = $request->validated();
        $data['user_id'] = $user->id;

        $data['file_path'] = $this->handleFileUpload($request, 'song_file', 'songs/files');
        $data['cover_path'] = $this->handleFileUpload($request, 'cover_file', 'songs/covers');

        $data['metadata'] = json_decode($data['metadata']);
        $data['description'] = $request->input('description', null);
        $data['genre_id'] = $request->input('genre_id', null);

        return Song::create($data);
    }

    public function destroy(string $songId): bool
    {
        $song = Song::findOrFail($songId);
        $res = $song->delete();
        Storage::disk('public')->delete($song->file_path);
        Storage::disk('public')->delete($song->cover_path);

        return $res;
    }

    private function handleFileUpload($request, $fileInputName, $storagePath)
    {
        return $request->hasFile($fileInputName) ? $request->file($fileInputName)->store($storagePath, 'public') : null;
    }

}
