<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->post('/graphql', function () {
    return GraphQL::execute();
});