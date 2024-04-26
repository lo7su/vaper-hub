<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


 Route::get('/admin', function () {
     return view('dashboard');
 })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/{path}', function() {
    return file_get_contents(public_path('index.html'));
})->where('path', '^(?!admin|login|register|dashboard).*$');

Route::get('/register', function() {
    return view('auth/register');
});

Route::get('/dashboard', function() {
    return view('dashboard');
});

Route::get('/login', function() {
    return view('auth/login');
});





require __DIR__.'/auth.php';
