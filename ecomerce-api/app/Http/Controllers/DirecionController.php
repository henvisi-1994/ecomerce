<?php

namespace App\Http\Controllers;

use App\Models\Direcion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DirecionController extends Controller
{
    public function __construct()
    {
        //['index','noticias']
        $this->middleware('auth:sanctum');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $direciones = DB::table('direccion as d')
        ->join('ciudad', 'd.id_ciudad', '=', 'ciudad.id_ciudad')
        ->orderBy("d.id_direccion","desc")
        ->get();
        return $direciones;
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
            'direcion' => 'required',
            'estado_direccion' => 'required',
            'id_ciudad' => 'required',
        ]);
        if ($v) {
            $ciudad = new Direcion();
            $ciudad->direcion = $request->input('direcion');
            $ciudad->calle = $request->input('calle');
            $ciudad->numero = $request->input('numero');
            $ciudad->piso = $request->input('piso');
            $ciudad->telefono = $request->input('telefono');
            $ciudad->movil = $request->input('movil');
            $ciudad->estado_direccion = $request->input('estado_direccion');
            $ciudad->id_ciudad	 = $request->input('id_ciudad');
            $ciudad->save();
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
        DB::table('direccion')
        ->where('id_direccion', $id)
        ->update($request->all());
    return;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $estado_direccion = 'I';
        DB::table('direccion')
            ->where('id_direccion', $id)
            ->update(['estado_direccion' => $estado_direccion]);
        return;
    }
}
