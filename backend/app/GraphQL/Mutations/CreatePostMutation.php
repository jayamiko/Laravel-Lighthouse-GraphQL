<?php

namespace App\GraphQL\Mutations;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class CreatePostMutation
{
    public function __invoke($_, array $args)
    {
        $post = new Post();
        $post->title = $args['title'];
        $post->content = $args['content'];
        $post->id_user = Auth::id();
        $post->save();

        return 'Post created successfully';
    }
}
