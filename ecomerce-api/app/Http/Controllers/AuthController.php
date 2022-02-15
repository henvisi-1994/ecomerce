<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Empleado;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validateData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);
        $user = User::create([
            'name' => $validateData['name'],
            'email' => $validateData['email'],
            'password' => Hash::make($validateData['password']),
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(
                [
                    'message' => 'Email o contraseña invalido',
                ],
                401
            );
        }
        $user = User::where('email', $request['email'])->first();
        $empleado = Empleado::where('id_usu',$user->id)->get();
        $cliente = Cliente::where('id_usu',$user->id)->get();
      $isEmpleado = false;
        $isCliente=false;
        $id_empleado=0;
        $id_cliente=0;
        if(count($empleado)==1){
            $isEmpleado=true;
            $id_empleado= $empleado[0]->id_empleado;
        }else{
            $isEmpleado= false;
        }
        if(count($cliente)==1){
            $isCliente=true;
            $id_cliente= $cliente[0]->id_cliente;
        }else{
            $isCliente= false;
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'User'=> $user,
            'is_empleado' => $isEmpleado,
            'is_cliente' =>$isCliente,
            'id_empleado' => $id_empleado,
            'id_cliente'=>  $id_cliente
        ]);
    }
}
