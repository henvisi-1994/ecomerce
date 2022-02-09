<?php

use App\Http\Controllers\BodegaController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\MarcaController;
use App\Http\Controllers\ProductoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::prefix('productos')->group( function (){
    Route::get('/' ,[ProductoController::class,'index']);
    Route::get('/{id}' ,[ProductoController::class,'show']);
});
Route::prefix('categorias')->group( function (){
    Route::get('/' ,[CategoriaController::class,'index']);
});
Route::prefix('marcas')->group( function (){
    Route::get('/' ,[MarcaController::class,'index']);
});
Route::prefix('empresas')->group( function (){
    Route::get('/' ,[EmpresaController::class,'index']);
});
Route::prefix('bodegas')->group( function (){
    Route::get('/' ,[BodegaController::class,'index']);
});
Route::prefix('clientes')->group( function (){
    Route::get('/' ,[ClienteController::class,'index']);
});

