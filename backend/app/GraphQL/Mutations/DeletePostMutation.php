<?php

namespace App\GraphQL\Mutations;

use App\Models\Post;

class DeletePostMutation
{
    public function __invoke($root, array $args)
    {
        $post = Post::findOrFail($args['id']);
        $currentUserId = auth()->id();

        if ($post->id_user !== $currentUserId) {
            throw new \Exception('Access denied: You are not allowed to delete this post');
        }

        $post->delete();

        return "Post deleted successfully";
    }
}
