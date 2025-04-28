<?php

namespace App\Http\Controllers;

use App\Contracts\IUserService;
use App\Helpers\Res;
use App\Models\User;


class UserController extends Controller
{

    private IUserService $userService;

    public function __construct(IUserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(){
        $res = $this->userService->getPaginated();

        if ($res) {
            return Res::success($res);
        }

        return Res::error('Failed to get users');
    }

    public function show(string $id)
    {
        $res = $this->userService->show($id);

        if ($res) {
            return Res::success([
                'user' => $res['user'],
                'is_following' => $res['is_following'],
            ]);
        }
        return Res::error('User not found', 404);
    }

    public function destroy(string $id)
    {
        $res = $this->userService->delete($id);

        if ($res) {
            return Res::success('User deleted successfully');
        }

        return Res::error('Failed to delete user', 404);
    }

}
