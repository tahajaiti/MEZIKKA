<?php

namespace App\Http\Controllers;

use App\Helpers\Res;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function serve(Request $request, string $path){

        if (!Storage::disk('public')->exists($path)) {
            return Res::error('File not found', 404);
        }

        $fullPath = Storage::disk('public')->path($path);
        $mimeType = Storage::disk('public')->mimeType($path);

        return response()->file($fullPath, [
            'Content-Type' => $mimeType,
        ]);

    }
}