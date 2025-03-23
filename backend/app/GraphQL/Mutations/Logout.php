<?php

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use GraphQL\Error\UserError;

class Logout
{
    public function __invoke($_, array $args)
    {
        $user = Auth::user();

        if (!$user) {
            throw new UserError('Not authenticated');
        }

        // Hapus token saat ini
        $user->currentAccessToken()->delete();

        return 'Successfully logged out';
    }
}
