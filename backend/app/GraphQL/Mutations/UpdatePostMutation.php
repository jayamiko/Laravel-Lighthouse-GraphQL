<?php

namespace App\GraphQL\Mutations;

use App\Models\Post;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;

class UpdatePostMutation
{
    public function __invoke($root, array $args)
    {
        if (!Auth::guard('sanctum')->check()) {
            throw new AuthenticationException('Unauthenticated');
        }

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
