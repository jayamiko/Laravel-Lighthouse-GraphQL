<?php

use Illuminate\Support\Facades\Route;
use MLL\GraphQLPlayground\GraphQLPlayground;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/graphql-playground', fn () => GraphQLPlayground::make('/graphql'));

