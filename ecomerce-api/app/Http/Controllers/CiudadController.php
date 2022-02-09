<?php

namespace App\Http\Controllers;

use App\Models\Ciudad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CiudadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ciudades = DB::select('SELECT ciudad.id_ciu,ciudad.nomb_ciu,ciudad.estado_ciu,ciudad.fechaini_ciu,ciudad.fechafin_ciu,ciudad.observ_ciu,provincia.nomb_prov,provincia.id_prov FROM ciudad
                                              INNER JOIN provincia ON ciudad.id_prov=provincia.id_prov');
        return $ciudades;
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
            'nomb_ciu' => 'required',
            'estado_ciu' => 'required',
            'observ_ciu' => 'required',
        ]);
        if ($v) {
            $ciudad = new Ciudad();
            $ciudad->nomb_ciu = $request->input('nomb_ciu');
            $ciudad->estado_ciu = $request->input('estado_ciu');
            $ciudad->observ_ciu = $request->input('observ_ciu');
            $ciudad->id_prov = $request->input('id_prov');
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
        $nomb_ciu = $request->input('nomb_ciu');
        $estado_ciu = $request->input('estado_ciu');
        $observ_ciu = $request->input('observ_ciu');
        DB::table('ciudad')
            ->where('id_ciu', $id)
            ->update([
                'nomb_ciu' => $nomb_ciu,
                'estado_ciu' => $estado_ciu,
                'observ_ciu' => $observ_ciu,
            ]);
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
        $estado_ciudad = 'I';
        DB::table('ciudad')
            ->where('id_ciu', $id)
            ->update(['estado_ciu' => $estado_ciudad]);
        return;
    }
}
