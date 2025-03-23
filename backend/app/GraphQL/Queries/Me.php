<?php

namespace App\GraphQL\Queries;

use Illuminate\Support\Facades\Auth;

class Me
{
    public function __invoke($_, array $args)
    {
        if (!Auth::check()) {
            throw new AuthenticationException('Unauthenticated');
        }
        
        return Auth::user();
    }
}
