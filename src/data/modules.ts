import type { Module } from '../types';

export const modules: Module[] = [
  {
    id: 1, shortTitle: 'SQL Básico', title: 'Módulo 1 — Repaso de SQL básico',
    description: 'Bases de SELECT, filtrado, agrupamiento y joins. La fundación para todo lo demás.',
    icon: '📊', color: 'from-indigo-500 to-violet-500',
    concepts: [
      { id:'c1-1', moduleId:1, title:'SELECT / FROM / WHERE', theory:'SELECT elige columnas, FROM elige tabla y WHERE filtra filas. WHERE se ejecuta antes que ORDER BY y después de FROM.', detail:'Sin WHERE traés toda la tabla. WHERE usa comparadores =, <>, >, <, BETWEEN, LIKE.', sqlExample:`SELECT nombre, edad
FROM alumnos
WHERE edad >= 18
ORDER BY nombre;`, explanation:'1. FROM alumnos → toma la tabla.\n2. WHERE edad>=18 → filtra.\n3. SELECT nombre, edad → proyecta columnas.\n4. ORDER BY nombre → ordena.', errors:['Olvidar FROM','Usar comillas dobles en vez de simples para strings','Filtrar con HAVING en vez de WHERE'], tip:'En el final, si te piden "listar alumnos mayores de edad ordenados alfabéticamente", es exactamente este patrón.' },
      { id:'c1-2', moduleId:1, title:'ORDER BY y DISTINCT', theory:'ORDER BY ordena ascendente (ASC) por defecto o descendente (DESC). DISTINCT elimina duplicados.', sqlExample:`SELECT DISTINCT carrera
FROM alumnos
ORDER BY carrera DESC;`, explanation:'DISTINCT se aplica a toda la fila proyectada. ORDER BY puede usar alias o posición (ORDER BY 1).', errors:['Poner DISTINCT dentro de WHERE','Creer que DISTINCT ordena'], tip:'DISTINCT + ORDER BY: DISTINCT primero, después ordena.' },
      { id:'c1-3', moduleId:1, title:'GROUP BY y HAVING', theory:'GROUP BY agrupa filas para funciones de agregación. HAVING filtra grupos (después de agrupar). WHERE filtra filas (antes).', sqlExample:`SELECT carrera, COUNT(*) AS total
FROM alumnos
GROUP BY carrera
HAVING COUNT(*) > 30;`, explanation:'WHERE no puede usar agregaciones. HAVING sí. Orden: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.', errors:['Usar WHERE COUNT(*)>10','Olvidar poner columnas no agregadas en GROUP BY'], tip:'Pregunta trampa típica: "carreras con más de 30 alumnos" → HAVING, no WHERE.' },
      { id:'c1-4', moduleId:1, title:'Funciones de agregación', theory:'COUNT, SUM, AVG, MIN, MAX resumen datos. Ignoran NULL excepto COUNT(*).', sqlExample:`SELECT 
  COUNT(*) AS cant,
  AVG(nota) AS promedio,
  MAX(nota) AS mejor
FROM examenes
WHERE materia='BD2';`, explanation:'AVG y SUM ignoran NULL. COUNT(*) cuenta filas, COUNT(col) cuenta no-nulos.', errors:['Hacer AVG sobre columna varchar','Esperar que COUNT(col) = COUNT(*)'], tip:'Si hay NULLs, AVG puede dar distinto a SUM/COUNT.' },
      { id:'c1-5', moduleId:1, title:'JOINs', theory:'JOIN combina tablas por una condición. INNER trae coincidencias, LEFT trae todo de izquierda, RIGHT de derecha, FULL todo.', sqlExample:`SELECT a.nombre, c.nombre AS materia
FROM alumnos a
JOIN inscripciones i ON i.alumno_id=a.id
JOIN cursos c ON c.id=i.curso_id
WHERE c.nombre='BD2';`, explanation:'El ON indica cómo se relacionan. Sin ON es producto cartesiano. Alias (a, i, c) acortan escritura.', errors:['Olvidar ON y generar cartesiano','Confundir LEFT JOIN con INNER'], tip:'Dibujá diagramas de Venn para recordar.' },
      { id:'c1-6', moduleId:1, title:'INSERT / UPDATE / DELETE', theory:'INSERT agrega filas, UPDATE modifica, DELETE borra. Siempre usar WHERE en UPDATE/DELETE salvo que quieras afectar toda la tabla.', sqlExample:`UPDATE alumnos SET nota=10 WHERE id=5;
DELETE FROM inscripciones WHERE alumno_id=5 AND curso_id=2;
INSERT INTO alumnos(nombre, carrera) VALUES ('Ana','Sistemas');`, explanation:'Sin WHERE, UPDATE cambia todo. DELETE sin WHERE vacía tabla.', errors:['Olvidar WHERE en UPDATE/DELETE','Insertar sin listar columnas'], tip:'En examen, te pueden pedir explicar diferencia y riesgo.' },
    ]
  },
  {
    id: 2, shortTitle: 'Subconsultas', title: 'Módulo 2 — Subconsultas',
    description: 'Consultas dentro de otras consultas. El corazón de BD2.',
    icon: '🔍', color: 'from-blue-500 to-cyan-500',
    concepts: [
      { id:'c2-1', moduleId:2, title:'Qué es una subconsulta', theory:'Una consulta SELECT dentro de otra. Se usa en WHERE, SELECT o FROM. Devuelve un valor, lista o tabla temporal.', sqlExample:`SELECT nombre FROM alumnos
WHERE carrera = (SELECT carrera FROM alumnos WHERE id=1);`, explanation:'La subconsulta interna se ejecuta primero y su resultado alimenta la externa.', errors:['Pensar que siempre devuelve 1 fila'], tip:'Identificá qué devuelve antes de usarla.' },
      { id:'c2-2', moduleId:2, title:'Subconsulta escalar', theory:'Devuelve exactamente 1 fila y 1 columna. Se puede usar con =, >, <.', sqlExample:`SELECT nombre, (SELECT AVG(nota) FROM examenes) AS promedio_general
FROM alumnos;`, explanation:'Si devuelve más de 1 fila, da error. Debe ser escalar.', errors:['Usar = con subconsulta que devuelve varias filas'], tip:'Si puede devolver 0 filas, el resultado es NULL.' },
      { id:'c2-3', moduleId:2, title:'IN y NOT IN', theory:'IN verifica si un valor está en la lista que devuelve la subconsulta. NOT IN lo inverso, pero cuidado con NULLs.', sqlExample:`SELECT nombre FROM alumnos
WHERE id IN (SELECT alumno_id FROM inscripciones WHERE curso_id=3);`, explanation:'IN (1,2,3) es azúcar para =ANY. Si la subconsulta devuelve NULL, NOT IN puede devolver 0 filas.', errors:['Usar NOT IN cuando subconsulta tiene NULLs → resultado vacío'], tip:'Con NULLs, preferí NOT EXISTS.' },
      { id:'c2-4', moduleId:2, title:'Subconsultas por posición', theory:'Pueden ir en SELECT (escalar), FROM (tabla derivada), WHERE (filtro) o HAVING.', sqlExample:`SELECT * FROM (SELECT carrera, COUNT(*) c FROM alumnos GROUP BY carrera) AS resumen
WHERE c>10;`, explanation:'Según dónde esté, cambia lo que debe devolver.', errors:['Poner subconsulta que devuelve varias columnas donde se espera escalar'], tip:'En FROM siempre requiere alias.' },
      { id:'c2-5', moduleId:2, title:'Ejemplos prácticos', theory:'Caso típico: alumnos que rindieron más que el promedio.', sqlExample:`SELECT nombre FROM alumnos
WHERE nota > (SELECT AVG(nota) FROM alumnos);`, explanation:'Subconsulta escalar calcula promedio, luego filtra.', errors:['Olvidar paréntesis'], tip:'Practicar transformar JOIN a IN y viceversa.' },
    ]
  },
  {
    id: 3, shortTitle: 'EXISTS', title: 'Módulo 3 — EXISTS y NOT EXISTS',
    description: 'Comprueban existencia. Eficientes y seguros con NULLs.',
    icon: '✅', color: 'from-emerald-500 to-teal-500',
    concepts: [
      { id:'c3-1', moduleId:3, title:'EXISTS', theory:'EXISTS devuelve TRUE si la subconsulta devuelve al menos 1 fila. No compara valores, solo existencia. Se correlaciona normalmente.', sqlExample:`SELECT nombre FROM alumnos a
WHERE EXISTS (SELECT 1 FROM inscripciones i WHERE i.alumno_id=a.id);`, explanation:'SELECT 1 es idiomático: no importa qué proyectes, EXISTS solo mira si hay filas. Es correlacionada porque referencia a (a).', errors:['Pensar que EXISTS devuelve valores','Usar SELECT * y creer que es menos eficiente (optimizador lo ignora)'], tip:'EXISTS corta al encontrar la primera fila → muy eficiente.' },
      { id:'c3-2', moduleId:3, title:'NOT EXISTS', theory:'Inverso: TRUE si la subconsulta no devuelve filas. Ideal para "alumnos sin inscripciones".', sqlExample:`SELECT nombre FROM alumnos a
WHERE NOT EXISTS (SELECT 1 FROM inscripciones i WHERE i.alumno_id=a.id);`, explanation:'No sufre problema de NULLs como NOT IN.', errors:['Confundir con NOT IN'], tip:'En examen, si piden "sin relación", NOT EXISTS es segura.' },
      { id:'c3-3', moduleId:3, title:'EXISTS vs IN', theory:'IN compara valores; EXISTS comprueba existencia. Con NULLs, IN puede fallar, EXISTS no. En tablas grandes, EXISTS suele ser más rápido si subconsulta correlacionada.', sqlExample:`-- Equivalente pero distinto plan
SELECT * FROM alumnos WHERE id IN (SELECT alumno_id FROM inscripciones);
SELECT * FROM alumnos a WHERE EXISTS (SELECT 1 FROM inscripciones i WHERE i.alumno_id=a.id);`, explanation:'IN materializa lista; EXISTS hace semi-join.', errors:['Usar NOT IN con NULLs y sorprenderse'], tip:'Regla: NOT IN + NULL = 0 filas → usa NOT EXISTS.' },
      { id:'c3-4', moduleId:3, title:'Errores frecuentes', theory:'Olvidar correlación, usar EXISTS sin WHERE interno, confundir con COUNT>0.', sqlExample:`-- MAL: sin correlación, siempre true si hay alguna inscripción
SELECT * FROM alumnos WHERE EXISTS (SELECT 1 FROM inscripciones);
-- BIEN:
SELECT * FROM alumnos a WHERE EXISTS (SELECT 1 FROM inscripciones i WHERE i.alumno_id=a.id);`, explanation:'Sin correlación, EXISTS es constante.', errors:['Dejar EXISTS sin correlacionar'], tip:'Verificá que la subconsulta referencia tabla externa.' },
    ]
  },
  {
    id: 4, shortTitle: 'Correlacionadas', title: 'Módulo 4 — Subconsultas Correlacionadas',
    description: 'Se ejecutan una vez por fila externa. Potentes y evaluadas en examen.',
    icon: '🔗', color: 'from-orange-500 to-amber-500',
    concepts: [
      { id:'c4-1', moduleId:4, title:'Qué es correlacionada', theory:'La subconsulta referencia columnas de la consulta externa. Se re-ejecuta por cada fila del exterior. No es independiente.', sqlExample:`SELECT nombre, nota FROM alumnos a
WHERE nota > (SELECT AVG(nota) FROM alumnos WHERE carrera=a.carrera);`, explanation:'AVG se calcula por cada carrera distinta, usando a.carrera de la fila actual.', errors:['Creer que se ejecuta una sola vez'], tip:'Si ves alias externo dentro de subconsulta, es correlacionada.' },
      { id:'c4-2', moduleId:4, title:'Diferencia con normal', theory:'Normal: independiente, 1 ejecución. Correlacionada: depende, N ejecuciones.', sqlExample:`-- Normal (promedio global)
SELECT * FROM alumnos WHERE nota > (SELECT AVG(nota) FROM alumnos);
-- Correlacionada (promedio por carrera)
SELECT * FROM alumnos a WHERE nota > (SELECT AVG(nota) FROM alumnos WHERE carrera=a.carrera);`, explanation:'Segunda devuelve alumnos por encima del promedio de SU carrera.', errors:['Usar correlacionada cuando alcanza con normal (ineficiente)'], tip:'Pregunta típica: "por encima del promedio de su curso".' },
      { id:'c4-3', moduleId:4, title:'Paso a paso', theory:'1. Toma fila externa 2. Ejecuta subconsulta con ese valor 3. Evalúa condición 4. Repite.', sqlExample:`SELECT a.nombre,
 (SELECT COUNT(*) FROM inscripciones i WHERE i.alumno_id=a.id) AS cant
FROM alumnos a;`, explanation:'Subconsulta en SELECT correlacionada calcula count por alumno.', errors:['Olvidar alias y generar ambigüedad'], tip:'Alias claros: a para externa, i para interna.' },
      { id:'c4-4', moduleId:4, title:'Errores típicos', theory:'Ambigüedad de columnas, performance, olvidar que puede devolver NULL.', sqlExample:`-- Error: columna sin alias
SELECT * FROM alumnos WHERE EXISTS (SELECT 1 FROM inscripciones WHERE alumno_id=alumno_id);`, explanation:'Sin prefijo, alumno_id se resuelve a la interna, siempre true.', errors:['No calificar columnas con alias'], tip:'Siempre prefijar: a.id vs i.alumno_id.' },
    ]
  },
  {
    id: 5, shortTitle: 'Tablas derivadas', title: 'Módulo 5 — Tablas derivadas',
    description: 'Subconsultas en FROM. Tablas temporales con alias obligatorio.',
    icon: '📑', color: 'from-pink-500 to-rose-500',
    concepts: [
      { id:'c5-1', moduleId:5, title:'Subconsulta en FROM', theory:'Una SELECT entre paréntesis en FROM crea tabla derivada. Obligatorio alias. Útil para agregar y luego filtrar/join.', sqlExample:`SELECT d.carrera, d.prom FROM
 (SELECT carrera, AVG(nota) AS prom FROM alumnos GROUP BY carrera) AS d
WHERE d.prom > 8;`, explanation:'d es tabla temporal con 2 columnas. Después podés hacer JOIN o WHERE sobre ella.', errors:['Olvidar alias → error sintaxis'], tip:'Piensa en FROM ( ... ) AS temp.' },
      { id:'c5-2', moduleId:5, title:'Cuándo usarlas', theory:'Cuando necesitás 1) agregar antes de join, 2) filtrar sobre agregación sin HAVING complejo, 3) re-usar cálculo.', sqlExample:`SELECT * FROM
 (SELECT alumno_id, COUNT(*) c FROM inscripciones GROUP BY alumno_id) AS cnt
JOIN alumnos a ON a.id=cnt.alumno_id
WHERE cnt.c>3;`, explanation:'Primero cuenta inscripciones, luego une solo los que tienen >3.', errors:['Anidar demasiadas sin CTE'], tip:'Si anidás 3 niveles, considera CTE.' },
      { id:'c5-3', moduleId:5, title:'Diferencia con otras', theory:'Tabla derivada vive solo en esa query y debe tener alias. Subconsulta en WHERE filtra; en FROM genera filas.', sqlExample:`-- WHERE subquery: filtra
SELECT * FROM alumnos WHERE id IN (SELECT alumno_id FROM inscripciones);
-- FROM derivada: genera tabla
SELECT * FROM (SELECT alumno_id FROM inscripciones) AS t JOIN alumnos a ON a.id=t.alumno_id;`, explanation:'Mismo resultado, distinto enfoque.', errors:['Confundir IN con tabla derivada'], tip:'Examen: te piden reescribir IN como JOIN con tabla derivada.' },
    ]
  },
  {
    id: 6, shortTitle: 'CTEs', title: 'Módulo 6 — CTEs (WITH)',
    description: 'WITH crea tablas temporales nombradas. Más legible que subconsultas anidadas.',
    icon: '🧩', color: 'from-violet-500 to-indigo-500',
    concepts: [
      { id:'c6-1', moduleId:6, title:'Qué es CTE', theory:'Common Table Expression: consulta temporal nombrada con WITH. Se define arriba y se usa como tabla. Mejora legibilidad y reusabilidad.', sqlExample:`WITH promedio AS (
  SELECT AVG(nota) AS p FROM alumnos
)
SELECT * FROM alumnos, promedio WHERE nota > promedio.p;`, explanation:'promedio es como una vista temporal solo para esta query.', errors:['Creer que CTE crea tabla permanente'], tip:'CTE no persiste, solo esa ejecución.' },
      { id:'c6-2', moduleId:6, title:'Sintaxis WITH', theory:'WITH nombre AS (SELECT ...) SELECT ... Múltiples CTEs separadas por coma.', sqlExample:`WITH top AS (
  SELECT carrera, AVG(nota) prom FROM alumnos GROUP BY carrera
),
filtrado AS (
  SELECT * FROM top WHERE prom>8
)
SELECT * FROM filtrado;`, explanation:'Cada CTE puede referenciar anteriores.', errors:['Olvidar coma entre CTEs','Poner WITH dentro de subconsulta mal'], tip:'Orden importa: CTE2 puede usar CTE1, no al revés.' },
      { id:'c6-3', moduleId:6, title:'CTE vs subconsulta', theory:'CTE: nombrada, reutilizable, más clara. Subconsulta: anidada, menos legible si hay muchas. Performance similar (optimizador las iguala).', sqlExample:`-- Subconsulta anidada (difícil leer)
SELECT * FROM (SELECT carrera, AVG(nota) p FROM alumnos GROUP BY carrera) t WHERE p>8;
-- CTE (claro)
WITH t AS (SELECT carrera, AVG(nota) p FROM alumnos GROUP BY carrera)
SELECT * FROM t WHERE p>8;`, explanation:'Mismo plan, distinta escritura.', errors:['Pensar que CTE es siempre más rápida'], tip:'En final, si piden claridad, usa CTE.' },
      { id:'c6-4', moduleId:6, title:'Múltiples CTEs y agregación', theory:'Cada CTE puede agregar, filtrar, unir. Útil para pipelines.', sqlExample:`WITH inscriptos AS (
  SELECT alumno_id, COUNT(*) c FROM inscripciones GROUP BY alumno_id
),
activos AS (
  SELECT * FROM inscriptos WHERE c>=2
)
SELECT a.nombre, activos.c FROM alumnos a JOIN activos ON activos.alumno_id=a.id;`, explanation:'Paso 1 cuenta, paso 2 filtra, paso 3 une.', errors:['Referenciar CTE que aún no existe'], tip:'Piensa en CTEs como pasos de una receta.' },
    ]
  },
];
