export interface IPedido {
  id_pedido: number;
  cantidad: number;
  fecha_inicio: string;
  fecha_ult_mod: string;
  fecha_registro_ped: string;
  estado_ped: string
  id_cliente: number;
  id_formapago: number;
}
