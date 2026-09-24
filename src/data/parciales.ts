import type { Question } from '../types';

export interface Parcial {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  timeMin: number;
  difficulty: 'Fácil'|'Medio'|'Difícil'|'Experto';
  topics: string[];
  questions: Question[];
}

export const parciales: Parcial[] = [
  {
    id:'parcial-1',
    title:'Parcial 1 — Fundamentos SQL',
    subtitle:'SQL Básico + Subconsultas',
    description:'Repaso intensivo de SELECT, WHERE, GROUP BY, HAVING, JOIN y subconsultas escalares e IN/NOT IN. Ideal para arrancar.',
    icon:'📘',
    color:'from-blue-500 to-cyan-500',
    timeMin: 15,
    difficulty:'Fácil',
    topics:['SELECT/WHERE','GROUP BY/HAVING','JOIN','Subconsulta escalar','IN/NOT IN'],
    questions:[
      {id:'p1-1', moduleId:1, type:'multiple', question:'¿Cuál filtra grupos con agregación?', options:['WHERE','HAVING','ORDER BY','LIMIT'], correct:1, explanation:'HAVING filtra después de GROUP BY.'},
      {id:'p1-2', moduleId:1, type:'truefalse', question:'COUNT(*) cuenta solo valores no NULL.', options:['Verdadero','Falso'], correct:1, explanation:'COUNT(*) cuenta filas, COUNT(col) ignora NULL.'},
      {id:'p1-3', moduleId:1, type:'choose_query', question:'Carreras con más de 20 alumnos', code:'', options:["SELECT carrera FROM alumnos WHERE COUNT(*)>20","SELECT carrera, COUNT(*) c FROM alumnos GROUP BY carrera HAVING c>20","SELECT carrera FROM alumnos GROUP BY carrera WHERE COUNT(*)>20","SELECT DISTINCT carrera HAVING COUNT(*)>20"], correct:1, explanation:'Agrupar y HAVING.'},
      {id:'p1-4', moduleId:1, type:'multiple', question:'¿Qué JOIN trae todos los alumnos aunque no tengan inscripción?', options:['INNER JOIN','LEFT JOIN','RIGHT JOIN','CROSS JOIN'], correct:1, explanation:'LEFT JOIN conserva izquierda.'},
      {id:'p1-5', moduleId:1, type:'interpret', question:'¿Qué devuelve? SELECT carrera, AVG(nota) FROM alumnos GROUP BY carrera;', options:['Una fila por alumno','Una fila por carrera con promedio','Error','Promedio global'], correct:1, explanation:'Un grupo por carrera.'},
      {id:'p1-6', moduleId:2, type:'multiple', question:'¿Qué subconsulta usar con = ?', options:['La que devuelve 1 fila 1 columna','La que devuelve N filas','La que devuelve tabla','Cualquiera'], correct:0, explanation:'= requiere escalar.'},
      {id:'p1-7', moduleId:2, type:'truefalse', question:'NOT IN es seguro si la subconsulta puede devolver NULL.', options:['Verdadero','Falso'], correct:1, explanation:'Con NULL, NOT IN devuelve vacío.'},
      {id:'p1-8', moduleId:2, type:'choose_query', question:'Alumnos con nota mayor al promedio', options:["SELECT * FROM alumnos WHERE nota > AVG(nota)","SELECT * FROM alumnos WHERE nota > (SELECT AVG(nota) FROM alumnos)","SELECT * FROM alumnos HAVING nota > AVG(nota)","SELECT * FROM alumnos WHERE nota > SELECT AVG(nota) FROM alumnos"], correct:1, explanation:'AVG en subconsulta escalar.'},
      {id:'p1-9', moduleId:1, type:'multiple', question:'UPDATE sin WHERE', options:['Actualiza una fila','Actualiza todas las filas','Da error','No hace nada'], correct:1, explanation:'Sin WHERE afecta toda la tabla.'},
      {id:'p1-10', moduleId:2, type:'multiple', question:'Subconsulta en FROM necesita', options:['Alias obligatorio','No necesita alias','Solo WHERE','Solo con IN'], correct:0, explanation:'Tabla derivada requiere alias.'},
    ]
  },
  {
    id:'parcial-2',
    title:'Parcial 2 — EXISTS & Correlacionadas',
    subtitle:'EXISTS/NOT EXISTS + Correlacionadas',
    description:'El núcleo del final: EXISTS eficiente, NOT EXISTS seguro, y correlacionadas que se ejecutan por fila.',
    icon:'🔍',
    color:'from-emerald-500 to-teal-500',
    timeMin: 18,
    difficulty:'Medio',
    topics:['EXISTS','NOT EXISTS','Correlacionada','IN vs EXISTS','NULL seguro'],
    questions:[
      {id:'p2-1', moduleId:3, type:'multiple', question:'¿Qué hace EXISTS?', options:['Devuelve filas','Devuelve TRUE si subconsulta tiene filas','Compara valores','Cuenta'], correct:1, explanation:'Verifica existencia.'},
      {id:'p2-2', moduleId:3, type:'choose_query', question:'Alumnos sin inscripciones (seguro con NULLs)', options:["SELECT * FROM alumnos WHERE id NOT IN (SELECT alumno_id FROM inscripciones)","SELECT * FROM alumnos a WHERE NOT EXISTS (SELECT 1 FROM inscripciones i WHERE i.alumno_id=a.id)","SELECT * FROM alumnos WHERE NOT EXISTS (SELECT alumno_id FROM inscripciones)","SELECT * FROM alumnos WHERE EXISTS (SELECT alumno_id FROM inscripciones)"], correct:1, explanation:'NOT EXISTS correlacionado es seguro.'},
      {id:'p2-3', moduleId:3, type:'truefalse', question:'SELECT 1 vs SELECT * en EXISTS afecta resultado.', options:['Verdadero','Falso'], correct:1, explanation:'Optimizador ignora proyección.'},
      {id:'p2-4', moduleId:4, type:'multiple', question:'¿Qué caracteriza correlacionada?', options:['Se ejecuta 1 vez','Referencia tabla externa','Va solo en FROM','No usa alias'], correct:1, explanation:'Referencia externa, N ejecuciones.'},
      {id:'p2-5', moduleId:4, type:'interpret', question:'SELECT * FROM alumnos a WHERE nota > (SELECT AVG(nota) FROM alumnos WHERE carrera=a.carrera)', options:['Sobre promedio global','Sobre promedio de su carrera','Error','Todas'], correct:1, explanation:'Promedio de su carrera.'},
      {id:'p2-6', moduleId:3, type:'multiple', question:'Ventaja de EXISTS con tablas grandes', options:['Siempre más lento','Corta en primer match','Requiere ORDER BY','No usa índices'], correct:1, explanation:'Short-circuit.'},
      {id:'p2-7', moduleId:4, type:'choose_query', question:'Cantidad de inscripciones por alumno (correlacionada en SELECT)', options:["SELECT (SELECT COUNT(*) FROM inscripciones) FROM alumnos","SELECT a.nombre, (SELECT COUNT(*) FROM inscripciones i WHERE i.alumno_id=a.id) AS cant FROM alumnos a","SELECT a.nombre, COUNT(*) FROM alumnos a, inscripciones i","SELECT COUNT(*) FROM alumnos a WHERE a.id=inscripciones.alumno_id"], correct:1, explanation:'Debe correlacionar con a.id.'},
      {id:'p2-8', moduleId:3, type:'multiple', question:'NOT IN con NULL retorna', options:['Todas las filas','0 filas','Error','Filtra NULLs'], correct:1, explanation:'Vacío por UNKNOWN.'},
      {id:'p2-9', moduleId:4, type:'truefalse', question:'Correlacionada siempre es más eficiente que normal.', options:['Verdadero','Falso'], correct:1, explanation:'Suele ser más costosa.'},
      {id:'p2-10', moduleId:3, type:'multiple', question:'¿Cuándo preferir IN sobre EXISTS?', options:['Siempre','Con lista pequeña materializada','Nunca','Con NULLs'], correct:1, explanation:'Lista pequeña constante.'},
    ]
  },
  {
    id:'parcial-3',
    title:'Parcial 3 — Tablas Derivadas & CTEs',
    subtitle:'FROM (SELECT ...) + WITH',
    description:'Dominá tablas derivadas con alias obligatorio y CTEs encadenadas con WITH. Legibilidad vs anidación.',
    icon:'🧩',
    color:'from-violet-500 to-purple-500',
    timeMin: 15,
    difficulty:'Medio',
    topics:['Tabla derivada','Alias obligatorio','CTE','WITH','Múltiples CTEs'],
    questions:[
      {id:'p3-1', moduleId:5, type:'multiple', question:'Tabla derivada va en', options:['WHERE','FROM','SELECT','HAVING'], correct:1, explanation:'FROM (SELECT ...) AS alias'},
      {id:'p3-2', moduleId:5, type:'truefalse', question:'Toda tabla derivada necesita alias.', options:['Verdadero','Falso'], correct:0, explanation:'Obligatorio.'},
      {id:'p3-3', moduleId:5, type:'choose_query', question:'Corregí: SELECT * FROM (SELECT carrera, AVG(nota) p FROM alumnos GROUP BY carrera) WHERE p>8', options:["Falta alias: ... ) AS t WHERE t.p>8","Falta GROUP BY","Falta WHERE","Está bien"], correct:0, explanation:'Debe aliasar.'},
      {id:'p3-4', moduleId:6, type:'multiple', question:'CTE se define con', options:['WITH','FROM','AS','TABLE'], correct:0, explanation:'WITH nombre AS (SELECT...)'},
      {id:'p3-5', moduleId:6, type:'truefalse', question:'CTE crea tabla permanente.', options:['Verdadero','Falso'], correct:1, explanation:'Solo temporal.'},
      {id:'p3-6', moduleId:6, type:'choose_query', question:'Múltiples CTEs', options:["WITH a AS (... ) b AS (... ) SELECT ...","WITH a AS (...), b AS (... ) SELECT ...","WITH a AS (...); WITH b AS (...) SELECT ...","CTE a, b SELECT ..."], correct:1, explanation:'Separadas por coma.'},
      {id:'p3-7', moduleId:6, type:'multiple', question:'Ventaja CTE sobre subconsulta anidada', options:['Siempre más rápida','Más legible y reutilizable','No necesita alias','Crea índices'], correct:1, explanation:'Legibilidad y reuso.'},
      {id:'p3-8', moduleId:5, type:'multiple', question:'¿Se puede JOIN con derivada?', options:['Sí','No','Solo con CTE','Solo INNER'], correct:0, explanation:'Sí, común.'},
      {id:'p3-9', moduleId:5, type:'multiple', question:'¿Cuándo usar derivada?', options:['Para agregar antes de join','Para filtrar sobre agregación','Para simplificar','Todas'], correct:3, explanation:'Todas.'},
      {id:'p3-10', moduleId:6, type:'multiple', question:'¿Cuándo usar CTE?', options:['1 paso simple','Pipeline múltiples pasos','Solo con UPDATE','Nunca'], correct:1, explanation:'Múltiples pasos encadenados.'},
    ]
  },
  {
    id:'parcial-4',
    title:'Parcial 4 — Integrador Final',
    subtitle:'Mixto 360° • Todo el temario',
    description:'Simulacro real integrador: mezcla SQL básico, subconsultas, EXISTS, correlacionadas, derivadas y CTEs como en el final.',
    icon:'🏆',
    color:'from-orange-500 to-amber-500',
    timeMin: 20,
    difficulty:'Difícil',
    topics:['Mixto','EXISTS','Correlacionada','CTE','Derivada','HAVING'],
    questions:[
      {id:'p4-1', moduleId:3, type:'interpret', question:'SELECT * FROM alumnos a WHERE EXISTS (SELECT 1 FROM inscripciones)', options:['Alumnos con inscripción','Todos si hay alguna inscripción','Ninguno','Error'], correct:1, explanation:'Sin correlación es constante.'},
      {id:'p4-2', moduleId:4, type:'multiple', question:'¿Dónde puede ir correlacionada?', options:['Solo WHERE','WHERE, SELECT, EXISTS','Solo FROM','No existe'], correct:1, explanation:'WHERE, SELECT, EXISTS.'},
      {id:'p4-3', moduleId:2, type:'multiple', question:'IN vs =ANY son', options:['Distintos','Equivalentes','Opuestos','Solo IN existe'], correct:1, explanation:'Equivalentes.'},
      {id:'p4-4', moduleId:6, type:'interpret', question:'WITH prom AS (SELECT AVG(nota) p FROM alumnos) SELECT * FROM alumnos, prom WHERE nota>p', options:['Error','Filtra por sobre promedio global','CTE correlacionada','Crea tabla'], correct:1, explanation:'CTE prom con p.'},
      {id:'p4-5', moduleId:1, type:'choose_query', question:'Listar alumnos ordenados por edad descendente', options:["SELECT * FROM alumnos ORDER BY edad","SELECT * FROM alumnos ORDER BY edad DESC","SELECT * FROM alumnos SORT BY edad DESC","SELECT * FROM alumnos WHERE ORDER BY edad DESC"], correct:1, explanation:'DESC.'},
      {id:'p4-6', moduleId:5, type:'choose_query', question:'Alumnos con >3 inscripciones', options:["SELECT * FROM alumnos WHERE COUNT(*)>3","SELECT * FROM (SELECT alumno_id, COUNT(*) c FROM inscripciones GROUP BY alumno_id) AS cnt WHERE c>3","SELECT alumno_id FROM inscripciones HAVING COUNT(*)>3","SELECT * FROM inscripciones WHERE c>3"], correct:1, explanation:'Agregar en derivada luego filtrar.'},
      {id:'p4-7', moduleId:1, type:'multiple', question:'¿Qué hace AVG(nota) si hay NULLs?', options:['Los cuenta como 0','Los ignora','Da error','Devuelve NULL'], correct:1, explanation:'Ignora NULL.'},
      {id:'p4-8', moduleId:4, type:'multiple', question:'¿Cómo detectar correlación?', options:['Subconsulta sin FROM','Ver alias externo dentro','Usa GROUP BY','UsaHAVING'], correct:1, explanation:'Alias externo dentro.'},
      {id:'p4-9', moduleId:6, type:'truefalse', question:'CTE puede referenciar CTE previa.', options:['Verdadero','Falso'], correct:0, explanation:'Sí, en orden.'},
      {id:'p4-10', moduleId:2, type:'multiple', question:'Tabla derivada vs CTE', options:['Derivada es nombrada con WITH','CTE es anónima','CTE más legible para múltiples pasos','No difieren'], correct:2, explanation:'CTE más legible.'},
    ]
  },
  {
    id:'parcial-5',
    title:'Parcial 5 — PostgreSQL Real',
    subtitle:'Cluster, Schemas & search_path',
    description:'Parcial teórico-práctico enfocado en PostgreSQL: jerarquía Cluster→BD→Schema, search_path y casos reales del evaluativo.',
    icon:'🐘',
    color:'from-slate-700 to-slate-900',
    timeMin: 18,
    difficulty:'Experto',
    topics:['Cluster','search_path','pg_catalog','information_schema','PostgreSQL'],
    questions:[
      {id:'p5-1', moduleId:1, type:'multiple', question:'¿Jerarquía correcta en PostgreSQL?', options:['Base de datos → Cluster → Schema → Tabla → Columna','Cluster → Base de datos → Schema → Tabla → Columna','Instancia → Schema → Base de datos → Tabla → Columna','Servidor → Base de datos → Tabla → Schema → Columna','Cluster → Schema → Base de datos → Índice → Columna'], correct:1, explanation:'Cluster → BD → Schema → Tabla → Columna.'},
      {id:'p5-2', moduleId:1, type:'multiple', question:"¿Qué es un 'Cluster'?", options:['Conjunto de servidores en alta disponibilidad','Conjunto de BDs gestionadas por una instancia que comparten PGDATA','Grupo de tablas en un schema','Replicación entre nodos','Índice que ordena físicamente'], correct:1, explanation:'Cluster PGDATA.'},
      {id:'p5-3', moduleId:1, type:'multiple', question:'¿Función de search_path?', options:['Define directorio de datos','Ruta a logs','Determina orden de búsqueda de schemas para objetos no calificados','Directorio de extensiones','PATH del SO'], correct:2, explanation:'Orden de búsqueda.'},
      {id:'p5-4', moduleId:1, type:'multiple', question:'¿Schema por defecto?', options:['pg_catalog','schema','public','default','default_schema'], correct:2, explanation:'public.'},
      {id:'p5-5', moduleId:1, type:'multiple', question:'¿Qué hace SET search_path TO ventas, public;?', options:['Crea schemas','Elimina schemas','Busca primero en ventas luego public para sesión actual','Cambia postgresql.conf permanente','Mueve tablas'], correct:2, explanation:'Para sesión actual.'},
      {id:'p5-6', moduleId:1, type:'multiple', question:'SHOW search_path; ¿qué muestra?', options:['Path de postgresql.conf','Valor actual de search_path','Lista todos los schemas','Ruta PGDATA','Error'], correct:1, explanation:'Valor actual.'},
      {id:'p5-7', moduleId:1, type:'multiple', question:'Si dos schemas tienen tabla mismo nombre sin calificar, ¿qué pasa?', options:['Error ambigüedad','Usa primer schema del search_path que contenga objeto','Combina filas','Siempre public','Pregunta al usuario'], correct:1, explanation:'Primer schema match.'},
      {id:'p5-8', moduleId:1, type:'multiple', question:'¿Qué retorna information_schema.tables?', options:['Todas las vistas','Todas las tablas base de la BD actual','Solo pg_catalog','Solo public','Error'], correct:1, explanation:'Tablas base.'},
      {id:'p5-9', moduleId:1, type:'multiple', question:'¿Qué operador tiene mayor precedencia?', options:['OR','NOT','AND','OR y AND igual','NOT menos que AND'], correct:1, explanation:'NOT > AND > OR.'},
      {id:'p5-10', moduleId:1, type:'multiple', question:'ON DELETE CASCADE al eliminar pasajero', options:['Impide eliminación','Elimina viajes asociados automáticamente','Viajes quedan NULL','Deja huérfanos','Error violación'], correct:1, explanation:'CASCADE borra hijos.'},
    ]
  },
];
