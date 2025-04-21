<?php

namespace App\Http\Controllers;

use App\Helpers\Res;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function serve(Request $request, string $path)
    {

        $song = Song::where('id', $path)->first();
        if (!$song) {
            return Res::error('File not found', 404);
        }

        $fullPath = Storage::disk('public')->path($song->file_path);
        if (!file_exists($fullPath)) {
            return Res::error('File not found', 404);
        }
        $mimeType = Storage::disk('public')->mimeType($song->file_path);
        $response = response()->file($fullPath, [
            'Content-Type' => $mimeType,
            'Content-Disposition' => 'inline; filename="' . basename($song->file_path) . '"',
        ]);

        return $response;

        // if (!Storage::disk('public')->exists($path)) {
        //     return Res::error('File not found', 404);
        // }

        // $fullPath = Storage::disk('public')->path($path);
        // $mimeType = Storage::disk('public')->mimeType($path);

        // return response()->file($fullPath, [
        //     'Content-Type' => $mimeType,
        // ]);
    }
}
