<?php

namespace App\Http\Controllers;

use App\Models\Provincia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProvinciaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $provincias = DB::table('provincia as p')
        ->join('pais', 'p.id_pais', '=', 'pais.id_pais')
        ->orderBy("p.id_prov","desc")
        ->get();
        return $provincias;
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
        $v =$this->validate(request(), [

            'nomb_prov' => 'required',
            'estado_prov' => 'required'

        ]);
        if ($v)
        {
            $provincias= new Provincia();
            $provincias->id_pais=$request->input('id_pais');
            $provincias->nomb_prov=$request->input('nomb_prov');
            $provincias->estado_prov=$request->input('estado_prov');
            $provincias->save();
            return;
        }
        else
        {
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
        $v =$this->validate(request(), [

            'nomb_prov' => 'required',
            'estado_prov' => 'required'
        ]);
        if ($v)
        {
            $id_pais=$request->input('id_pais');
            $nomb_prov=$request->input('nomb_prov');
            $estado_prov=$request->input('estado_prov');
            DB::table('provincia')
            ->where('id_prov', $id)
            ->update(['nomb_prov' => $nomb_prov, 'estado_prov' => $estado_prov,'id_pais'=> $id_pais]
          );
        return;
      }
      else
        {
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
        $estado_prov= 'I';
        DB::table('provincia')
            ->where('id_prov', $id)
            ->update(['estado_prov' => $estado_prov]
          );
        return;
    }
}
