<?php

namespace App\Http\Controllers;

use App\Models\Pais;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaisController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $paises = Pais::get();
        return $paises;
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

            'nomb_pais' => 'required',
            'estado_pais' => 'required'

        ]);
        if ($v)
        {
            $paises= new Pais();
            $paises->nomb_pais=$request->input('nomb_pais');
            $paises->estado_pais=$request->input('estado_pais');
            $paises->save();
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

            'nomb_pais' => 'required',
            'estado_pais' => 'required'
        ]);
        if ($v)
        {
            $nomb_pais=$request->input('nomb_pais');
            $estado_pais=$request->input('estado_pais');
            DB::table('pais')
            ->where('id_pais', $id)
            ->update(['nomb_pais' => $nomb_pais, 'estado_pais'=> $estado_pais]
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
        $estado_pais= 'I';
        DB::table('pais')
            ->where('id_pais', $id)
            ->update(['estado_pais' => $estado_pais]
          );
        return;
    }
}
