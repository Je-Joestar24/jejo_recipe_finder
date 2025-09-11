<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Database\QueryException;

class RegisterUserController extends Controller
{
    /**
     * Handle user signup and return JSON response.
     */
    public function store(RegisterUserRequest $request)
    {
        $data = $request->validated();

        try {
            $user = User::create($data);

            return new UserResource($user);
        } catch (QueryException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create user.',
            ], 500);
        }
    }
}
