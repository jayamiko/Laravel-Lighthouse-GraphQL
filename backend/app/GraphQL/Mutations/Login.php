<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use GraphQL\Error\UserError;

class Login
{
    public function __invoke($_, array $args)
    {
        $validator = Validator::make($args, [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            throw new UserError($validator->errors()->first());
        }

        $user = User::where('email', $args['email'])->first();

        if (!$user || !Hash::check($args['password'], $user->password)) {
            throw new UserError('Invalid credentials');
        }

        $token = $user->createToken('graphql-token')->plainTextToken;

        return [
            'token' => $token,
            'user' => $user,
        ];
    }
}
