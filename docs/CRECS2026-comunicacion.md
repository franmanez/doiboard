# DOIBoard: un panel visual para explorar la producción DOI de cualquier institución

## Comunicación completa para CRECS 2026

---

**Tema propuesto:** Gestión editorial, roles, equipos, coedición, redes

**Autoría:** [Nombre del autor/a] – Servei de Biblioteques, Publicacions i Arxius (SBPA), Universitat Politècnica de Catalunya (UPC)

**Contacto:** doi@upc.edu · +34 93 401 62 24

**URL del servicio:** https://doi.upc.edu

---

## 1. Introducción

La gestión de identificadores DOI se ha convertido en una tarea esencial para las instituciones académicas que publican revistas científicas, tesis doctorales, actas de congresos y otros materiales de investigación. Crossref, como una de las principales agencias de registro de DOIs, almacena millones de metadatos que describen la producción científica mundial. Sin embargo, acceder a esta información de forma comprensible y útil para la toma de decisiones editoriales no siempre resulta sencillo.

Esta comunicación presenta DOIBoard, un panel web desarrollado por el Servei de Biblioteques, Publicacions i Arxius de la Universitat Politècnica de Catalunya (UPC) que permite explorar y visualizar de forma gráfica los datos procedentes de la API de Crossref. La herramienta, disponible en https://doi.upc.edu, nació como respuesta a una necesidad interna y ha evolucionado hasta convertirse en un recurso abierto para cualquier institución que desee analizar su producción DOI.

## 2. Contexto y origen del proyecto

El proyecto surgió en el contexto del proceso de mejora de la asignación de identificadores DOI iniciado por el SBPA de la UPC. El servicio disponía de todos sus DOIs depositados en Crossref y podía recuperar la información a través de la API pública, pero los datos llegaban en formato JSON, un lenguaje técnico poco amigable para el personal bibliotecario y los editores de revistas.

Las preguntas que se planteaban eran recurrentes: ¿cuántos DOIs tenemos registrados? ¿De qué tipos documentales? ¿Cuál ha sido la evolución en los últimos años? ¿Qué obras son las más citadas? ¿Qué autores tienen más presencia? Responder a estas cuestiones requería conocimientos de programación o depender de informes puntuales elaborados por personal técnico.

La solución fue desarrollar una interfaz web que tradujera automáticamente los datos de la API en gráficos, tablas y estadísticas comprensibles. Inicialmente, DOIBoard se concibió como una herramienta exclusiva para la UPC, pero pronto se detectó su potencial de extensibilidad: bastaba con cambiar el prefijo DOI para obtener la misma información sobre cualquier otra institución registrada en Crossref.

Al buscar alternativas en el mercado, no encontramos ninguna herramienta similar que ofreciera una visualización gráfica y accesible de los datos de Crossref para cualquier entidad. Esta ausencia nos animó a convertir DOIBoard en un servicio abierto y compartirlo con la comunidad académica y editorial.

## 3. Objetivos

Los objetivos de esta comunicación son:

1. **Presentar DOIBoard** como herramienta de apoyo a bibliotecarios, editores y gestores de revistas para el análisis visual de la producción DOI institucional.

2. **Describir las funcionalidades principales** del panel y cómo facilitan la toma de decisiones editoriales sin necesidad de conocimientos técnicos.

3. **Explicar el modelo de extensibilidad** que permite a cualquier institución utilizar la herramienta con solo introducir su prefijo Crossref, sin registro ni configuración.

4. **Presentar la integración con Open Journal Systems (OJS)** mediante un plugin que enlazará directamente cada artículo con su vista analítica en DOIBoard.

5. **Reflexionar sobre el valor de compartir** este tipo de desarrollos con la comunidad, fomentando la transparencia y la colaboración interuniversitaria.

## 4. Metodología de desarrollo

El desarrollo de DOIBoard siguió un enfoque iterativo centrado en las necesidades reales de los usuarios finales: bibliotecarios y editores de revistas científicas.

### Fase 1: Identificación de necesidades

Se realizaron entrevistas informales con el personal del SBPA para identificar las consultas más frecuentes sobre los DOIs institucionales. Las preguntas se agruparon en categorías: información general del prefijo, listados de DOIs, análisis temporal, rankings de citación y exportación de datos.

