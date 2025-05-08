import { parseCSV } from './utils/parseCsv.js';
import { createClient } from './supabase.js';
import fs from 'fs';
import readline from 'readline';

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
        tipo_pnr: row["TIPO DE PNR"],
        estado: row["ESTADO"],
        id_envio: row["ID DE ENVIO"],
        productos: row["PRODUCTOS"],
        valor_compra: parseFloat(row["VALOR DE LA COMPRA"].replace(/[$,]/g, '')),
        id_conductor: row["ID DEL CONDUCTOR"],
        nombre_driver: row["Nombre Driver"],
        proveedor: row["PROVEEDOR"],
        nombre_cliente: row["Nombre Cliente"],
        direccion_cliente: row["Direccion cliente"],
        quien_recibio: row["Quien recibio"],
        fecha_entrega: row["FECHA DE ENTREGA"],
        estacion_origen: row["ESTACION DE ORIGEN"],
        ruta: row["RUTA"],
        id_reclamo: row["ID DE RECLAMO"],
        comentario_cierre: row["COMENTARIO DE CIERRE"]
      }, { onConflict: 'id_caso' });
  }

  console.log('Datos subidos a Supabase.');
}

main();