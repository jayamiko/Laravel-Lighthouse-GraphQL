<?php

namespace App\GraphQL\Mutations;

use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;

class DeletePostMutation
{
    public function __invoke($root, array $args)
    {
        if (!Auth::guard('sanctum')->check()) {
            throw new AuthenticationException('Unauthenticated');
        }

        $post = Post::findOrFail($args['id']);
        $currentUserId = auth()->id();

        if ($post->id_user !== $currentUserId) {
            throw new \Exception('Access denied: You are not allowed to delete this post');
        }


        $post->delete();

        return "Post deleted successfully";
    }
}
