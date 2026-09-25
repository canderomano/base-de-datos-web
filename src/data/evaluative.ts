import type { Question } from '../types';

export const evaluativeQuestions: Question[] = [
  {
    "id": "ev-1",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Cuál es la jerarquía correcta de objetos en PostgreSQL, de mayor a menor nivel?",
    "options": [
      "Cluster → Base de datos → Schema → Tabla → Columna",
      "Cluster → Schema → Base de datos → Índice → Columna",
      "Servidor → Base de datos → Tabla → Schema → Columna",
      "Instancia → Schema → Base de datos → Tabla → Columna",
      "Base de datos → Cluster → Schema → Tabla → Columna"
    ],
    "correct": 0,
    "explanation": "La jerarquía correcta es Cluster → Base de datos → Schema → Tabla → Columna. Un cluster es la instalación que contiene múltiples BDs."
  },
  {
    "id": "ev-2",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Qué es un 'Cluster' en el contexto de PostgreSQL?",
    "options": [
      "Un grupo de tablas relacionadas dentro de un mismo schema",
      "Una configuración de replicación entre dos o más nodos PostgreSQL",
      "El conjunto de bases de datos gestionadas por una única instancia del servidor PostgreSQL que comparten la misma área de almacenamiento de datos",
      "Un conjunto de servidores PostgreSQL conectados en alta disponibilidad",
      "Un tipo especial de índice que ordena físicamente los datos de una tabla"
    ],
    "correct": 2,
    "explanation": "Cluster es el conjunto de BDs gestionadas por una instancia que comparten PGDATA."
  },
  {
    "id": "ev-3",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Cuál es la función principal del parámetro de configuración search_path en PostgreSQL?",
    "options": [
      "Especifica la ruta a los archivos de log del servidor",
      "Define el directorio del sistema de archivos donde PostgreSQL almacena los datos",
      "Determina el orden en que PostgreSQL busca en los schemas cuando se hace referencia a un objeto sin calificarlo con su schema",
      "Configura la variable de entorno PATH del sistema operativo para el usuario postgres",
      "Indica el directorio donde se encuentran las extensiones instaladas"
    ],
    "correct": 2,
    "explanation": "search_path determina el orden de búsqueda de schemas para objetos no calificados."
  },
  {
    "id": "ev-4",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Qué schema utiliza PostgreSQL de forma predeterminada al momento de realizar una consulta en una hoja de herramientas de consultas?",
    "options": [
      "pg_catalog",
      "schema",
      "default",
      "public",
      "default_schema"
    ],
    "correct": 3,
    "explanation": "Por defecto PostgreSQL usa el schema public."
  },
  {
    "id": "ev-5",
    "moduleId": 3,
    "type": "multiple",
    "question": "¿Por qué el optimizador de consultas prefiere EXISTS sobre IN cuando trabajamos con grandes volúmenes de datos?",
    "options": [
      "Porque carga toda la tabla en memoria RAM",
      "Porque no requiere una subconsulta",
      "Porque solo funciona con claves primarias",
      "Porque utiliza índices de texto",
      "Porque se detiene tan pronto encuentra la primera coincidencia (short-circuit)"
    ],
    "correct": 4,
    "explanation": "EXISTS hace short-circuit: corta al primer match, mucho más eficiente."
  },
  {
    "id": "ev-6",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿En qué paso del ciclo de vida de una consulta SQL entra en juego el HAVING?",
    "options": [
      "Agrupa después de ordenar los resultados",
      "Primero HAVING y luego agrupa",
      "Solo se puede usar HAVING si hay un ORDER BY",
      "Primero agrupa y luego aplica el filtro HAVING",
      "HAVING y WHERE se ejecutan simultáneamente"
    ],
    "correct": 3,
    "explanation": "HAVING filtra grupos después de GROUP BY."
  },
  {
    "id": "ev-7",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Qué sucede si dos schemas diferentes del search_path contienen una tabla con el mismo nombre y se ejecuta una consulta SELECT sin calificar el nombre?",
    "options": [
      "PostgreSQL combina automáticamente las filas de ambas tablas",
      "PostgreSQL usa siempre la tabla del schema public por defecto",
      "PostgreSQL usa la tabla del primer schema que aparece en el search_path que contenga ese objeto",
      "PostgreSQL lanza un error de ambigüedad",
      "PostgreSQL pregunta al usuario cuál tabla desea consultar"
    ],
    "correct": 2,
    "explanation": "Usa el primer schema del search_path que contenga el objeto."
  },
  {
    "id": "ev-8",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Cuál es la cláusula SQL que permite filtrar grupos de filas DESPUÉS de aplicar una función de agregación?",
    "options": [
      "ON",
      "GROUP FILTER",
      "FILTER",
      "HAVING",
      "WHERE"
    ],
    "correct": 3,
    "explanation": "HAVING filtra después de agregación."
  },
  {
    "id": "ev-9",
    "moduleId": 1,
    "type": "multiple",
    "question": "En una sentencia SELECT, ¿en qué orden lógico se procesan las cláusulas?",
    "options": [
      "SELECT → WHERE → FROM → HAVING → GROUP BY → ORDER BY",
      "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY",
      "WHERE → FROM → GROUP BY → SELECT → HAVING → ORDER BY",
      "SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY",
      "FROM → SELECT → WHERE → GROUP BY → HAVING → ORDER BY"
    ],
    "correct": 1,
    "explanation": "Orden lógico: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY."
  },
  {
    "id": "ev-10",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Qué operador se utiliza para comparar un valor contra un rango de valores inclusivo en SQL?",
    "options": [
      "IN (valor1, valor2)",
      "FROM valor1 TO valor2",
      "valor >= valor1 OR valor <= valor2",
      "RANGE(valor1, valor2)",
      "BETWEEN valor1 AND valor2"
    ],
    "correct": 4,
    "explanation": "BETWEEN es inclusivo."
  },
  {
    "id": "ev-11",
    "moduleId": 4,
    "type": "multiple",
    "question": "¿Qué encontraría este query? SELECT * FROM Pasajeros p WHERE 2 < (SELECT COUNT(*) FROM Viajes v WHERE v.pasajero_id = p.id)",
    "options": [
      "Pasajeros que han realizado más de 2 viajes",
      "Pasajeros cuyo id es mayor a 2",
      "Error de sintaxis",
      "Los dos primeros pasajeros de la tabla",
      "Pasajeros con exactamente 2 viajes"
    ],
    "correct": 0,
    "explanation": "Subconsulta correlacionada cuenta viajes por pasajero; condición >2."
  },
  {
    "id": "ev-12",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Cuál es la diferencia entre ORDER BY columna ASC y ORDER BY columna DESC?",
    "options": [
      "ASC ordena de menor a mayor (ascendente) y DESC de mayor a menor (descendente)",
      "ASC ordena de mayor a menor y DESC de menor a mayor",
      "ASC ordena alfabéticamente y DESC ordena numéricamente",
      "ASC ordena de menor a mayor y DESC de mayor a menor",
      "ASC agrupa de menor a mayor y DESC agrupa de mayor a menor"
    ],
    "correct": 0,
    "explanation": "ASC ascendente menor→mayor, DESC descendente mayor→menor."
  },
  {
    "id": "ev-13",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Qué operador lógico tiene mayor precedencia (se evalúa primero) en SQL?",
    "options": [
      "NOT",
      "OR y AND tienen la misma precedencia",
      "AND",
      "NOT tiene menos precedencia que AND",
      "OR"
    ],
    "correct": 0,
    "explanation": "Precedencia: NOT > AND > OR."
  },
  {
    "id": "ev-14",
    "moduleId": 1,
    "type": "multiple",
    "question": "El operador LIKE en PostgreSQL, ¿qué carácter representa exactamente UN carácter cualquiera?",
    "options": [
      "*",
      "%",
      "_",
      "?",
      "#"
    ],
    "correct": 2,
    "explanation": "_ representa un carácter, % cero o más."
  },
  {
    "id": "ev-15",
    "moduleId": 4,
    "type": "multiple",
    "question": "¿Qué es una subconsulta correlacionada?",
    "options": [
      "Una subconsulta que correlaciona lo correlacionable entre valores correlacionables",
      "Una subconsulta que hace referencia a columnas de la consulta externa y, por tanto, se ejecuta una vez por cada fila de la consulta externa",
      "Una subconsulta que devuelve exactamente una fila y una columna",
      "Una subconsulta que aparece en la cláusula FROM y actúa como tabla derivada",
      "Una subconsulta que se define una sola vez y puede reutilizarse en toda la consulta"
    ],
    "correct": 1,
    "explanation": "Correlacionada referencia externa y se evalúa por fila."
  },
  {
    "id": "ev-16",
    "moduleId": 3,
    "type": "multiple",
    "question": "¿Cuál es la principal diferencia entre los predicados IN y EXISTS al usarlos con subconsultas?",
    "options": [
      "IN sólo funciona con valores numéricos, EXISTS funciona con cualquier tipo de dato",
      "IN puede usarse con subconsultas correlacionadas; EXISTS no",
      "No hay diferencia funcional; ambos son completamente equivalentes en todos los casos",
      "IN compara el valor con cada elemento devuelto por la subconsulta; EXISTS sólo verifica si la subconsulta devuelve al menos una fila, sin importar el valor",
      "EXISTS es más lento que IN en todos los casos"
    ],
    "correct": 3,
    "explanation": "IN compara valores, EXISTS verifica existencia."
  },
  {
    "id": "ev-17",
    "moduleId": 2,
    "type": "multiple",
    "question": "Una subconsulta escalar es aquella que:",
    "options": [
      "Se puede usar únicamente con operadores de comparación como > o <",
      "Devuelve exactamente una fila y una columna (un único valor)",
      "Aparece únicamente en la cláusula WHERE",
      "Devuelve una sola fila con múltiples columnas",
      "Devuelve múltiples filas y múltiples columnas"
    ],
    "correct": 1,
    "explanation": "Escalar: 1 fila 1 columna."
  },
  {
    "id": "ev-18",
    "moduleId": 2,
    "type": "multiple",
    "question": "¿Qué ocurre si una subconsulta escalar devuelve más de una fila en PostgreSQL?",
    "options": [
      "PostgreSQL promedia los valores devueltos",
      "El resultado de la consulta completa es NULL",
      "Se produce un error en tiempo de ejecución: \"more than one row returned by a subquery used as an expression\"",
      "PostgreSQL usa automáticamente la primera fila devuelta",
      "PostgreSQL usa automáticamente la última fila devuelta"
    ],
    "correct": 2,
    "explanation": "Error: more than one row returned."
  },
  {
    "id": "ev-19",
    "moduleId": 5,
    "type": "multiple",
    "question": "¿Qué es una tabla derivada (derived table) en SQL?",
    "options": [
      "Una vista materializada que se actualiza automáticamente",
      "Una tabla heredada de otra tabla usando la cláusula INHERITS",
      "Una subconsulta ubicada en la cláusula FROM que produce un conjunto de resultados al que se le puede asignar un alias y tratar como si fuera una tabla",
      "Una tabla creada automáticamente por PostgreSQL para almacenar resultados intermedios en disco",
      "Una tabla temporal creada con la sentencia CREATE TEMP TABLE"
    ],
    "correct": 2,
    "explanation": "Tabla derivada es subconsulta en FROM con alias."
  },
  {
    "id": "ev-20",
    "moduleId": 3,
    "type": "multiple",
    "question": "¿Para qué se utiliza NOT EXISTS en una consulta SQL?",
    "options": [
      "Para seleccionar filas de la consulta externa donde la subconsulta NO devuelve ninguna fila (conjunto vacío)",
      "Para comprobar que una tabla no existe en la base de datos",
      "Para verificar que una columna no contenga valores NULL"
    ],
    "correct": 1,
    "explanation": "Según material evaluativo, respuesta marcada C (aunque técnicamente B es anti-join, se respeta consigna)."
  },
  {
    "id": "ev-21",
    "moduleId": 6,
    "type": "multiple",
    "question": "¿Cuál es la sintaxis correcta para definir una CTE (Common Table Expression) en PostgreSQL?",
    "options": [
      "CREATE TEMP VIEW nombre AS (SELECT ...)",
      "SUBQUERY nombre AS (SELECT ...)",
      "WITH nombre AS [SELECT ...]",
      "WITH nombre AS (SELECT ...)",
      "LET nombre = (SELECT ...)"
    ],
    "correct": 3,
    "explanation": "WITH nombre AS (SELECT ...)"
  },
  {
    "id": "ev-22",
    "moduleId": 6,
    "type": "multiple",
    "question": "¿Cuántas CTEs se pueden definir en un único bloque WITH?",
    "options": [
      "Sólo una CTE por bloque WITH",
      "Múltiples CTEs, separadas por comas",
      "Máximo 10 CTEs",
      "Depende de la versión de PostgreSQL, versiones antiguas sólo permiten una",
      "Máximo 2 CTEs"
    ],
    "correct": 1,
    "explanation": "Múltiples CTEs separadas por comas."
  },
  {
    "id": "ev-23",
    "moduleId": 6,
    "type": "multiple",
    "question": "¿Cuál de los siguientes es un caso de uso donde una CTE es generalmente PREFERIBLE a una subconsulta inline?",
    "options": [
      "Cuando se trabaja con consultas que modifican datos (INSERT/UPDATE/DELETE), ya que las subconsultas no pueden hacerlo",
      "Cuando el resultado intermedio se utiliza una sola vez en una consulta simple",
      "Cuando se necesita el máximo rendimiento posible, ya que las CTEs siempre se materializan y son más rápidas",
      "Cuando se quiere evitar que el optimizador de consultas analice la lógica interna",
      "Cuando se necesita reutilizar el mismo resultado intermedio en múltiples partes de la consulta, mejorando la legibilidad y evitando repetir código SQL"
    ],
    "correct": 4,
    "explanation": "CTE preferible para reusar y legibilidad."
  },
  {
    "id": "ev-24",
    "moduleId": 6,
    "type": "multiple",
    "question": "En una CTE encadenada, ¿puede una CTE hacer referencia a otra CTE definida anteriormente en el mismo bloque WITH?",
    "options": [
      "Sí, una CTE puede referenciar a cualquier CTE definida anteriormente en el mismo bloque WITH",
      "No, cada CTE es completamente independiente y no puede ver las demás",
      "Sí, pero sólo si la referencia es entre CTEs adyacentes (definidas una justo después de la otra)",
      "Sólo si ambas CTEs están en schemas distintos",
      "Sólo en versiones de PostgreSQL 14 o superiores"
    ],
    "correct": 0,
    "explanation": "Sí, puede referenciar anteriores en orden."
  },
  {
    "id": "ev-25",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Qué operador se usa para verificar si un valor coincide con AL MENOS UNO de los valores de una lista?",
    "options": [
      "ALL",
      "EXISTS",
      "ANY",
      "NOT IN",
      "BETWEEN"
    ],
    "correct": 1,
    "explanation": "Según evaluativo, marca EXISTS (ANY/IN también válidos, se respeta consigna)."
  },
  {
    "id": "ev-26",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Cuál es el resultado de ejecutar la siguiente consulta: SHOW search_path;?",
    "options": [
      "Produce un error porque SHOW sólo funciona con parámetros de memoria",
      "Muestra el valor actual de la variable search_path, es decir, los schemas en el orden en que PostgreSQL buscará objetos no calificados",
      "Lista todos los schemas existentes en la base de datos actual",
      "Muestra el path del archivo de configuración postgresql.conf",
      "Muestra la ruta del directorio PGDATA donde se almacenan los datos"
    ],
    "correct": 1,
    "explanation": "SHOW search_path muestra schemas en orden."
  },
  {
    "id": "ev-27",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Qué hace la siguiente sentencia? SET search_path TO ventas, public;",
    "options": [
      "Mueve todas las tablas del schema public al schema ventas",
      "Crea los schemas ventas y public si no existen",
      "Establece que PostgreSQL busque primero en el schema ventas y luego en public al resolver nombres de objetos no calificados, para la sesión actual",
      "Elimina todos los schemas excepto ventas y public",
      "Cambia permanentemente el search_path en el archivo postgresql.conf"
    ],
    "correct": 2,
    "explanation": "SET search_path para sesión actual."
  },
  {
    "id": "ev-28",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Qué información retorna la siguiente consulta sobre information_schema.tables?",
    "options": [
      "Lista todas las vistas de la base de datos actual",
      "Produce un error porque information_schema no contiene la columna table_type",
      "Lista las tablas del schema pg_catalog únicamente",
      "Lista todas las tablas base (no vistas, no de sistema) de la base de datos actual, mostrando su schema y nombre",
      "Lista sólo las tablas del schema public"
    ],
    "correct": 3,
    "explanation": "Information_schema.tables lista tablas base."
  },
  {
    "id": "ev-29",
    "moduleId": 1,
    "type": "multiple",
    "question": "Dada la tabla empleados con columnas (id, nombre, departamento, salario), ¿qué devuelve esta consulta con HAVING avg(salario) > 50000?",
    "options": [
      "El promedio general de todos los salarios mayores a 50,000",
      "Todos los empleados cuyo salario supera 50.000, ordenados de mayor a menor salario",
      "Los departamentos con más de 50.000 empleados",
      "Un error porque HAVING no puede usar funciones de agregación",
      "El salario promedio de cada departamento, pero sólo de aquellos departamentos cuyo salario promedio supera 50.000, ordenados de mayor a menor promedio"
    ],
    "correct": 4,
    "explanation": "HAVING filtra departamentos con promedio >50000."
  },
  {
    "id": "ev-30",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Qué filas devuelve la siguiente condición WHERE con IN, BETWEEN y stock > 0?",
    "options": [
      "Productos de la categoría Electrónica con precio mayor a 100 o productos de Computación con precio menor a 500",
      "Productos cuyo precio sea exactamente 100 o exactamente 500",
      "Un error porque BETWEEN no puede usarse junto con IN en la misma cláusula WHERE",
      "Productos de cualquier categoría con precio entre 100 y 500",
      "Productos de la categoría Electrónica o Computación, con precio entre 100 y 500 (inclusive) y con stock mayor a cero"
    ],
    "correct": 4,
    "explanation": "Combina IN + BETWEEN + stock>0."
  },
  {
    "id": "ev-31",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Cuál es el resultado de la consulta usando WHERE email IS NULL OR telefono IS NULL?",
    "options": [
      "Clientes cuyo email y teléfono son NULL al mismo tiempo",
      "Clientes que tienen tanto email como teléfono registrados",
      "Un error porque IS NULL no puede combinarse con OR",
      "Clientes que no tienen email registrado o no tienen teléfono registrado (o ambos), ordenados alfabéticamente",
      "Todos los clientes, mostrando NULL donde falten datos"
    ],
    "correct": 3,
    "explanation": "OR con IS NULL trae cualquiera nulo."
  },
  {
    "id": "ev-32",
    "moduleId": 1,
    "type": "multiple",
    "question": "Analiza la siguiente consulta con LIKE 'A%o':",
    "options": [
      "Productos cuyo nombre tiene exactamente tres caracteres: A, cualquiera, y o",
      "Productos cuyo nombre contiene la letra A y la letra o en cualquier posición",
      "Productos cuyo nombre empieza con Ao",
      "Productos cuyo nombre empieza con A y termina con o, con cualquier cantidad de caracteres en el medio",
      "Productos cuyo nombre termina con Ao"
    ],
    "correct": 3,
    "explanation": "LIKE 'A%o' empieza con A y termina en o."
  },
  {
    "id": "ev-33",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Qué resultado produce DISTINCT en SELECT DISTINCT departamento FROM empleados?",
    "options": [
      "Los departamentos con más de un empleado",
      "Un error porque DISTINCT no puede usarse con ORDER BY",
      "Una lista de todos los departamentos que aparecen en la tabla, sin repeticiones, ordenada alfabéticamente",
      "El número de empleados por departamento",
      "El departamento con mayor cantidad de empleados"
    ],
    "correct": 2,
    "explanation": "DISTINCT elimina duplicados."
  },
  {
    "id": "ev-34",
    "moduleId": 2,
    "type": "multiple",
    "question": "¿Cuál es el riesgo de usar NOT IN con una subconsulta que devuelve al menos un valor NULL?",
    "options": [
      "La consulta devuelve todas las filas de la tabla",
      "La consulta lanza un error de sintaxis",
      "La condición siempre será falsa y no devolverá ningún resultado",
      "El motor reemplaza el NULL por un 0 automáticamente",
      "Solo se ignoran las filas con NULL"
    ],
    "correct": 2,
    "explanation": "NOT IN con NULL da conjunto vacío."
  },
  {
    "id": "ev-35",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Cuántas filas devuelve esta consulta si la tabla pedidos tiene 100 filas (LIMIT 5 OFFSET 10)?",
    "options": [
      "Un error porque LIMIT y OFFSET no pueden usarse juntos con ORDER BY",
      "Las filas 10 a 15 ordenadas por fecha descendente (omite las primeras 10 y devuelve las siguientes 5)",
      "Las 10 filas más antiguas",
      "Un máximo de 15 filas",
      "Las 5 filas más recientes de la tabla"
    ],
    "correct": 1,
    "explanation": "OFFSET 10 salta 10, LIMIT 5 trae 5."
  },
  {
    "id": "ev-36",
    "moduleId": 2,
    "type": "multiple",
    "question": "¿Qué devuelve la subconsulta escalar en el SELECT (SELECT avg(salario) FROM empleados)?",
    "options": [
      "Sólo los empleados cuyo salario es mayor al promedio",
      "Un error porque no se puede usar una subconsulta en la lista de SELECT",
      "Un error porque la subconsulta devuelve más de una fila",
      "Sólo una fila con el promedio de la empresa",
      "Todos los empleados con su nombre, salario, y el salario promedio de la empresa repetido en cada fila"
    ],
    "correct": 4,
    "explanation": "Escalar en SELECT repite promedio por fila."
  },
  {
    "id": "ev-37",
    "moduleId": 2,
    "type": "multiple",
    "question": "Analiza la consulta con IN usando departamentos de Buenos Aires:",
    "options": [
      "Consulta A produce un error cuando la subconsulta devuelve NULL",
      "Consulta A devuelve clientes con pedidos; Consulta B devuelve clientes sin pedidos",
      "Ambas consultas devuelven el mismo resultado, sólo en orden diferente",
      "Consulta A devuelve clientes sin pedidos; Consulta B devuelve clientes con al menos un pedido",
      "Consulta B es más eficiente que Consulta A en todos los casos"
    ],
    "correct": 4,
    "explanation": "Según evaluativo, marca E."
  },
  {
    "id": "ev-38",
    "moduleId": 2,
    "type": "multiple",
    "question": "¿Qué diferencia existe en el resultado entre usar IN y NOT IN en las estructuras analizadas?",
    "options": [
      "El resultado del JOIN entre empleados y departamentos",
      "Empleados cuyo departamento coincide con alguno de los departamentos ubicados en Buenos Aires",
      "Un error porque IN no puede usarse con subconsultas",
      "Empleados que NO pertenecen a departamentos ubicados en Buenos Aires",
      "Todos los departamentos ubicados en Buenos Aires"
    ],
    "correct": 3,
    "explanation": "NOT IN trae no pertenecientes."
  },
  {
    "id": "ev-39",
    "moduleId": 4,
    "type": "multiple",
    "question": "Identifica el tipo de subconsulta en la consulta con referencia a e.departamento:",
    "options": [
      "Subconsulta correlacionada, porque hace referencia a e.departamento de la consulta externa y se evalúa una vez por cada fila de empleados",
      "Subconsulta de fila, porque devuelve exactamente una fila",
      "Tabla derivada (derived table), porque aparece en la cláusula FROM",
      "Subconsulta no correlacionada, porque usa la función AVG",
      "CTE, porque define un resultado intermedio nombrado"
    ],
    "correct": 0,
    "explanation": "Referencia e.departamento → correlacionada."
  },
  {
    "id": "ev-40",
    "moduleId": 3,
    "type": "multiple",
    "question": "¿Qué devuelve la consulta con EXISTS para pedidos recientes de clientes?",
    "options": [
      "Los pedidos realizados después del 1 de enero de 2024",
      "Todos los clientes, indicando con 1 si tienen pedidos recientes"
    ],
    "correct": 0,
    "explanation": "EXISTS filtra pedidos recientes."
  },
  {
    "id": "ev-41",
    "moduleId": 5,
    "type": "multiple",
    "question": "¿Qué hace la subconsulta en la cláusula FROM (tabla derivada con GROUP BY y total_empleados > 5)?",
    "options": [
      "Lista los departamentos con más de 5 empleados; la subconsulta genera un resumen agrupado que luego se filtra en la consulta externa",
      "Un error, porque no se puede filtrar con WHERE sobre una tabla derivada",
      "Cuenta los departamentos que tienen más de 5 empleados",
      "Lista los empleados de departamentos con más de 5 personas",
      "Un error porque el alias resumen_dept no puede usarse en WHERE"
    ],
    "correct": 0,
    "explanation": "Derivada genera resumen y se filtra."
  },
  {
    "id": "ev-42",
    "moduleId": 2,
    "type": "multiple",
    "question": "¿Cuál es un problema CONOCIDO al usar NOT IN cuando la subconsulta puede devolver valores NULL?",
    "options": [
      "PostgreSQL lanza un error indicando que NULL no es comparable",
      "NOT IN convierte automáticamente los NULL en cero antes de comparar",
      "Si la subconsulta devuelve algún NULL, NOT IN devuelve un conjunto vacío (ninguna fila coincide) porque la comparación con NULL produce UNKNOWN, no FALSE",
      "NULL sólo afecta a NOT IN cuando hay más de 1000 filas en la subconsulta",
      "PostgreSQL ignora los NULL y el resultado es correcto de todas formas"
    ],
    "correct": 2,
    "explanation": "NOT IN con NULL devuelve vacío por UNKNOWN."
  },
  {
    "id": "ev-43",
    "moduleId": 2,
    "type": "multiple",
    "question": "¿Qué produce la siguiente subconsulta de fila con tupla (departamento, cargo)?",
    "options": [
      "Devuelve sólo a 'Ana García'",
      "Un error porque la subconsulta de fila sólo puede usarse con el operador IN",
      "Un error porque no se puede comparar una tupla de dos columnas con una subconsulta",
      "Devuelve todos los empleados que tienen exactamente el mismo departamento y cargo que 'Ana García'",
      "Devuelve empleados que tienen el mismo departamento O el mismo cargo que 'Ana García'"
    ],
    "correct": 3,
    "explanation": "Tupla compara departamento y cargo iguales."
  },
  {
    "id": "ev-44",
    "moduleId": 3,
    "type": "multiple",
    "question": "Analiza el uso de NOT EXISTS en la consulta sobre detalle_pedido:",
    "options": [
      "Un error porque NOT EXISTS requiere que la subconsulta devuelva un valor booleano",
      "Productos cuyo id no existe en la tabla detalle_pedido",
      "Pedidos que no tienen detalle asociado",
      "Productos que han sido pedidos al menos una vez",
      "Productos que NUNCA han aparecido en ningún detalle de pedido"
    ],
    "correct": 3,
    "explanation": "Según evaluativo marca A (aunque técnico sería B)."
  },
  {
    "id": "ev-45",
    "moduleId": 1,
    "type": "multiple",
    "question": "Si se define una FK con la cláusula ON DELETE CASCADE, ¿qué sucede al eliminar un pasajero?",
    "options": [
      "Solo se borra el pasajero, dejando los viajes como registros huérfanos",
      "El sistema impide la eliminación si el pasajero tiene viajes",
      "Se eliminan automáticamente todos los viajes asociados a ese pasajero",
      "Los viajes asociados quedan con el pasajero_id en NULL",
      "Se genera un error de violación de integridad"
    ],
    "correct": 2,
    "explanation": "CASCADE borra hijos."
  },
  {
    "id": "ev-46",
    "moduleId": 6,
    "type": "multiple",
    "question": "¿Qué intentamos calcular en el query con HAVING sum(monto) > (SELECT sum(monto)/10 FROM viajes)?",
    "options": [
      "Zonas con montos superiores a 10",
      "Un error porque hay SUM",
      "El 10% de los viajes de cada zona",
      "Zonas con más de 10 viajes",
      "Zonas que recaudaron más del 10% del total general"
    ],
    "correct": 4,
    "explanation": "10% del total general via sum/10."
  },
  {
    "id": "ev-47",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Se puede utilizar una función de agregación (como AVG) directamente en un WHERE? ¿Qué sucede?",
    "options": [
      "Solo funciona si la tabla tiene menos de 1000 filas",
      "El motor convierte la consulta en un HAVING automáticamente",
      "PostgreSQL calcula el promedio global y filtra",
      "Se debe usar el alias de la columna obligatoriamente",
      "Se genera un error porque las agregaciones no están permitidas en WHERE"
    ],
    "correct": 4,
    "explanation": "WHERE no permite agregaciones."
  },
  {
    "id": "ev-48",
    "moduleId": 6,
    "type": "multiple",
    "question": "¿Qué ocurre si intentas referenciar una CTE que no ha sido definida antes en el mismo bloque WITH?",
    "options": [
      "PostgreSQL busca una tabla llamada 'datos_filtrados' en la base de datos",
      "Se produce un error porque 'datos_filtrados' no ha sido definida antes de que 'resultado_final' intente usarla; las CTEs deben definirse en orden de dependencia",
      "PostgreSQL resuelve las CTEs en cualquier orden, así que el código funciona correctamente",
      "El resultado será un conjunto vacío pero sin error",
      "PostgreSQL crea automáticamente una tabla vacía llamada 'datos_filtrados'"
    ],
    "correct": 1,
    "explanation": "CTEs en orden de dependencia."
  },
  {
    "id": "ev-49",
    "moduleId": 6,
    "type": "multiple",
    "question": "¿Cuál es la diferencia funcional entre la CTE analizada y su subconsulta equivalente?",
    "options": [
      "En este caso concreto ambas versiones producen el mismo resultado; la diferencia es principalmente de legibilidad y organización del código",
      "La versión CTE sólo funciona en PostgreSQL 13+; la subconsulta es compatible con todas las versiones",
      "La CTE materializa siempre los resultados mientras que la subconsulta nunca lo hace, lo que hace a la CTE más lenta",
      "La CTE filtra ANTES del GROUP BY mientras que la subconsulta filtra DESPUÉS",
      "La versión con subconsulta no puede usar el alias 'pedidos_2024' en la consulta externa"
    ],
    "correct": 0,
    "explanation": "Mismo resultado, diferencia legibilidad."
  },
  {
    "id": "ev-50",
    "moduleId": 1,
    "type": "multiple",
    "question": "¿Estuvo difícil el evaluativo?",
    "options": [
      "Un tramite",
      "La B y C",
      "No",
      "Si",
      "Estoy cansado jefe..."
    ],
    "correct": 1,
    "explanation": "Respuesta marcada E: La B y C."
  }
];
