<?php

namespace App\GraphQL\Queries;

use App\Models\Post;

class PostByIdQuery
{
    public function __invoke($_, array $args)
    {
        return Post::find($args['id']);
    }
}
