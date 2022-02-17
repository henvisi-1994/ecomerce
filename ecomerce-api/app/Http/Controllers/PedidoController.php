<?php

namespace App\Http\Controllers;

use App\Models\Envio;
use App\Models\EstadoPedido;
use App\Models\Pedido;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $productos = DB::table('pedido as ped')
            ->join('cliente', 'ped.id_cliente', '=', 'cliente.id_cliente')
            ->join('persona', 'cliente.id_persona', '=', 'persona.id_persona')
            ->orderBy("ped.id_pedido", "desc")
            ->get();
        return  $productos;
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
        $validateData = $request->validate([
            'total' => 'required',
            'estado_ped' => 'required|string|max:1',
            'id_cliente' => 'required',
            'id_formapago' => 'required',

        ]);
        Pedido::create([
            'fecha_inicio'=>Carbon::now(),
            'fecha_ult_mod'=>Carbon::now(),
            'fecha_registro_ped'=>Carbon::now(),
            'total' => $validateData['total'],
            'estado_ped' => $validateData['estado_ped'],
            'id_cliente' => $validateData['id_cliente'],
            'id_formapago' => $validateData['id_formapago'],
        ]);
        $data = Pedido::latest('id_pedido')->first();
        EstadoPedido::create(  ['estado_inicial' => 'P', 'estado_actual' =>'P', 'estado_final' => 'P','fecha_registro'=> Carbon::now(),'id_pedido'=>$data->id_pedido]);
        Envio::create(['fecha_inicio_ped'=> Carbon::now(), 'fecha_fin_ped'=> Carbon::now(),
        'fecha_registro_env'=> Carbon::now(), 'fecha_fin_ped',
        'ciudad_origen'=>1,
        'ciudad_destino'=>1,
        'id_pedido'=>$data->id_pedido]);
        return $data;
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table('pedido')
        ->where('id_pedido', $id)
        ->update(
            ['estado_ped' => 'A']
        );
    }
    public function Pagar($id)
    {
        DB::table('pedido')
        ->where('id_pedido', $id)
        ->update(
            ['estado_ped' => 'P']
        );
    }
     public function enviar($id)
    {
        DB::table('estado_pedido')
        ->where('id_pedido', $id)
        ->update(
            ['estado_inicial' => 'P', 'estado_actual' =>'E', 'estado_final' => 'P']
        );
        DB::table('pedido')
        ->where('id_pedido', $id)
        ->update(
            ['estado_ped' => 'E']
        );
    }
}
