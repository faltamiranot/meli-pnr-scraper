
import { parseCSV } from './parseCsv.js';
import { createClient } from './supabase.js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE = createClient();

async function main() {
  const filePath = './pnr.csv';
  const pnrRows = await parseCSV(filePath);

  for (const row of pnrRows) {
    await SUPABASE
      .from('pnrs')
      .upsert({
        id_caso: row["ID DEL CASO"],
        fecha_caso: row["FECHA DEL CASO"],
        periodo_facturacion: row["PERIODO DE FACTURACION"],
        tipo_pnr: row["TIPO DE PNR"],
        fecha_pedido_revision: row["FECHA PEDIDO DE REVISION"],
        estado: row["ESTADO"],
        pedido_revision: row["PEDIDO DE REVISION"],
        fecha_cierre: row["FECHA DE CIERRE DE CASO"],
        rep_asistente: row["REP  ASISTENTE"],
        comentario_cierre: row["COMENTARIO DE CIERRE"],
        n_prefactura: row["N DE PREFACTURA"],
        id_envio: row["ID DE ENVIO"],
        productos: row["PRODUCTOS"],
        valor_compra: parseFloat(row["VALOR DE LA COMPRA"].replace(/[$,]/g, '')),
        rep_transportadora: row["REP TRANSPORTADORA"],
        id_transportadora: row["ID DE TRANSPORTADORA"],
        transportadora: row["TRANSPORTADORA"],
        estacion_origen: row["ESTACION DE ORIGEN"],
        ruta: row["RUTA"],
        id_conductor: row["ID DEL CONDUCTOR"],
        fecha_entrega: row["FECHA DE ENTREGA"],
        id_reclamo: row["ID DE RECLAMO"],
        fecha_reclamo: row["FECHA DEL RECLAMO"],
        nombre_driver: row["Nombre Driver"],
        proveedor: row["PROVEEDOR"],
        nombre_cliente: row["Nombre Cliente"],
        tel_1: row["Tel 1"],
        direccion_cliente: row["Direccion cliente"],
        quien_recibio: row["Quien recibio"]
      }, { onConflict: 'id_caso' });
  }

  console.log('✅ Datos subidos correctamente a Supabase.');
}

main();
