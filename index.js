import 'dotenv/config';
import { parseCSV } from './utils/parseCsv.js';
import { supabase } from './supabase.js';

const filePath = './pnr.csv';

(async () => {
  try {
    const rawData = await parseCSV(filePath);

    const mappedData = rawData.map(row => ({
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
      valor_compra: row["VALOR DE LA COMPRA"],
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
    }));

    console.log("Ejemplo de fila que se subirá:", mappedData[0]);

    const { error } = await supabase.from('pnrs').insert(mappedData);

    if (error) {
      console.error("❌ Error al insertar en Supabase:", error.message);
    } else {
      console.log("✅ Datos subidos correctamente a Supabase.");
    }

  } catch (err) {
    console.error("❌ Error general:", err.message);
  }
})();
