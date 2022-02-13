<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Persona;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clientes = DB::table('cliente as c')
            ->join('empresa', 'c.id_empresa', '=', 'empresa.id_empresa')
            ->join('persona', 'c.id_persona', '=', 'persona.id_persona')
            ->orderBy('c.id_cliente', 'desc')
            ->get();
        return $clientes;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $v = $this->validate(request(), [
            'estado_cli' => 'required',
            'fecha_inicio' => 'required',
            'fecha_fin' => 'required',
        ]);
        if ($v) {
            $clientes = new Cliente();
            $clientes->id_empresa = $request->input('id_empresa');
            $clientes->id_direccion = $request->input('id_direccion');
            $clientes->id_persona = $request->input('id_persona');
            $clientes->tipo_cli = $request->input('tipo_cli');
            $clientes->estado_cli = $request->input('estado_cli');
            $clientes->fecha_inicio = $request->input('fecha_inicio');
            $clientes->fecha_fin = $request->input('fecha_fin');
            $clientes->save();
            $persona = Persona::where(
                'id_persona',
                $request->id_persona
            )->first();
            $nombre = $persona->nombre_persona;
            $apellido = $persona->apellido_persona;
            $dni = $persona->dni;
            $username = $nombre . ' ' . $apellido;
            User::create([
                'name' => $username,
                'email' => $request->email,
                'password' => Hash::make($dni),
            ]);
            return;
        } else {
            return back()->withInput($request->all());
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $v = $this->validate(request(), [
            'observ_cli' => 'required',
            'estado_cli' => 'required',
            'fecha_fin' => 'required',
            'fecha_fin' => 'required',
        ]);
        if ($v) {
            $id_empresa = $request->input('id_empresa');
            $id_persona = $request->input('id_persona');
            $observ_cli = $request->input('observ_cli');
            $estado_cli = $request->input('estado_cli');
            $fecha_inicio = $request->input('fecha_inicio');
            $fecha_fin = $request->input('fecha_fin');

            DB::table('cliente')
                ->where('id_cliente', $id)
                ->update([
                    'observ_cli' => $observ_cli,
                    'estado_cli' => $estado_cli,
                    'fecha_inicio' => $fecha_inicio,
                    'fecha_fin' => $fecha_fin,
                    'id_empresa' => $id_empresa,
                    'id_persona' => $id_persona,
                ]);
            return;
        } else {
            return back()->withInput($request->all());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $estado_cli = 'I';
        DB::table('cliente')
            ->where('id_cliente', $id)
            ->update(['estado_cli' => $estado_cli]);
        return;
    }
}
