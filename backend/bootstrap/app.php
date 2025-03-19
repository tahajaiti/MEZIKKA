<?php

use App\Helpers\Res;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Foundation\Application;
use App\Http\Middleware\ApiErrMiddleware;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        api: __DIR__ . '/../routes/api.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
        $middleware->alias([
            'jwt' => JwtMiddleware::class,
        ]);
        $middleware->append(ApiErrMiddleware::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
        $exceptions->render(function (NotFoundHttpException $e) {
            return Res::error('Resource not found', 404);
        });
        $exceptions->render(function (ErrorException $e) {
            return Res::error('Resource not found', 404);
        });
    })->create();