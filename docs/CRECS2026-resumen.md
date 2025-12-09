# DOIBoard: panel de visualización de DOIs y prefijos Crossref

**Tema propuesto:** Gestión editorial, roles, equipos, coedición, redes

**Autoría:** Fran Máñez – Servei de Biblioteques, Publicacions i Arxius (SBPA), Universitat Politècnica de Catalunya (UPC)

**Contacto:** francisco.manez@upc.edu

---

## Planteamiento y justificación

En el marco del proceso de mejora de la asignación de identificadores DOI iniciado por el Servei de Biblioteques, Publicacions i Arxius de la UPC, surgió una necesidad clara: disponíamos de todos nuestros DOIs depositados en Crossref y podíamos recuperar la información a través de su API pública, pero los datos llegaban en formato técnico (JSON), poco amigable y difícil de interpretar para personal no especializado. Los bibliotecarios y editores de revistas necesitaban una forma sencilla de visualizar tendencias, analizar la evolución de los registros y comparar prefijos sin tener que escribir consultas técnicas a la API de Crossref.

Así nació DOIBoard, inicialmente como herramienta interna para consultar los DOIs de la UPC. Sin embargo, pronto detectamos que la solución podía extenderse a cualquier institución registrada en Crossref simplemente introduciendo su prefijo. Al buscar alternativas, no encontramos ninguna herramienta similar que ofreciera visualización gráfica y accesible de los datos de Crossref para cualquier entidad. Por ello, decidimos desarrollar una aplicación abierta, disponible en [doi.upc.edu](https://doi.upc.edu), y compartirla con la comunidad.

Esta comunicación se alinea con CRECS 2026 al abordar la gestión editorial desde una perspectiva de transparencia, acceso abierto y profesionalización de servicios bibliométricos.

## Objetivos

Los objetivos son: (1) presentar DOIBoard como herramienta de apoyo a bibliotecarios, editores y gestores de revistas para el análisis visual de la producción DOI; (2) describir las funcionalidades del panel y cómo facilitan la toma de decisiones editoriales; (3) explicar el modelo de extensibilidad que permite a cualquier institución utilizar la herramienta introduciendo su prefijo Crossref; (4) presentar la integración con Open Journal Systems (OJS) mediante un plugin que enlaza cada artículo con su vista analítica; y (5) reflexionar sobre el valor de compartir estos desarrollos con la comunidad académica.

## Metodología utilizada

El desarrollo de la aplicación siguió un enfoque iterativo, basado en metodologías agiles, y orientado a necesidades reales. Se identificaron las consultas más frecuentes del personal bibliotecario: ¿cuántos DOIs tenemos?, ¿de qué tipos documentales?, ¿cuál es la evolución anual?, ¿qué obras son las más citadas? A partir de estas preguntas, se diseñó una interfaz web que consume la API pública de Crossref y presenta los resultados mediante gráficos interactivos y tablas paginadas.

La aplicación se desarrolló con tecnologías web modernas (Vue.js, Bootstrap, Highcharts) y se despliega mediante contenedores Docker, facilitando su instalación en cualquier servidor. La interfaz está disponible en catalán, español e inglés para favorecer su uso internacional.

Posteriormente se validó con bibliotecarios y editores de la UPC, incorporando mejoras sucesivas. Además, hemos desarrollado un plugin para OJS que permite acceder directamente a la ficha analítica del DOI desde cualquier artículo, y que ya está disponible y compartido con la comunidad PKP de Open Journal Systems.

## Principales ideas y aspectos tratados

La comunicación aborda cuatro ejes. Primero, las **funcionalidades del panel**: búsqueda de DOIs con metadatos y enlaces a OpenAire, OpenCitations o Google Académico; exploración de prefijos con estadísticas por tipo documental, gráficos temporales y análisis de cobertura; listado y exportación CSV de DOIs; rankings de DOIs más citados y ORCIDs más referenciados.

Segundo, la **extensibilidad**: cualquier institución puede usar DOIBoard introduciendo su prefijo, sin registro ni configuración, convirtiéndola en recurso compartido.

Tercero, la **integración con OJS**: el plugin en desarrollo añadirá un enlace directo desde cada artículo hacia DOIBoard, facilitando el acceso a información analítica desde la plataforma editorial.

Cuarto, la **transparencia y acceso abierto**: al publicar DOIBoard como servicio abierto, la UPC democratiza el acceso a información bibliométrica que, aunque pública, resulta difícil de interpretar sin herramientas adecuadas.

## Destacado final: aportación o novedad

La principal aportación es convertir datos técnicos de una API en información visual y accionable para profesionales no especializados. La novedad reside en ofrecer una herramienta gratuita, multilingüe y extensible que cualquier institución puede utilizar para analizar su producción DOI, fomentando transparencia editorial y colaboración interuniversitaria. La integración con OJS conecta flujos de trabajo editoriales con análisis bibliométrico de forma directa.

---

## Palabras clave

- **Español:** DOIBoard; Crossref; gestión editorial; visualización de datos; prefijos DOI; transparencia; acceso abierto; OJS; métricas; bibliotecas universitarias.
- **English:** DOIBoard; Crossref; editorial management; data visualization; DOI prefixes; transparency; open access; OJS; metrics; academic libraries.

---

## Referencias bibliográficas

1. Crossref. (2024). *REST API Documentation*. https://api.crossref.org
2. International DOI Foundation. (2023). *The DOI Handbook*. https://www.doi.org/hb.html
3. Public Knowledge Project. (2024). *Open Journal Systems*. https://pkp.sfu.ca/software/ojs/
