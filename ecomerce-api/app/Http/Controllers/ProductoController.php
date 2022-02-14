<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $productos = DB::table('producto as prod')
            ->join('empresa', 'prod.id_empresa', '=', 'empresa.id_empresa')
            ->join('marca', 'prod.id_marca', '=', 'marca.id_marca')
            ->join('categoria', 'prod.id_cat', '=', 'categoria.id_cat')
            ->join('bodega', 'prod.id_bod', '=', 'bodega.id_bod')
            ->orderBy("prod.id_prod", "desc")
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
        $v = $this->validate(request(), [
            'codigo_prod' => 'required|string',
            'precio_prod' => 'required|numeric',
            'codbarra_prod' => 'required|numeric',
            'id_marca' => 'required',
            'id_cat' => 'required',
            'id_bod' => 'required',
            'stockmin_prod' => 'required|numeric',
            'stockmax_prod' => 'required|numeric',
            'precio_prod' => 'required|numeric|between:0,9999.99',
            'util_prod' => 'required|numeric|between:0,9999.99',
            'comision_prod' => 'required|numeric|between:0,9999.99',
        ]);
        if ($v) {
            $image_name = '';
            if ($request->hasFile('file')) {
                return $request->file;
               /* $image_name =$request->codbarra_prod . $request->file->extension();
                $request->file->move('profile_images/', $image_name); // /public/profile_images/file.png*/
            }
            $name =$image_name;
            $source = fopen($request->file, 'r');
            $destination = fopen(public_path() . '/img/producto/' . $name, 'w');
            stream_copy_to_stream($source, $destination);
            fclose($source);
            fclose($destination);
            $producto = new Producto();
            $producto->id_emp  =  $request->input('id_emp');
            $producto->id_fec =  $request->input('id_fec');
            $producto->id_bod =  $request->input('id_bod');
            $producto->codigo_prod =  $request->input('codigo_prod');
            $producto->codbarra_prod =  $request->input('codbarra_prod');
            $producto->descripcion_prod = $request->input('descripcion_prod');
            $producto->id_marca =  $request->input('id_marca');
            $producto->id_cat =  $request->input('id_cat');
            $producto->present_prod =  $request->input('present_prod');
            $producto->precio_prod =  $request->input('precio_prod');
            $producto->ubicacion_prod =  $request->input('ubicacion_prod');
            $producto->stockmin_prod =  $request->input('stockmin_prod');
            $producto->stockmax_prod =  $request->input('stockmax_prod');
            $producto->fechaing_prod =  $request->input('fechaing_prod');
            $producto->fechaelab_prod =  $request->input('fechaelab_prod');
            $producto->fechacad_prod =  $request->input('fechacad_prod');
            $producto->aplicaiva_prod =  $request->input('aplicaiva_prod');
            $producto->aplicaice_prod =  $request->input('aplicaice_prod');
            $producto->util_prod =  $request->input('util_prod');
            $producto->comision_prod =  $request->input('comision_prod');
            $producto->imagen_prod =  $name;
            $producto->estado_prod =  $request->input('estado_prod');
            $producto->observ_prod =  $request->input('observ_prod');
            $producto->fechaini_prod =  $request->input('fechaini_prod');
            $producto->fechafin_prod =  $request->input('fechafin_prod');
            $producto->save();
            return $name;
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
        $productos = DB::table('producto as prod')
            ->join('empresa', 'prod.id_empresa', '=', 'empresa.id_empresa')
            ->join('marca', 'prod.id_marca', '=', 'marca.id_marca')
            ->join('categoria', 'prod.id_cat', '=', 'categoria.id_cat')
            ->join('bodega', 'prod.id_bod', '=', 'bodega.id_bod')
            ->where('prod.id_prod',$id)
            ->orderBy("prod.id_prod", "desc")
            ->first();
        return  $productos;
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
            'codigo_prod' => 'required|string',
            'precio_prod' => 'required|numeric',
            'codbarra_prod' => 'required|numeric',
            'id_marca' => 'required',
            'id_cat' => 'required',
            'id_bod' => 'required',
            'stockmin_prod' => 'required|numeric',
            'stockmax_prod' => 'required|numeric',
            'precio_prod' => 'required|numeric|between:0,9999.99',
            'util_prod' => 'required|numeric|between:0,9999.99',
            'comision_prod' => 'required|numeric|between:0,9999.99',
        ]);
        if ($v) {

            list($type, $imageData) = explode(';', $request->imagen_prod);
            list(, $extension) = explode('/', $type);
            list(, $imageData) = explode(',', $imageData);
            $name = $request->codbarra_prod . '.' . $extension;
            $source = fopen($request->imagen_prod, 'r');
            $destination = fopen(public_path() . '/img/producto/' . $name, 'w');
            stream_copy_to_stream($source, $destination);
            fclose($source);
            fclose($destination);
                $imagen_prod = $name;

            $id_emp  =  $request->input('id_emp');
            $id_fec =  $request->input('id_fec');
            $id_bod =  $request->input('id_bod');
            $codigo_prod =  $request->input('codigo_prod');
            $codbarra_prod =  $request->input('codbarra_prod');
            $descripcion_prod = $request->input('descripcion_prod');
            $id_marca =  $request->input('id_marca');
            $id_cat =  $request->input('id_cat');
            $present_prod =  $request->input('present_prod');
            $precio_prod =  $request->input('precio_prod');
            $ubicacion_prod =  $request->input('ubicacion_prod');
            $stockmin_prod =  $request->input('stockmin_prod');
            $stockmax_prod =  $request->input('stockmax_prod');
            $fechaing_prod =  $request->input('fechaing_prod');
            $fechaelab_prod =  $request->input('fechaelab_prod');
            $fechacad_prod =  $request->input('fechacad_prod');
            $aplicaiva_prod =  $request->input('aplicaiva_prod');
            $aplicaice_prod =  $request->input('aplicaice_prod');
            $util_prod =  $request->input('util_prod');
            $comision_prod =  $request->input('comision_prod');
            $imagen_prod =  $name;
            $estado_prod =  $request->input('estado_prod');
            $observ_prod =  $request->input('observ_prod');
            $fechaini_prod =  $request->input('fechaini_prod');
            $fechafin_prod =  $request->input('fechafin_prod');
            DB::table('producto')
                ->where('id_prod', $id)
                ->update(
                    [
                        'id_emp' => $id_emp, 'id_fec' => $id_fec, 'id_bod' => $id_bod, 'codigo_prod' => $codigo_prod, 'codbarra_prod' => $codbarra_prod,
                        'descripcion_prod' => $descripcion_prod, 'id_marca' => $id_marca, 'id_cat' => $id_cat, 'present_prod' => $present_prod,  'precio_prod' => $precio_prod,
                        'ubicacion_prod' => $ubicacion_prod,  'stockmin_prod' => $stockmin_prod,  'stockmax_prod' => $stockmax_prod, 'fechaing_prod'  => $fechaing_prod,  'fechaelab_prod' => $fechaelab_prod, 'fechacad_prod' => $fechacad_prod, 'aplicaiva_prod' => $aplicaiva_prod, 'aplicaice_prod' => $aplicaice_prod, 'util_prod' => $util_prod,  'comision_prod' => $comision_prod, 'imagen_prod' => $imagen_prod,
                        'observ_prod' => $observ_prod, 'estado_prod' => $estado_prod, 'fechaini_prod' => $fechaini_prod, 'fechafin_prod' => $fechafin_prod
                    ]
                );
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
        $estado_prod = 'I';
        DB::table('producto')
            ->where('id_prod', $id)
            ->update(
                ['estado_prod' => $estado_prod]
            );
        return;
    }
}
