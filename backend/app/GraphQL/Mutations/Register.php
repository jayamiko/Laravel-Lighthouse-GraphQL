<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use GraphQL\Error\UserError;

class Register
{
    public function __invoke($_, array $args)
    {
        $validator = Validator::make($args, [
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            throw new UserError($validator->errors()->first());
        }

        $user = new User();
        $user->name = $args['name'];
        $user->email = $args['email'];
        $user->password = Hash::make($args['password']);
        $user->save();

        return $user;
    }
}