### Fase 2: Diseño e implementación

A partir de las necesidades identificadas, se diseñó una arquitectura web que consume la API pública de Crossref (https://api.crossref.org) y presenta los resultados de forma visual. La aplicación se desarrolló con tecnologías web modernas:

- **Vue.js** como framework de desarrollo de la interfaz de usuario
- **Bootstrap** para garantizar un diseño responsive adaptado a diferentes dispositivos
- **Highcharts** para la generación de gráficos interactivos
- **Docker** para facilitar el despliegue en cualquier servidor

La interfaz se tradujo a tres idiomas (catalán, español e inglés) utilizando un sistema de internacionalización, lo que facilita su uso en contextos internacionales y redes de colaboración.

### Fase 3: Validación y mejora continua

La herramienta se validó con bibliotecarios y editores de revistas de la UPC, recogiendo sugerencias que se incorporaron en versiones sucesivas. Este proceso de mejora continua ha permitido afinar la usabilidad y añadir funcionalidades demandadas por los usuarios.

### Fase 4: Integración con OJS

Actualmente se está desarrollando un plugin para Open Journal Systems (OJS) que añadirá en las páginas de visualización de artículos un enlace directo hacia DOIBoard. Esto permitirá que, desde cualquier artículo publicado en una revista OJS, editores e investigadores puedan acceder a la vista analítica del DOI correspondiente con un solo clic.

## 5. Funcionalidades principales

DOIBoard ofrece las siguientes funcionalidades, accesibles sin necesidad de registro:

### 5.1. Búsqueda de DOI individual

Permite buscar cualquier DOI y recuperar sus metadatos principales: editor, tipo de documento, título, autores, fecha de publicación, fecha de depósito y URL del recurso. Además, proporciona enlaces directos a servicios complementarios como OpenAire, OpenCitations y Google Académico, facilitando la exploración del impacto y las citas del documento.

### 5.2. Información del prefijo

Introduciendo un prefijo DOI (por ejemplo, 10.5821 para la UPC), se obtiene:

- Número total de DOIs registrados por la institución
- Distribución por tipo documental (artículos, tesis, actas de congresos, libros, etc.)
- Porcentaje de cobertura de metadatos (qué campos están informados)
- Gráficos de evolución temporal por fecha de publicación y fecha de depósito

Esta visión global permite a los gestores editoriales identificar tendencias, detectar posibles brechas en el registro y planificar estrategias de mejora.

### 5.3. Listado y exportación de DOIs

Se puede obtener un listado paginado de todos los DOIs asociados a un prefijo, con posibilidad de filtrar por texto libre, rango de fechas y tipo documental. Los resultados pueden exportarse a formato CSV para su análisis posterior en hojas de cálculo o herramientas de gestión.

### 5.4. Rankings de citación

DOIBoard muestra los DOIs más citados de una institución (según los datos de referencias cruzadas de Crossref) y los identificadores ORCID más referenciados. Esta información resulta valiosa para identificar las obras de mayor impacto y los autores más prolíficos.

### 5.5. Búsqueda de miembros

Permite buscar instituciones por nombre y consultar sus prefijos DOI asociados, ubicación y número total de registros. Esto facilita la comparación entre instituciones y la identificación de posibles colaboradores.

## 6. Extensibilidad y modelo abierto

Una de las características distintivas de DOIBoard es su modelo de extensibilidad. Cualquier institución registrada en Crossref puede utilizar la herramienta sin necesidad de instalación, registro ni configuración: basta con introducir el prefijo DOI correspondiente.

Este enfoque convierte DOIBoard en un recurso compartido para toda la comunidad académica. Universidades, editoriales, servicios bibliotecarios y gestores de revistas pueden beneficiarse de las mismas funcionalidades que la UPC, simplemente accediendo a https://doi.upc.edu.

Para instituciones que deseen desplegar su propia instancia, el código está desarrollado con tecnologías estándar y empaquetado con Docker, lo que facilita la replicación en cualquier infraestructura.

## 7. Integración con Open Journal Systems

Open Journal Systems (OJS) es una de las plataformas de gestión editorial más utilizadas en el ámbito académico. Conscientes de esta realidad, estamos desarrollando un plugin que integrará DOIBoard directamente en OJS.

El plugin añadirá un enlace en la página de visualización de cada artículo que conducirá a la ficha analítica del DOI en DOIBoard. De este modo, editores, revisores e investigadores podrán acceder a información complementaria sobre el impacto y los metadatos del artículo sin salir de su flujo de trabajo habitual.

Esta integración refuerza la visión de DOIBoard como herramienta de apoyo a la gestión editorial, conectando los sistemas de publicación con el análisis bibliométrico de forma transparente.

## 8. Transparencia y acceso abierto

Al publicar DOIBoard como servicio abierto, la UPC adopta un compromiso de transparencia sobre su producción científica registrada. Los datos que muestra la herramienta son públicos (proceden de la API de Crossref), pero su presentación visual los hace accesibles para un público mucho más amplio.

Esta democratización de la información bibliométrica tiene múltiples beneficios:

- **Para bibliotecarios:** facilita el seguimiento de la producción institucional y la detección de errores en los metadatos
- **Para editores:** permite analizar la evolución de sus revistas y compararse con otras publicaciones
- **Para gestores:** proporciona datos objetivos para la toma de decisiones sobre políticas de publicación
- **Para investigadores:** ofrece una visión rápida del impacto de sus trabajos

## 9. Lecciones aprendidas

El desarrollo de DOIBoard ha proporcionado valiosas lecciones:

1. **Las herramientas deben nacer de necesidades reales.** DOIBoard surgió de preguntas concretas del personal bibliotecario, lo que garantizó su utilidad desde el primer momento.

2. **La simplicidad es clave.** Una interfaz sencilla y visual tiene más probabilidades de ser adoptada que un sistema complejo, por muy potente que sea.

3. **El multilingüismo amplía el alcance.** Ofrecer la herramienta en varios idiomas ha facilitado su uso en contextos internacionales.

4. **Compartir genera valor.** Al abrir DOIBoard a cualquier institución, hemos recibido feedback que nos ha ayudado a mejorar la herramienta.

5. **La integración con sistemas existentes es fundamental.** El plugin de OJS responde a la demanda de conectar DOIBoard con los flujos de trabajo editoriales habituales.

## 10. Conclusiones y trabajo futuro

DOIBoard demuestra que es posible convertir datos técnicos de una API en información visual y accionable para profesionales no especializados en programación. La herramienta ofrece una solución gratuita, multilingüe y extensible que cualquier institución puede utilizar para analizar su producción DOI.

Como trabajo futuro, se contempla:

- Completar y publicar el plugin de integración con OJS
- Añadir nuevas visualizaciones según las demandas de los usuarios
- Explorar la posibilidad de crear un metatablero que agregue datos de múltiples instituciones para análisis comparativos
- Documentar el proceso de despliegue para facilitar que otras universidades instalen sus propias instancias

Con DOIBoard, la UPC contribuye a la transparencia editorial y al acceso abierto, compartiendo con la comunidad una herramienta que esperamos resulte útil para bibliotecarios, editores, gestores de revistas e investigadores.

---

## Palabras clave

- **Español:** DOIBoard; Crossref; gestión editorial; visualización de datos; prefijos DOI; transparencia; acceso abierto; OJS; métricas; bibliotecas universitarias.
- **English:** DOIBoard; Crossref; editorial management; data visualization; DOI prefixes; transparency; open access; OJS; metrics; academic libraries.

---

## Referencias bibliográficas

1. Crossref. (2024). *REST API Documentation*. https://api.crossref.org

2. International DOI Foundation. (2023). *The DOI Handbook*. https://www.doi.org/hb.html

3. Priem, J., Taraborelli, D., Groth, P., & Neylon, C. (2010). *Altmetrics: A manifesto*. http://altmetrics.org/manifesto

4. Public Knowledge Project. (2024). *Open Journal Systems*. https://pkp.sfu.ca/software/ojs/

5. Hendricks, G., Tkaczyk, D., Lin, J., & Feeney, P. (2020). Crossref: The sustainable source of community-owned scholarly metadata. *Quantitative Science Studies*, 1(1), 414–427. https://doi.org/10.1162/qss_a_00022
