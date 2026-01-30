# DOIBoard: Democratización de la analítica bibliométrica mediante IA y visualización avanzada

**Título:** DOIBoard: Panel de visualización y análisis semántico de datos Crossref.
**Autoría:** Fran Máñez – Servei de Biblioteques, Publicacions i Arxius (SBPA), Universitat Politècnica de Catalunya · BarcelonaTech (UPC).
**Contacto:** francisco.manez@upc.edu | **Fase:** Realizada y en curso.

---

## 1. Descripción de la experiencia
En el marco de la Ciencia Abierta, la transparencia exige que los datos sobre la producción científica no solo sean accesibles, sino también interpretables. Crossref ofrece una API pública masiva, pero su entrega en formato JSON técnico supone una barrera para personal bibliotecario, editorial y gestor. **DOIBoard** ([doi.upc.edu](https://doi.upc.edu)) es una aplicación web de código abierto que democratiza este acceso transformando metadatos complejos en visualizaciones interactivas y análisis semánticos profundos.

### Funcionalidades del ecosistema DOIBoard:
La plataforma se articula en torno a herramientas diseñadas para la toma de decisiones basada en datos:
*   **Análisis Institucional por Prefijo:** Permite obtener una radiografía completa de cualquier institución (introduciendo su prefijo Crossref), incluyendo el volumen total de DOIs, distribución por tipos documentales (artículos, libros, datasets) y evolución temporal de depósitos.
*   **Auditoría de Cobertura de Metadatos:** Visualiza el porcentaje de registros que incluyen metadatos críticos (abstracts, referencias, ORCIDs, licencias), permitiendo detectar áreas de mejora en la calidad del depósito.
*   **Explorador de Producción (DOI List):** Motor de búsqueda avanzada con filtrado por fechas y tipos documentales que permite listar y exportar los metadatos completos de una institución a formato CSV.
*   **Analítica de Citación (DOIs & ORCIDs):** Ranking de los trabajos más influyentes de la institución y de los autores (ORCID) más referenciados, proporcionando una métrica de impacto directo.
*   **Buscador Global de Impacto:** Una mirada hacia afuera que permite identificar las obras más citadas de toda la red Crossref en tiempo real, facilitando el descubrimiento de literatura de frontera.
*   **Consulta de Metadatos Unitarios:** Visualización enriquecida de DOIs individuales con enlaces directos a proveedores de métricas abiertas (OpenCitations, OpenAire) y perfiles académicos.

### AI Innovation Lab: Potenciación mediante IA Generativa
El componente más disruptivo es el laboratorio de IA, que utiliza el modelo **Google Gemini 2.0 Flash Lite**. Es fundamental destacar que esta integración se realiza aprovechando el **nivel gratuito (free tier)** de la API, lo que garantiza la sostenibilidad económica del proyecto y demuestra que es posible implementar analítica avanzada de alta gama sin costes de infraestructura prohibitivos.

Las tres funcionalidades clave del laboratorio son:
1.  **Innovation Radar (Radar de Innovación):** Visualiza el panorama científico semestral mediante un *Packed Bubble Chart*. La IA realiza un clustering semántico agresivo para identificar 5-6 macro-dominios científicos y agrupar dentro de ellos tendencias específicas, clasificándolas según su ciclo de vida: *emergentes* (disrupción súbita), *en alza* (aceleración de citas) o *consolidadas*.
2.  **Monthly Research Core (Núcleo Temático):** Mediante la síntesis conceptual de los 300 artículos más citados del mes, la IA genera informes estructurados que resumen los focos de investigación más activos, permitiendo a los gestores comprender la agenda científica global sin revisar miles de títulos.
3.  **Horizon Scanning (Escaneo de Frontera):** Esta herramienta prospectiva compara los 250 artículos más citados del último trimestre con los 250 del trimestre anterior (500 DOIs analizados en total). El objetivo es detectar "señales débiles" y desplazamientos en la frontera del conocimiento, identificando qué temas están ganando tracción cualitativa y cómo evoluciona la agenda científica entre periodos consecutivos.

## 2. Principales resultados y aprendizajes
*   **Empoderamiento del Personal Bibliotecario:** Se dota a los profesionales de una herramienta de auditoría y análisis de impacto potente y sencilla que reduce la dependencia de bases de datos propietarias costosas y personal técnico especializado.
*   **Fomento de la Calidad en Ciencia Abierta:** Al visualizar la falta de metadatos de forma gráfica y comparativa, las instituciones se sienten motivadas a mejorar sus flujos de depósito en Crossref, aumentando la visibilidad y reutilización de su producción.
*   **Integración en Ecosistemas Editoriales (OJS):** Se ha implementado con éxito un plugin para *Open Journal Systems* que añade, en la página de cada artículo, enlaces directos hacia DOIBoard. Estos permiten navegar instantáneamente tanto a la ficha detallada del DOI como a la analítica de impacto por prefijo institucional, conectando la plataforma de publicación con herramientas de análisis avanzadas.
*   **Capacidad de Agregación Semántica (IA):** Los LLMs han demostrado niveles de precisión sorprendentes al agrupar conceptos complejos bajo un solo clúster temático (ej. unir fotovoltaica tándem y células de perovskita bajo "Fotovoltaica de Nueva Generación"), superando las limitaciones de la indexación tradicional por palabras clave.

## 3. Conexión con la Ciencia Abierta
DOIBoard se alinea con la Ciencia Abierta al promover el uso de APIs abiertas y software libre. Al ser una herramienta extensible, cualquier universidad del mundo puede usarla para monitorizar su producción científica de forma autónoma, transparente y gratuita.

---

## Referencias y enlaces
1. **DOIBoard App:** [https://doi.upc.edu](https://doi.upc.edu)
2. **Crossref REST API:** [https://api.crossref.org](https://api.crossref.org)
3. **Google Gemini API:** [https://ai.google.dev/](https://ai.google.dev/)
4. **Plugin OJS:** Disponible en el repositorio de la comunidad PKP.
