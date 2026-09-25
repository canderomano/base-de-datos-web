import type { Question } from '../types';
export const questions: Question[] = [
  {
    "id": "q1-1",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Cuál filtra grupos con agregación?",
    "options": [
      "ORDER BY",
      "WHERE",
      "HAVING",
      "LIMIT"
    ],
    "correct": 2,
    "explanation": "HAVING filtra después de GROUP BY usando agregaciones. WHERE no puede usar COUNT etc.",
    "whyIncorrect": [
      "WHERE filtra filas antes",
      "ORDER BY ordena",
      "LIMIT limita filas"
    ]
  },
  {
    "id": "q1-2",
    "moduleId": 1,
    "type": "truefalse",
    "question": "COUNT(*) cuenta solo valores no NULL.",
    "options": [
      "Falso",
      "Verdadero"
    ],
    "correct": 0,
    "explanation": "Falso: COUNT(*) cuenta filas, independientemente de NULLs. COUNT(col) sí ignora NULLs."
  },
  {
    "id": "q1-3",
    "moduleId": 1,
    "type": "choose_query",
    "question": "Elegí la consulta que trae carreras con más de 20 alumnos",
    "code": "",
    "options": [
      "SELECT carrera, COUNT(*) c FROM alumnos GROUP BY carrera HAVING c>20",
      "SELECT DISTINCT carrera HAVING COUNT(*)>20",
      "SELECT carrera FROM alumnos WHERE COUNT(*)>20",
      "SELECT carrera FROM alumnos GROUP BY carrera WHERE COUNT(*)>20"
    ],
    "correct": 0,
    "explanation": "Debe agrupar y filtrar con HAVING. Opción 1 usa WHERE con agregación (error)."
  },
  {
    "id": "q1-4",
    "moduleId": 1,
    "type": "interpret",
    "question": "¿Qué devuelve esta consulta?",
    "code": "SELECT carrera, AVG(nota) FROM alumnos GROUP BY carrera;",
    "options": [
      "Una fila por carrera con promedio",
      "Promedio global",
      "Error sintaxis",
      "Una fila por alumno"
    ],
    "correct": 0,
    "explanation": "GROUP BY carrera genera un grupo por carrera y AVG calcula dentro de cada grupo."
  },
  {
    "id": "q1-5",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Qué JOIN trae todos los alumnos aunque no tengan inscripción?",
    "options": [
      "INNER JOIN",
      "LEFT JOIN",
      "CROSS JOIN",
      "RIGHT JOIN"
    ],
    "correct": 1,
    "explanation": "LEFT JOIN conserva toda la tabla izquierda."
  },
  {
    "id": "q1-6",
    "moduleId": 1,
    "type": "multiple",
    "question": "UPDATE sin WHERE",
    "options": [
      "Actualiza una fila",
      "No hace nada",
      "Da error",
      "Actualiza todas las filas"
    ],
    "correct": 3,
    "explanation": "Sin WHERE afecta toda la tabla."
  },
  {
    "id": "q1-7",
    "moduleId": 1,
    "type": "truefalse",
    "question": "DISTINCT elimina duplicados antes de ORDER BY",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "correct": 0,
    "explanation": "Verdadero, primero deduplica luego ordena."
  },
  {
    "id": "q1-8",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Qué hace AVG(nota) si hay NULLs?",
    "options": [
      "Da error",
      "Devuelve NULL",
      "Los ignora",
      "Los cuenta como 0"
    ],
    "correct": 2,
    "explanation": "Las agregaciones ignoran NULL excepto COUNT(*)."
  },
  {
    "id": "q1-9",
    "moduleId": 1,
    "type": "choose_query",
    "question": "Listar alumnos ordenados por edad descendente",
    "options": [
      "SELECT * FROM alumnos ORDER BY edad",
      "SELECT * FROM alumnos WHERE ORDER BY edad DESC",
      "SELECT * FROM alumnos ORDER BY edad DESC",
      "SELECT * FROM alumnos SORT BY edad DESC"
    ],
    "correct": 2,
    "explanation": "DESC para descendente, default es ASC."
  },
  {
    "id": "q1-10",
    "moduleId": 1,
    "type": "multiple",
    "question": "Sintaxis correcta de INSERT",
    "options": [
      "ADD TO alumnos ('Ana')",
      "INSERT INTO alumnos (nombre) VALUES ('Ana')",
      "INSERT (nombre) INTO alumnos 'Ana'",
      "INSERT alumnos VALUES ('Ana')"
    ],
    "correct": 1,
    "explanation": "INSERT INTO tabla (columnas) VALUES (...)"
  },
  {
    "id": "q2-1",
    "moduleId": 2,
    "type": "multiple",
    "question": "¿Qué subconsulta usar con = ?",
    "options": [
      "Cualquiera",
      "La que devuelve tabla",
      "La que devuelve 1 fila 1 columna",
      "La que devuelve N filas"
    ],
    "correct": 2,
    "explanation": "= requiere escalar (1 fila 1 col). Si devuelve más, error."
  },
  {
    "id": "q2-2",
    "moduleId": 2,
    "type": "truefalse",
    "question": "NOT IN es seguro si la subconsulta puede devolver NULL.",
    "options": [
      "Falso",
      "Verdadero"
    ],
    "correct": 0,
    "explanation": "Falso: con NULL, NOT IN devuelve vacío. Usar NOT EXISTS."
  },
  {
    "id": "q2-3",
    "moduleId": 2,
    "type": "choose_query",
    "question": "Alumnos inscriptos en BD2 (id=5)",
    "options": [
      "SELECT * FROM alumnos WHERE EXISTS curso_id=5",
      "SELECT * FROM alumnos WHERE id = (SELECT alumno_id FROM inscripciones WHERE curso_id=5)",
      "SELECT * FROM alumnos WHERE id HAVING curso_id=5",
      "SELECT * FROM alumnos WHERE id IN (SELECT alumno_id FROM inscripciones WHERE curso_id=5)"
    ],
    "correct": 3,
    "explanation": "La subconsulta devuelve varios ids, necesita IN, no =."
  },
  {
    "id": "q2-4",
    "moduleId": 2,
    "type": "interpret",
    "question": "¿Qué hace WHERE x IN (SELECT y FROM t)?",
    "options": [
      "Compara x = un valor",
      "Hace JOIN",
      "Cuenta filas",
      "Verifica si x está en lista y"
    ],
    "correct": 3,
    "explanation": "IN chequea pertenencia a conjunto."
  },
  {
    "id": "q2-5",
    "moduleId": 2,
    "type": "multiple",
    "question": "Subconsulta en SELECT debe ser",
    "options": [
      "Siempre con JOIN",
      "Escalar",
      "Puede devolver muchas filas",
      "Obligatoriamente correlacionada"
    ],
    "correct": 1,
    "explanation": "En SELECT solo puede haber un valor por fila → escalar."
  },
  {
    "id": "q2-6",
    "moduleId": 2,
    "type": "truefalse",
    "question": "Subconsulta en FROM no necesita alias.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "correct": 1,
    "explanation": "Falso: toda tabla derivada requiere alias."
  },
  {
    "id": "q2-7",
    "moduleId": 2,
    "type": "multiple",
    "question": "¿Cuál es tabla derivada?",
    "options": [
      "HAVING COUNT(*)",
      "SELECT (SELECT ...)",
      "WHERE id IN (...)",
      "FROM (SELECT ...) AS t"
    ],
    "correct": 3,
    "explanation": "Tabla derivada es subconsulta en FROM."
  },
  {
    "id": "q2-8",
    "moduleId": 2,
    "type": "multiple",
    "question": "Si subconsulta devuelve 0 filas, IN devuelve",
    "options": [
      "TRUE",
      "FALSE (0 filas)",
      "Error",
      "NULL"
    ],
    "correct": 1,
    "explanation": "Si lista vacía, ninguna fila cumple IN."
  },
  {
    "id": "q2-9",
    "moduleId": 2,
    "type": "choose_query",
    "question": "Alumnos con nota mayor al promedio",
    "options": [
      "SELECT * FROM alumnos WHERE nota > SELECT AVG(nota) FROM alumnos",
      "SELECT * FROM alumnos HAVING nota > AVG(nota)",
      "SELECT * FROM alumnos WHERE nota > AVG(nota)",
      "SELECT * FROM alumnos WHERE nota > (SELECT AVG(nota) FROM alumnos)"
    ],
    "correct": 3,
    "explanation": "AVG debe ir en subconsulta escalar con paréntesis."
  },
  {
    "id": "q2-10",
    "moduleId": 2,
    "type": "multiple",
    "question": "IN vs =ANY son",
    "options": [
      "Opuestos",
      "Solo IN existe",
      "Equivalentes",
      "Distintos"
    ],
    "correct": 2,
    "explanation": "IN es azúcar de =ANY."
  },
  {
    "id": "q3-1",
    "moduleId": 3,
    "type": "multiple",
    "question": "¿Qué hace EXISTS?",
    "options": [
      "Compara valores",
      "Devuelve filas",
      "Cuenta",
      "Devuelve TRUE si subconsulta tiene filas"
    ],
    "correct": 3,
    "explanation": "EXISTS solo verifica existencia."
  },
  {
    "id": "q3-2",
    "moduleId": 3,
    "type": "truefalse",
    "question": "SELECT 1 vs SELECT * en EXISTS afecta resultado.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "correct": 1,
    "explanation": "Falso: optimizador ignora proyección, solo importa si hay filas."
  },
  {
    "id": "q3-3",
    "moduleId": 3,
    "type": "choose_query",
    "question": "Alumnos sin inscripciones (seguro con NULLs)",
    "options": [
      "SELECT * FROM alumnos WHERE EXISTS (SELECT alumno_id FROM inscripciones)",
      "SELECT * FROM alumnos WHERE NOT EXISTS (SELECT alumno_id FROM inscripciones)",
      "SELECT * FROM alumnos WHERE id NOT IN (SELECT alumno_id FROM inscripciones)",
      "SELECT * FROM alumnos a WHERE NOT EXISTS (SELECT 1 FROM inscripciones i WHERE i.alumno_id=a.id)"
    ],
    "correct": 3,
    "explanation": "NOT EXISTS es seguro con NULLs y debe estar correlacionado. Opción 3 sin correlación da siempre FALSE si hay inscripciones."
  },
  {
    "id": "q3-4",
    "moduleId": 3,
    "type": "multiple",
    "question": "Ventaja de EXISTS con tablas grandes",
    "options": [
      "Requiere ORDER BY",
      "Siempre más lento",
      "No usa índices",
      "Corta en primer match"
    ],
    "correct": 3,
    "explanation": "Hace semi-join y corta temprano."
  },
  {
    "id": "q3-5",
    "moduleId": 3,
    "type": "truefalse",
    "question": "EXISTS devuelve filas de la subconsulta.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "correct": 1,
    "explanation": "Devuelve booleano por fila externa."
  },
  {
    "id": "q3-6",
    "moduleId": 3,
    "type": "interpret",
    "question": "SELECT * FROM alumnos a WHERE EXISTS (SELECT 1 FROM inscripciones)",
    "code": "SELECT * FROM alumnos a WHERE EXISTS (SELECT 1 FROM inscripciones)",
    "options": [
      "Error",
      "Ninguno",
      "Todos si hay alguna inscripción",
      "Alumnos con inscripción"
    ],
    "correct": 2,
    "explanation": "Sin correlación, EXISTS es constante; si tabla inscripciones tiene filas, devuelve todos."
  },
  {
    "id": "q3-7",
    "moduleId": 3,
    "type": "multiple",
    "question": "NOT IN con NULL retorna",
    "options": [
      "Todas las filas",
      "Error",
      "0 filas",
      "Filtra NULLs"
    ],
    "correct": 2,
    "explanation": "Lógica tri-estado hace que NOT IN con NULL sea vacío."
  },
  {
    "id": "q3-8",
    "moduleId": 3,
    "type": "multiple",
    "question": "¿Cuándo preferir IN sobre EXISTS?",
    "options": [
      "Con lista pequeña materializada",
      "Con NULLs",
      "Nunca",
      "Siempre"
    ],
    "correct": 0,
    "explanation": "IN bien para listas pequeñas/constantes."
  },
  {
    "id": "q3-9",
    "moduleId": 3,
    "type": "truefalse",
    "question": "NOT EXISTS sufre con NULLs igual que NOT IN.",
    "options": [
      "Falso",
      "Verdadero"
    ],
    "correct": 0,
    "explanation": "Falso, NOT EXISTS es seguro."
  },
  {
    "id": "q3-10",
    "moduleId": 3,
    "type": "choose_query",
    "question": "Traducir IN a EXISTS",
    "options": [
      "WHERE id IN (SELECT x FROM t) → WHERE id EXISTS t",
      "WHERE id IN (SELECT x FROM t) → WHERE EXISTS (SELECT x FROM t)",
      "WHERE id IN (SELECT x FROM t) → WHERE EXISTS (SELECT 1 FROM t WHERE t.x=id)",
      "No se puede"
    ],
    "correct": 2,
    "explanation": "EXISTS correlacionado equivale a IN."
  },
  {
    "id": "q4-1",
    "moduleId": 4,
    "type": "multiple",
    "question": "¿Qué caracteriza correlacionada?",
    "options": [
      "No usa alias",
      "Se ejecuta 1 vez",
      "Va solo en FROM",
      "Referencia tabla externa"
    ],
    "correct": 3,
    "explanation": "Referencia alias externo y se ejecuta por fila."
  },
  {
    "id": "q4-2",
    "moduleId": 4,
    "type": "interpret",
    "question": "SELECT * FROM alumnos a WHERE nota > (SELECT AVG(nota) FROM alumnos WHERE carrera=a.carrera)",
    "options": [
      "Todas",
      "Error",
      "Sobre promedio de su carrera",
      "Sobre promedio global"
    ],
    "correct": 2,
    "explanation": "AVG filtrado por carrera de fila actual."
  },
  {
    "id": "q4-3",
    "moduleId": 4,
    "type": "truefalse",
    "question": "Correlacionada siempre es más eficiente que normal.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "correct": 1,
    "explanation": "Falso, suele ser más costosa (N ejecuciones)."
  },
  {
    "id": "q4-4",
    "moduleId": 4,
    "type": "multiple",
    "question": "¿Dónde puede ir correlacionada?",
    "options": [
      "No existe",
      "Solo FROM",
      "WHERE, SELECT, EXISTS",
      "Solo WHERE"
    ],
    "correct": 2,
    "explanation": "Común en WHERE y SELECT (subquery escalar correlacionada)."
  },
  {
    "id": "q4-5",
    "moduleId": 4,
    "type": "choose_query",
    "question": "Cantidad de inscripciones por alumno (correlacionada en SELECT)",
    "options": [
      "SELECT a.nombre, COUNT(*) FROM alumnos a, inscripciones i",
      "SELECT (SELECT COUNT(*) FROM inscripciones) FROM alumnos",
      "SELECT a.nombre, (SELECT COUNT(*) FROM inscripciones i WHERE i.alumno_id=a.id) AS cant FROM alumnos a",
      "SELECT COUNT(*) FROM alumnos a WHERE a.id=inscripciones.alumno_id"
    ],
    "correct": 2,
    "explanation": "Debe correlacionar con a.id."
  },
  {
    "id": "q4-6",
    "moduleId": 4,
    "type": "truefalse",
    "question": "Sin alias es seguro en correlacionada.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "correct": 1,
    "explanation": "Falso: ambigüedad, columna sin prefijo se liga a interna."
  },
  {
    "id": "q4-7",
    "moduleId": 4,
    "type": "multiple",
    "question": "¿Cómo detectar correlación?",
    "options": [
      "Usa GROUP BY",
      "Ver alias externo dentro",
      "UsaHAVING",
      "Subconsulta sin FROM"
    ],
    "correct": 1,
    "explanation": "Si ves a.carrera dentro de subconsulta que define FROM alumnos a."
  },
  {
    "id": "q4-8",
    "moduleId": 4,
    "type": "interpret",
    "question": "SELECT ... WHERE EXISTS (SELECT 1 FROM inscripciones i WHERE i.alumno_id=a.id)",
    "options": [
      "Correlacionada",
      "CTE",
      "No correlacionada",
      "Tabla derivada"
    ],
    "correct": 0,
    "explanation": "Referencia a.id → correlacionada."
  },
  {
    "id": "q4-9",
    "moduleId": 4,
    "type": "multiple",
    "question": "Error común",
    "options": [
      "No filtrar",
      "Usar = con múltiples filas",
      "Todas",
      "Olvidar alias"
    ],
    "correct": 2,
    "explanation": "Todas son errores frecuentes."
  },
  {
    "id": "q4-10",
    "moduleId": 4,
    "type": "multiple",
    "question": "¿Reescribir correlacionada con JOIN?",
    "options": [
      "Siempre posible y más claro",
      "A veces posible con GROUP BY",
      "Solo con CTE",
      "Nunca"
    ],
    "correct": 1,
    "explanation": "Algunas se reescriben JOIN+GROUP BY, no todas."
  },
  {
    "id": "q5-1",
    "moduleId": 5,
    "type": "multiple",
    "question": "Tabla derivada va en",
    "options": [
      "SELECT",
      "HAVING",
      "WHERE",
      "FROM"
    ],
    "correct": 3,
    "explanation": "FROM (SELECT ...) AS alias"
  },
  {
    "id": "q5-2",
    "moduleId": 5,
    "type": "truefalse",
    "question": "Toda tabla derivada necesita alias.",
    "options": [
      "Falso",
      "Verdadero"
    ],
    "correct": 1,
    "explanation": "Obligatorio, sino error."
  },
  {
    "id": "q5-3",
    "moduleId": 5,
    "type": "choose_query",
    "question": "Corregí: SELECT * FROM (SELECT carrera, AVG(nota) p FROM alumnos GROUP BY carrera) WHERE p>8",
    "options": [
      "Falta WHERE",
      "Falta GROUP BY",
      "Está bien",
      "Falta alias: ... ) AS t WHERE t.p>8"
    ],
    "correct": 3,
    "explanation": "Debe aliasar: AS promedios."
  },
  {
    "id": "q5-4",
    "moduleId": 5,
    "type": "multiple",
    "question": "¿Cuándo usar derivada?",
    "options": [
      "Todas",
      "Para simplificar",
      "Para agregar antes de join",
      "Para filtrar sobre agregación"
    ],
    "correct": 0,
    "explanation": "Todas son casos."
  },
  {
    "id": "q5-5",
    "moduleId": 5,
    "type": "truefalse",
    "question": "Tabla derivada persiste como CREATE TABLE.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "correct": 1,
    "explanation": "Temporal solo esa query."
  },
  {
    "id": "q5-6",
    "moduleId": 5,
    "type": "interpret",
    "question": "SELECT d.carrera FROM (SELECT ... ) AS d",
    "options": [
      "d es CTE",
      "d es alias de tabla derivada",
      "d es columna",
      "Error"
    ],
    "correct": 1,
    "explanation": "Alias de tabla derivada."
  },
  {
    "id": "q5-7",
    "moduleId": 5,
    "type": "multiple",
    "question": "Derivada vs CTE",
    "options": [
      "Derivada es nombrada con WITH",
      "CTE es anónima",
      "CTE más legible para múltiples pasos",
      "No difieren"
    ],
    "correct": 2,
    "explanation": "CTE con WITH es más clara para encadenar."
  },
  {
    "id": "q5-8",
    "moduleId": 5,
    "type": "multiple",
    "question": "¿Se puede JOIN con derivada?",
    "options": [
      "No",
      "Solo con CTE",
      "Sí",
      "Solo INNER"
    ],
    "correct": 2,
    "explanation": "Sí, común: derivada JOIN tabla"
  },
  {
    "id": "q5-9",
    "moduleId": 5,
    "type": "truefalse",
    "question": "SELECT * FROM (SELECT alumno_id FROM inscripciones) trae tabla derivada.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "correct": 0,
    "explanation": "Sí, pero necesita alias en muchos motores."
  },
  {
    "id": "q5-10",
    "moduleId": 5,
    "type": "choose_query",
    "question": "Alumnos con >3 inscripciones",
    "options": [
      "SELECT * FROM inscripciones WHERE c>3",
      "SELECT alumno_id FROM inscripciones HAVING COUNT(*)>3",
      "SELECT * FROM (SELECT alumno_id, COUNT(*) c FROM inscripciones GROUP BY alumno_id) AS cnt WHERE c>3",
      "SELECT * FROM alumnos WHERE COUNT(*)>3"
    ],
    "correct": 2,
    "explanation": "Primero agregar en derivada luego filtrar."
  },
  {
    "id": "q6-1",
    "moduleId": 6,
    "type": "multiple",
    "question": "CTE se define con",
    "options": [
      "WITH",
      "FROM",
      "AS",
      "TABLE"
    ],
    "correct": 0,
    "explanation": "WITH nombre AS (SELECT...)"
  },
  {
    "id": "q6-2",
    "moduleId": 6,
    "type": "truefalse",
    "question": "CTE crea tabla permanente.",
    "options": [
      "Falso",
      "Verdadero"
    ],
    "correct": 0,
    "explanation": "Solo temporal para la query."
  },
  {
    "id": "q6-3",
    "moduleId": 6,
    "type": "choose_query",
    "question": "Múltiples CTEs",
    "options": [
      "WITH a AS (... ) b AS (... ) SELECT ...",
      "CTE a, b SELECT ...",
      "WITH a AS (...); WITH b AS (...) SELECT ...",
      "WITH a AS (...), b AS (... ) SELECT ..."
    ],
    "correct": 3,
    "explanation": "Separadas por coma."
  },
  {
    "id": "q6-4",
    "moduleId": 6,
    "type": "multiple",
    "question": "Ventaja CTE sobre subconsulta anidada",
    "options": [
      "Siempre más rápida",
      "Crea índices",
      "Más legible y reutilizable",
      "No necesita alias"
    ],
    "correct": 2,
    "explanation": "Legibilidad y reuso, performance similar."
  },
  {
    "id": "q6-5",
    "moduleId": 6,
    "type": "interpret",
    "question": "WITH prom AS (SELECT AVG(nota) p FROM alumnos) SELECT * FROM alumnos, prom WHERE nota>p",
    "options": [
      "Crea tabla",
      "Error",
      "CTE correlacionada",
      "Filtra por sobre promedio global"
    ],
    "correct": 3,
    "explanation": "CTE prom tiene un valor p."
  },
  {
    "id": "q6-6",
    "moduleId": 6,
    "type": "truefalse",
    "question": "CTE puede referenciar CTE previa.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "correct": 0,
    "explanation": "Sí, en orden de definición."
  },
  {
    "id": "q6-7",
    "moduleId": 6,
    "type": "multiple",
    "question": "¿Cuándo usar CTE?",
    "options": [
      "Nunca",
      "Pipeline múltiples pasos",
      "Solo con UPDATE",
      "1 paso simple"
    ],
    "correct": 1,
    "explanation": "Múltiples pasos encadenados."
  },
  {
    "id": "q6-8",
    "moduleId": 6,
    "type": "choose_query",
    "question": "Reescribir derivada a CTE",
    "options": [
      "CREATE CTE t AS SELECT ...",
      "FROM (SELECT ...) AS t es igual a WITH, no se puede",
      "WITH t AS (SELECT ...) SELECT * FROM t",
      "SELECT CTE t"
    ],
    "correct": 2,
    "explanation": "WITH t AS (...) SELECT * FROM t"
  },
  {
    "id": "q6-9",
    "moduleId": 6,
    "type": "multiple",
    "question": "Error frecuente CTE",
    "options": [
      "Usar sin SELECT final",
      "Pensar que persiste",
      "Olvidar coma entre CTEs",
      "Todas"
    ],
    "correct": 3,
    "explanation": "Todas."
  },
  {
    "id": "q6-10",
    "moduleId": 6,
    "type": "truefalse",
    "question": "WITH RECURSIVE es para jerarquías.",
    "options": [
      "Verdadero",
      "Falso"
    ],
    "correct": 0,
    "explanation": "Verdadero, aunque no entra en final básico."
  }
];
