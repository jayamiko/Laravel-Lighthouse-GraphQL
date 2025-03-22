<?php

namespace App\GraphQL\Queries;

use App\Models\Post;

class PostsQuery
{
    public function __invoke($_, array $args)
    {
        return Post::all();
    }
}
