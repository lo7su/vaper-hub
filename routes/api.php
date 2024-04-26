<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\BrandController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('product', [ProductController::class, 'get']);
Route::get('product/brand/{brandId}', [ProductController::class, 'getByBrand']);
Route::get('product/strength/{strength}', [ProductController::class, 'getByStrength']);
Route::get('product/charger/{charger}', [ProductController::class, 'getByCharger']);
Route::get('product/puffs/{puffs}', [ProductController::class, 'getByPuffs']);
Route::get('product/taste', [ProductController::class, 'getByTaste']);
Route::get('product/{id}', [ProductController::class, 'show']);
Route::get('products/tastes', [ProductController::class, 'getUniqueTastes']);
Route::get('products/puffs', [ProductController::class, 'getUniquePuffs']);

Route::get('brand', [BrandController::class, 'get']);
Route::get('brand/{id}', [BrandController::class, 'show']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


