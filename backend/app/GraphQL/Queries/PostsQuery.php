<?php

namespace App\GraphQL\Queries;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;

class PostsQuery
{
    public function __invoke($_, array $args)
    {
        if (!Auth::guard('sanctum')->check()) {
            throw new AuthenticationException('Unauthenticated');
        }
        return Post::all();
    }
}
