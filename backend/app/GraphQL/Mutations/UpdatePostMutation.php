<?php

namespace App\GraphQL\Mutations;

use App\Models\Post;
use Illuminate\Support\Facades\Log;

class UpdatePostMutation
{
    public function __invoke($root, array $args)
    {
        $post = Post::findOrFail($args['id']);
        $currentUserId = auth()->id();

        if ($post->id_user !== $currentUserId) {
            throw new \Exception('Access denied: You are not allowed to update this post');
        }

        if (isset($args['title'])) {
            $post->title = $args['title'];
        }
        if (isset($args['content'])) {
            $post->content = $args['content'];
        }

        $post->save();
        return "Update post succesfully";
    }
}
