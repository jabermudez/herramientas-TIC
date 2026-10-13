import { Unit, ShortcutItem, GlossaryTerm } from '../types/manual';
import heroImage from '../assets/images/manual_tic_hero_1791911809320.jpg';
import hardwareImage from '../assets/images/hardware_pc_diagram_1791911809797.jpg';
import mobileImage from '../assets/images/ecosistema_movil_cloud_1791911809547.jpg';

export const MANUAL_METADATA = {
  courseTitle: 'Manual de Herramientas TIC',
  subtitle: 'Guía Integral de Alfabetización y Productividad Digital: De Básico a Intermedio',
  institution: 'Servicios TIC & Formación Pedagógica Digital',
  authorRole: 'Autor Técnico y Pedagógico TIC',
  year: '2026',
  targetAudience: 'Estudiantes, docentes y profesionales en transición digital (Nivel Básico a Intermedio)',
  heroImage,
  hardwareImage,
  mobileImage
};

export const UNITS_DATA: Unit[] = [
  {
    id: 'unidad-1',
    unitNumber: 1,
    title: 'Fundamentos de las TIC y del Entorno Digital',
    subtitle: 'Comprender el ecosistema digital, la red global, la organización de archivos y la ciudadanía en línea',
    level: 'Nivel Básico',
    summary: 'Esta unidad establece las bases conceptuales indispensables para desenvolverse con solvencia en la sociedad de la información. Aborda la distinción esencial entre hardware y software, la infraestructura de Internet, la computación en la nube, la organización lógica de archivos y carpetas, y las normas de convivencia y seguridad cívica en el entorno virtual.',
    learningObjectives: [
      'Definir con precisión el concepto de TIC y reconocer su impacto transformador en el ámbito laboral, académico y social.',
      'Diferenciar con claridad meridiana entre hardware y software mediante analogías cotidianas y ejemplos tangibles.',
      'Comprender la diferencia práctica entre un navegador web (browser) y un motor de búsqueda (search engine), así como el protocolo seguro HTTPS.',
      'Reconocer las extensiones de archivo más utilizadas (.pdf, .docx, .xlsx, .jpg, .png, .zip) y su asociación con programas correspondientes.',
      'Describir el concepto de Computación en la Nube (Cloud Computing) y sus ventajas frente al almacenamiento puramente local.',
      'Gestionar la huella digital propia y aplicar pautas de ciudadanía digital ética y ciberseguridad básica.'
    ],
    flashcards: [
      {
        front: '¿Qué diferencia esencial existe entre Hardware y Software?',
        back: 'El Hardware es la parte física y tangible (lo que puedes tocar: pantalla, teclado, cables). El Software es la parte lógica e intangible (las instrucciones y programas: Windows, Word, navegadores).',
        hint: 'Piensa en el instrumento musical y la partitura.'
      },
      {
        front: '¿Cuál es la diferencia entre Google Chrome y el buscador Google?',
        back: 'Chrome es la aplicación navegador (el vehículo para entrar a la web). El buscador Google es un sitio web que indexa y encuentra páginas (el mapa o GPS).',
        hint: 'Uno es el programa instalado, el otro es un servicio en línea.'
      },
      {
        front: '¿Qué significa el candado y las letras "HTTPS" en una dirección web?',
        back: 'Indica que la conexión entre tu dispositivo y ese sitio web está cifrada y viaja protegida, impidiendo que terceros intercepten contraseñas o datos bancarios en tránsito.',
        hint: 'La "S" final significa Seguro (Secure).'
      },
      {
        front: '¿Qué es la Huella Digital?',
        back: 'Es el rastro permanente de información y registros que dejamos al navegar, comentar, publicar fotos, enviar formularios o realizar búsquedas en Internet.',
        hint: 'Una vez en la red, la privacidad total desaparece.'
      }
    ],
    sections: [
      {
        id: '1-1-que-son-las-tic',
        title: '1.1 ¿Qué son las TIC y por qué transforman nuestro entorno?',
        content: `Las Tecnologías de la Información y la Comunicación (TIC) son el conjunto convergente de recursos, herramientas, dispositivos electrónicos, redes de transmisión y programas informáticos que permiten compilar, procesar, almacenar, transmitir y recuperar información en cualquier soporte: texto, sonido, imagen y video.

Lejos de ser únicamente "computadoras y teléfonos", las TIC constituyen el tejido conectivo de la sociedad moderna. Permiten que un trámite que antes requería tres días hábiles y traslados físicos se resuelva en segundos desde una aplicación gubernamental, que un docente comparta conocimientos con personas en diferentes latitudes de forma sincrónica, y que pequeños emprendedores comercialicen sus creaciones a escala internacional.`,
        analogy: {
          concept: 'El impacto de las TIC',
          comparison: 'El sistema circulatorio del cuerpo humano',
          explanation: 'Así como los vasos sanguíneos transportan oxígeno y nutrientes a cada célula para que el organismo funcione armónicamente, las TIC transportan datos e información entre personas, instituciones y dispositivos, permitiendo que la sociedad contemporánea opere de manera ágil y articulada.'
        },
        callouts: [
          {
            type: 'curiosity',
            title: 'Evolución y masificación planetaria',
            content: 'El término TIC comenzó a popularizarse con la masificación de la World Wide Web en la década de 1990. Hoy en día, más del 67% de la población mundial está conectada a Internet, lo que significa que más de dos tercios de la humanidad interactúan diariamente a través de este ecosistema digital.'
          },
          {
            type: 'tip',
            title: 'Principio de aprendizaje permanente',
            content: 'En tecnología, los programas y botones cambian de diseño cada temporada, pero los fundamentos lógicos (comunicación, jerarquía de carpetas, búsqueda crítica de información) permanecen constantes. Enfócate en comprender el "para qué" y el "cómo funciona", no solo en memorizar pasos mecánicos.'
          }
        ]
      },
      {
        id: '1-2-hardware-vs-software',
        title: '1.2 La dualidad esencial: Hardware vs. Software y Tipos de Archivos',
        content: `Todo sistema computacional, desde el supercomputador más complejo hasta un teléfono de bolsillo, opera gracias a dos dimensiones interdependientes:

1. **Hardware (Lo tangible):** Corresponde a la materia física del equipo. Si puedes tocarlo con las manos o se puede romper físicamente ante un golpe, es hardware. Ejemplos: teclado, monitor, batería, memoria RAM, procesador y cables.
2. **Software (Lo lógico e intangible):** Corresponde a las instrucciones, código programático y aplicaciones que le indican al hardware qué operaciones debe ejecutar. No tiene masa física, pero se manifiesta en la pantalla y en las funciones del sistema. Ejemplos: Windows, Android, navegadores, Word y hojas de cálculo.

### Categorías de Software:
- **Software de Sistema (Sistema Operativo):** Windows, macOS, GNU/Linux, Android, iOS. Administra los recursos del hardware y sirve de puente indispensable entre el usuario y la máquina.
- **Software de Aplicación:** Programas diseñados para tareas concretas del usuario (procesadores de texto, editores de fotografía, navegadores web, reproductores de video).
- **Software de Utilidad:** Antivirus, descompresores de archivos (.zip, .rar) y herramientas de copia de seguridad.

### Las Extensiones de Archivo más Comunes:
El sistema operativo reconoce qué programa debe abrir un archivo fijándose en sus últimas letras tras el punto:
- **Documentos de texto:** \`.docx\` (Word editable), \`.pdf\` (formato universal no deformable), \`.txt\` (texto plano).
- **Hojas de cálculo:** \`.xlsx\` (Excel), \`.csv\` (valores separados por comas, universal).
- **Presentaciones:** \`.pptx\` (PowerPoint), \`.key\` (Keynote de Apple).
- **Imágenes:** \`.jpg\` o \`.jpeg\` (fotografías comprimidas), \`.png\` (imágenes con transparencia), \`.svg\` (gráficos vectoriales escalables).
- **Comprimidos:** \`.zip\`, \`.rar\` (paquetes que agrupan y reducen el peso de múltiples carpetas).`,
        analogy: {
          concept: 'Hardware y Software',
          comparison: 'El instrumento musical y la partitura',
          explanation: 'El hardware es la guitarra física de madera y cuerdas: un objeto material inanimado. El software es la partitura con notas musicales y la destreza del intérprete: el conjunto de instrucciones que le dice al instrumento exactamente qué notas tocar y en qué compás.'
        },
        callouts: [
          {
            type: 'warning',
            title: 'Atención a las extensiones ocultas',
            content: 'En Windows, por defecto, las extensiones de archivo suelen estar ocultas. Activa en el Explorador de Archivos la opción "Ver > Mostrar > Extensiones de nombre de archivo" para saber siempre con certeza si un archivo recibido es un documento legítimo (.pdf) o un programa malicioso camuflado (.pdf.exe).'
          }
        ]
      },
      {
        id: '1-3-como-funciona-internet',
        title: '1.3 Cómo funciona Internet: Redes, Protocolo HTTPS, Navegadores y Búsquedas Avanzadas',
        content: `Internet es una red global descentralizada de computadoras conectadas entre sí mediante fibra óptica submarina, satélites, antenas de telefonía y enrutadores (routers). Cada vez que solicitas una página web, viaja una petición en milisegundos hasta un **servidor** remoto y recibes los paquetes de datos organizados.

### Navegador Web vs. Motor de Búsqueda:
- **Navegador Web (Browser):** Es el programa instalado en tu dispositivo (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari) que actúa como vehículo para interpretar código HTML/CSS y mostrarlo visualmente.
- **Motor de Búsqueda (Search Engine):** Es un servicio en línea (Google, Bing, DuckDuckGo) que funciona como un catálogo que indexa millones de páginas para encontrarlas según palabras clave.

### Protocolo HTTP vs. HTTPS:
- **HTTP (Inseguro):** Los datos viajan en texto plano. Cualquiera conectado a la misma red puede interceptar lo que escribes.
- **HTTPS (Seguro - Candado verde/gris):** La información viaja encriptada mediante certificados SSL/TLS. Nunca introduzcas contraseñas ni datos bancarios en páginas que no comiencen por \`https://\`.`,
        callouts: [
          {
            type: 'tip',
            title: 'Consejo Pro: Operadores de Búsqueda Avanzada',
            content: 'Usa comillas para frases exactas: "manual de ofimática", o añade site:edu para filtrar solo universidades, o filetype:pdf para encontrar libros y documentos descargables directos.'
          }
        ],
        interactiveComponentId: 'search-lab'
      },
      {
        id: '1-4-la-nube-y-ciudadania',
        title: '1.4 La Computación en la Nube, Respaldo y Ciudadanía Digital',
        content: `La **Computación en la Nube (Cloud Computing)** consiste en almacenar archivos y ejecutar aplicaciones en servidores remotos de alta seguridad accesibles a través de Internet, en lugar de depender exclusivamente del disco duro local de tu computadora personal o de una memoria USB.

### Ventajas Estratégicas de la Nube:
- **Disponibilidad Total:** Accedes a tus documentos desde tu computadora, laptop, tableta o celular.
- **Respaldo Automático:** Si tu equipo sufre una avería física o es sustraído, tus archivos continúan a salvo en los centros de datos (Google Drive, OneDrive, iCloud, Dropbox).
- **Edición Colaborativa:** Múltiples personas pueden trabajar en el mismo documento en tiempo real sin enviarse versiones por correo.

### Ciudadanía Digital y Huella en la Red:
Cada acción realizada en la red —dar un "me gusta", realizar una búsqueda, comentar en un foro o publicar una fotografía— deja un rastro imborrable llamado **Huella Digital**. 
Pautas esenciales de conducta:
- **Netiqueta:** Escribir en mayúsculas sostenidas equivale a gritar en un entorno digital. Trata a los demás con respeto y cortesía.
- **Pensamiento Crítico:** Antes de reenviar un mensaje alarmista o cadena en redes, verifica la fuente en sitios oficiales.
- **Protección de Datos Propios y de Terceros:** Nunca publiques números de identidad, direcciones domiciliarias, boletos de viaje con código de barras ni fotos de menores de edad sin autorización expresa.`,
        callouts: [
          {
            type: 'warning',
            title: 'Advertencia: La permanencia digital',
            content: 'Una vez que un contenido sale de tu dispositivo, pierdes el control sobre él. Una captura de pantalla puede volver permanente un mensaje efímero. Piensa con serenidad antes de compartir información íntima o sensible.'
          }
        ]
      }
    ],
    practicalWorkshop: {
      title: 'Taller Práctico: Organización Jerárquica de Archivos y Espacio en la Nube',
      description: 'En esta actividad guiada, estructurarás un árbol de carpetas con nomenclatura profesional, probarás operadores de búsqueda avanzada y configurarás tu espacio de trabajo en la nube.',
      steps: [
        {
          step: 1,
          instruction: 'Crear la estructura jerárquica de carpetas',
          detail: 'En tu computadora o almacenamiento en la nube, crea una carpeta principal titulada "Herramientas_TIC_Manual". Dentro de ella crea 3 subcarpetas: "01_Documentos", "02_Hojas_Calculo" y "03_Recursos_Multimedia".',
          expectedResult: 'Árbol de directorios ordenado y sin espacios confusos en los nombres.'
        },
        {
          step: 2,
          instruction: 'Práctica con operadores de búsqueda en Internet',
          detail: 'Abre tu navegador web. En la barra de búsqueda escribe: "seguridad digital" site:org filetype:pdf. Observa cómo los resultados se reducen a documentos oficiales sin publicidad comercial.',
          expectedResult: 'Comprobación empírica de la eficiencia de los operadores booleanos.'
        },
        {
          step: 3,
          instruction: 'Comprobar el protocolo seguro HTTPS',
          detail: 'Ingresa a un portal de noticias o servicios. Haz clic en el icono del candado junto a la dirección web y lee la confirmación de seguridad del certificado SSL.',
          expectedResult: 'Verificación del cifrado en tránsito de datos.'
        }
      ],
      deliverable: 'Captura de pantalla de la estructura de carpetas creada y resumen de 3 líneas sobre la búsqueda avanzada efectuada.'
    },
    quiz: [
      {
        id: 'q1-1',
        question: 'Si una persona afirma que "la memoria RAM y la pantalla son ejemplos de software", ¿su afirmación es correcta?',
        options: [
          'Sí, porque ambos muestran texto.',
          'No, porque son componentes físicos y materiales, por lo tanto son hardware.',
          'Solo la pantalla es hardware; la RAM es software porque guarda datos.',
          'Depende de si el equipo está enchufado o desenchufado.'
        ],
        correctAnswer: 1,
        explanation: 'Todo componente tangible y físico de una máquina es hardware. El software son los programas, el código y las instrucciones lógicas.'
      },
      {
        id: 'q1-2',
        question: '¿Cuál es la función primordial de un Navegador Web (como Chrome, Edge o Firefox)?',
        options: [
          'Crear virus para probar el antivirus.',
          'Interpretar el código de las páginas web y proyectarlas visualmente para que el usuario pueda navegar e interactuar.',
          'Reemplazar la memoria RAM del equipo.',
          'Imprimir hojas de papel sin tinta.'
        ],
        correctAnswer: 1,
        explanation: 'El navegador web es el software que actúa como intérprete entre el código fuente de Internet (HTML, CSS, JS) y la interfaz visual del usuario.'
      },
      {
        id: 'q1-3',
        question: '¿Qué ventaja directa aporta el protocolo HTTPS frente al antiguo HTTP?',
        options: [
          'Hace que los videos carguen en resolución 8K automáticamente.',
          'Cifra la comunicación entre el navegador y el servidor, protegiendo contraseñas y datos personales de intercepciones.',
          'Permite navegar sin gastar batería en el celular.',
          'Elimina la necesidad de usar teclado.'
        ],
        correctAnswer: 1,
        explanation: 'HTTPS implementa cifrado criptográfico TLS/SSL para garantizar que nadie en la red intermedia pueda leer o manipular los datos transmitidos.'
      }
    ],
    reviewSummary: [
      'Las TIC integran hardware, software, redes y medios para la gestión de la información.',
      'El hardware es lo físico y tangible; el software son las instrucciones lógicas.',
      'El navegador es el vehículo que visualiza páginas; el motor de búsqueda es el catálogo indexado.',
      'HTTPS garantiza que la comunicación viaja cifrada y protegida.',
      'La nube descentraliza los datos, ofreciendo respaldo, movilidad y colaboración.',
      'Toda acción digital deja una huella; la ciudadanía digital exige ética y discernimiento.'
    ]
  },
  {
    id: 'unidad-2',
    unitNumber: 2,
    title: 'Componentes del Computador (Hardware) y sus Funciones',
    subtitle: 'Anatomía interna de la máquina, unidades de medida de datos, puertos de conexión y ergonomía',
    level: 'Nivel Básico a Intermedio',
    summary: 'En esta unidad desarmamos conceptualmente el computador para comprender con nitidez la interacción entre la CPU, la memoria RAM, el almacenamiento SSD/HDD, la placa madre y los periféricos. Se detallan las unidades de medida de la información (de Bits a Terabytes), los puertos de conexión físicos y la ergonomía del puesto de trabajo.',
    learningObjectives: [
      'Identificar la función de los componentes internos centrales: CPU, Memoria RAM, Almacenamiento SSD/HDD, Placa Base, Fuente de Poder y GPU.',
      'Comprender la diferencia crítica entre memoria volátil (RAM) y memoria permanente (SSD/HDD).',
      'Dominar las unidades de medida de almacenamiento de datos: Bit, Byte, Kilobyte, Megabyte, Gigabyte y Terabyte, con equivalencias prácticas.',
      'Clasificar correctamente los periféricos en dispositivos de entrada, salida y mixtos.',
      'Reconocer los puertos físicos estándar (USB-A, USB-C, HDMI, RJ-45, Jack 3.5mm) y sus velocidades.',
      'Aplicar normas de ergonomía digital y prevención de fatiga física frente a la pantalla.'
    ],
    flashcards: [
      {
        front: '¿Por qué la memoria RAM se califica como "volátil"?',
        back: 'Porque requiere suministro eléctrico continuo para retener datos. Al apagar o reiniciar el equipo, todo lo que estaba en la RAM se borra de inmediato.',
        hint: 'Es la mesa de trabajo temporal del chef.'
      },
      {
        front: '¿Cuántos Bytes tiene 1 Kilobyte y por qué se usa base binaria?',
        back: 'En computación tradicional, 1 Kilobyte (KB) equivale a 1.024 Bytes (2^10), ya que las computadoras operan con ceros y unos (sistema binario).',
        hint: 'No son 1.000 exactos, sino 1.024.'
      },
      {
        front: '¿Qué diferencia práctica hay entre un SSD y un HDD mecánico?',
        back: 'El HDD tiene discos magnéticos que giran y una aguja mecánica (lento y frágil). El SSD usa chips de memoria flash sin piezas móviles (de 5 a 10 veces más rápido y resistente).',
        hint: 'Mecánico vs. Estado Sólido.'
      },
      {
        front: '¿Qué periféricos son considerados "mixtos" (entrada y salida)?',
        back: 'Aquellos que pueden tanto recibir datos como emitirlos: pantallas táctiles, memorias USB, tarjetas de red e impresoras multifuncionales.',
        hint: 'Envían y reciben información simultáneamente.'
      }
    ],
    sections: [
      {
        id: '2-1-el-cerebro-y-la-memoria',
        title: '2.1 El Cerebro (CPU) y la Memoria de Trabajo (RAM)',
        content: `Para entender cómo procesa datos una computadora, basta con analizar la relación entre sus dos órganos principales:

### La CPU (Central Processing Unit / Procesador Central)
La CPU es el "cerebro" matemático del computador. Es un microchip microscópico de silicio que ejecuta miles de millones de instrucciones por segundo realizando operaciones aritméticas y decisiones lógicas mediante el ciclo: **Búsqueda (Fetch) $\\to$ Decodificación $\\to$ Ejecución**.
- **Núcleos (Cores):** Son microprocesadores individuales integrados en el mismo chip. Un procesador de 6 u 8 núcleos puede realizar múltiples tareas simultáneamente sin congelarse.
- **Frecuencia (GHz):** La velocidad de reloj a la que el procesador late y procesa ciclos de cálculo.

### La Memoria RAM (Random Access Memory / Memoria de Acceso Aleatorio)
Es la memoria ultrarrápida donde residen el sistema operativo y las aplicaciones que están abiertas en este instante exacto para acceso directo por la CPU.
- **Característica crítica (Volatilidad):** La RAM requiere electricidad constante para retener información. En el segundo en que se apaga el equipo, su contenido desaparece por completo. Si estás redactando un trabajo y se corta la energía antes de guardar en disco, lo que estaba solo en RAM se pierde.`,
        analogy: {
          concept: 'CPU vs. RAM vs. Almacenamiento',
          comparison: 'El Chef, la Mesa de Cocina y la Despensa',
          explanation: 'La CPU es el Chef: rápido y capaz de cortar y cocinar ingredientes a gran velocidad. La RAM es la Mesa de Trabajo: una superficie donde coloca los ingredientes que está usando en este momento. El Disco (Almacenamiento) es la Despensa del fondo: espaciosa para guardar todo para mañana, pero más lenta para ir y volver.'
        },
        imageSrc: '/src/assets/images/hardware_pc_diagram_1791911809797.jpg',
        imageAlt: 'Diagrama didáctico de hardware de computador: Placa Madre, CPU, Memoria RAM y SSD',
        imageCaption: 'Figura 2.1: Arquitectura interna del computador: Placa base, procesador CPU, módulos de memoria RAM y unidad de almacenamiento SSD.',
        callouts: [
          {
            type: 'tip',
            title: '¿Cuánta RAM se recomienda hoy en día?',
            content: 'Para tareas básicas de ofimática y navegación ligera, 8 GB es el punto de partida funcional. Para multitarea fluida con decenas de pestañas de navegador y programas ofimáticos abiertos a la vez, 16 GB es el estándar óptimo actual.'
          }
        ],
        interactiveComponentId: 'hardware-lab'
      },
      {
        id: '2-2-unidades-medida-almacenamiento',
        title: '2.2 Unidades de Medida de Información y Almacenamiento (SSD vs HDD)',
        content: `En informática, toda información (una letra, una foto, una canción) se reduce en última instancia a ceros y unos (**código binario**):

### Escala de Medida de Datos:
1. **Bit (b):** La unidad mínima fundamental (un 0 o un 1; apagado o encendido).
2. **Byte (B):** Conjunto de 8 bits. Un Byte equivale exactamente a **un carácter o letra** (por ejemplo, la letra "A" son 8 bits).
3. **Kilobyte (KB):** 1.024 Bytes. Equivale aproximadamente a una página de texto plano.
4. **Megabyte (MB):** 1.024 KB. Una canción en MP3 pesa entre 4 y 8 MB; una foto de celular de buena calidad pesa entre 2 y 5 MB.
5. **Gigabyte (GB):** 1.024 MB. Una película en alta definición pesa entre 2 y 5 GB. Una memoria USB típica tiene 32 o 64 GB.
6. **Terabyte (TB):** 1.024 GB. Capacidad habitual de discos duros modernos y servidores de respaldo masivo.

### Almacenamiento Permanente: SSD frente a HDD
- **HDD (Hard Disk Drive / Disco Mecánico Tradicional):** Emplea platos magnéticos que giran a miles de revoluciones por minuto con un cabezal de lectura móvil. Es económico para grandes volúmenes pero lento y vulnerable a golpes.
- **SSD (Solid State Drive / Unidad de Estado Sólido):** Utiliza chips de memoria flash sin partes mecánicas móviles. Es entre **5 y 10 veces más rápido** que un HDD tradicional (y hasta 30 veces en formato NVMe PCIe). El computador inicia en 10 segundos en lugar de 2 minutos.`,
        callouts: [
          {
            type: 'curiosity',
            title: 'La regla de oro de la actualización',
            content: 'Si un computador antiguo se siente sumamente lento para encender y abrir archivos, cambiar su viejo disco HDD mecánico por una unidad de estado sólido SSD moderna le devuelve una agilidad equivalente a la de un equipo nuevo sin tener que reemplazar la máquina completa.'
          }
        ]
      },
      {
        id: '2-3-placa-madre-fuente-gpu',
        title: '2.3 Placa Madre, Fuente de Poder, Tarjeta Gráfica y Ergonomía',
        content: `### Placa Madre (Motherboard)
El circuito impreso principal donde se interconectan todos los componentes mediante líneas de cobre llamadas buses de datos. Alberga el zócalo de la CPU, las ranuras para la memoria RAM, los conectores de disco y los puertos externos.

### Fuente de Poder (PSU - Power Supply Unit)
Convierte la corriente alterna del enchufe de pared (110V o 220V) en voltajes bajos y limpios de corriente continua (+12V, +5V, +3.3V) requeridos por los delicados circuitos integrados.

### Tarjeta Gráfica (GPU)
Especializada en procesar millones de polígonos y píxeles en paralelo. Puede ser integrada en el procesador (óptima para ofimática) o dedicada independiente (para diseño 3D, edición de video o renderizado).

### Ergonomía del Puesto de Trabajo:
- **Altura de la pantalla:** El borde superior del monitor debe quedar a la altura de tus ojos para no encorvar el cuello.
- **Distancia visual:** Entre 50 y 70 centímetros de tus ojos.
- **Regla 20-20-20 contra la fatiga ocular:** Cada 20 minutos de uso de pantalla, mira un objeto situado a 20 pies de distancia (unos 6 metros) durante 20 segundos para relajar los músculos del ojo.`,
        callouts: [
          {
            type: 'warning',
            title: 'Advertencia sobre el cuidado postural',
            content: 'Pasar horas frente a una laptop apoyada directamente sobre las piernas genera dolor cervical y reduce la ventilación del equipo. Utiliza una base elevadora y un teclado/ratón externo siempre que trabajes durante períodos prolongados.'
          }
        ]
      },
      {
        id: '2-4-clasificacion-perifericos-puertos',
        title: '2.4 Clasificación de Periféricos y Puertos de Conexión',
        content: `Los **periféricos** son los dispositivos auxiliares externos que posibilitan la comunicación entre el usuario y la computadora.

### Clasificación Canónica:
1. **Entrada:** Ingresan datos hacia la computadora (Teclado, Ratón, Micrófono, Escáner, Cámara web).
2. **Salida:** Proyectan o emiten resultados procesados hacia el usuario (Monitor, Altavoces, Impresora, Proyector).
3. **Mixtos:** Transfieren datos en ambos sentidos (Pantalla táctil, Memorias USB, Tarjetas de red Wi-Fi/Ethernet, Impresoras multifuncionales).`,
        callouts: [
          {
            type: 'tip',
            title: 'Inspección de Conectores',
            content: 'Revisa en el siguiente laboratorio interactivo las diferencias de forma y velocidad entre USB-A, USB-C, HDMI, RJ-45 y Jack de audio.'
          }
        ],
        interactiveComponentId: 'ports-lab'
      }
    ],
    practicalWorkshop: {
      title: 'Taller Práctico de Hardware: Auditoría de Especificaciones de tu Equipo',
      description: 'Aprenderás a consultar en Windows las características técnicas reales instaladas en tu equipo (procesador, memoria RAM y almacenamiento) sin desarmar físicamente la máquina.',
      steps: [
        {
          step: 1,
          instruction: 'Abrir el Administrador de Tareas',
          detail: 'Presiona en tu teclado la combinación Ctrl + Shift + Esc. Si se abre en vista compacta, haz clic en "Más detalles" en la esquina inferior.',
          expectedResult: 'Apertura de la herramienta de monitoreo del sistema operativo.'
        },
        {
          step: 2,
          instruction: 'Examinar la pestaña Rendimiento',
          detail: 'Haz clic en la pestaña "Rendimiento". Consulta la gráfica de CPU (anota el modelo y los núcleos), la gráfica de Memoria (anota la cantidad de GB totales y cuántos están en uso) y la gráfica de Disco (anota si es SSD o HDD).',
          expectedResult: 'Identificación clara de los 3 pilares del hardware personal.'
        },
        {
          step: 3,
          instruction: 'Elaborar la ficha técnica de tu equipo',
          detail: 'Abre un bloc de notas o procesador de texto y redacta la ficha técnica: Modelo de Procesador, GB de memoria RAM, Tipo y capacidad de disco, y versión del Sistema Operativo.',
          expectedResult: 'Ficha técnica formal completada.'
        }
      ],
      deliverable: 'Ficha técnica de 4 puntos con los componentes de tu equipo.'
    },
    quiz: [
      {
        id: 'q2-1',
        question: '¿Qué ocurre con los datos almacenados en la memoria RAM al apagar completamente el computador?',
        options: [
          'Se guardan permanentemente en la placa madre.',
          'Se borran por completo, ya que la memoria RAM es volátil y requiere energía para retener información.',
          'Se transfieren de forma automática a una memoria USB conectada.',
          'Se envían a la papelera de reciclaje de Windows.'
        ],
        correctAnswer: 1,
        explanation: 'La memoria RAM es volátil; al interrumpirse el suministro eléctrico, los transistores se descargan y los datos se pierden si no fueron guardados en almacenamiento permanente.'
      },
      {
        id: 'q2-2',
        question: '¿A cuántos Bytes equivale exactamente 1 Kilobyte en la arquitectura de cómputo tradicional?',
        options: [
          'A 100 Bytes exactos.',
          'A 1.000 Bytes.',
          'A 1.024 Bytes.',
          'A 10.000 Bytes.'
        ],
        correctAnswer: 2,
        explanation: 'Debido a la naturaleza binaria de las computadoras (potencias de 2), 1 Kilobyte son 2^10 = 1.024 Bytes.'
      },
      {
        id: 'q2-3',
        question: '¿Cuál es la principal ventaja técnica de un disco de estado sólido (SSD) frente a un disco mecánico (HDD)?',
        options: [
          'Es más pesado y voluminoso.',
          'No posee partes mecánicas móviles y ofrece velocidades de lectura/escritura muy superiores.',
          'Puede funcionar sin estar conectado a la placa madre.',
          'Es magnético y utiliza agujas giratorias.'
        ],
        correctAnswer: 1,
        explanation: 'Los SSD emplean memoria flash no volátil sin piezas móviles, lo que elimina el retraso de giro y lectura mecánica de los HDD tradicionales.'
      }
    ],
    reviewSummary: [
      'La CPU ejecuta las instrucciones del sistema calculando operaciones lógicas y matemáticas.',
      'La memoria RAM es rápida y volátil: sostiene las aplicaciones activas en tiempo real.',
      'El almacenamiento (SSD / HDD) preserva los datos de manera permanente sin depender de energía.',
      '1 Byte = 8 bits; 1 KB = 1.024 Bytes; 1 MB = 1.024 KB; 1 GB = 1.024 MB.',
      'Los periféricos se dividen en entrada (capturan datos), salida (los proyectan) y mixtos (ambas funciones).',
      'La ergonomía y la regla 20-20-20 previenen lesiones musculoesqueléticas y fatiga visual.'
    ]
  },
  {
    id: 'unidad-3',
    unitNumber: 3,
    title: 'Suite Ofimática Esencial: Texto, Hojas de Cálculo y Presentaciones',
    subtitle: 'Estructuración formal de documentos, fórmulas dinámicas analíticas y comunicación visual sobria',
    level: 'Nivel Básico a Intermedio',
    summary: 'La ofimática es el estándar universal de productividad laboral y académica. Esta unidad profundiza en los tres pilares fundamentales: procesadores de texto (Word/Docs) con estilos de encabezado, tablas e índices; hojas de cálculo (Excel/Sheets) con tipos de datos, referencias relativas/absolutas y fórmulas esenciales (=SUMA, =PROMEDIO, =CONTAR, =SI, =BUSCARV); y presentaciones visuales efectivas bajo la regla 6x6.',
    learningObjectives: [
      'Estructurar documentos de texto con jerarquía semántica (Estilos H1, H2, H3), sangrías, márgenes formales y exportación profesional a PDF.',
      'Diseñar hojas de cálculo ordenadas reconociendo tipos de datos (número, texto, fecha, moneda) y la diferencia entre referencias relativas (A1) y absolutas ($A$1).',
      'Aplicar con destreza fórmulas analíticas clave: SUMA, PROMEDIO, CONTAR, SI condicional y BUSCARV/BUSCARX.',
      'Crear presentaciones claras aplicando la regla 6x6, evitando la sobrecarga de texto y seleccionando tipografías de alto contraste.',
      'Aprovechar la edición colaborativa simultánea y el control de versiones en plataformas en la nube.'
    ],
    flashcards: [
      {
        front: '¿Por qué toda fórmula en una hoja de cálculo debe iniciar con el signo igual (=)?',
        back: 'Porque el signo igual le indica al programa que los caracteres siguientes son una operación matemática o función evaluable, y no simple texto plano.',
        hint: 'Sin él, Excel escribe la fórmula tal cual sin calcular nada.'
      },
      {
        front: '¿Qué significa el símbolo de pesos ($) en una fórmula como $A$1?',
        back: 'Crea una referencia absoluta que bloquea la celda (columna A y fila 1) para que no cambie al arrastrar o copiar la fórmula a otras celdas.',
        hint: 'Fija o congela la celda de referencia.'
      },
      {
        front: '¿Qué ventaja tiene usar Estilos de Título (H1, H2) en Word frente a cambiar el tamaño manualmente?',
        back: 'Permite generar la Tabla de Contenido (Índice) automáticamente con un clic, navegar por el panel de esquema y aplicar formatos globales uniformes.',
        hint: 'Estructura semántica del documento.'
      },
      {
        front: '¿En qué consiste la regla 6x6 para presentaciones?',
        back: 'En no colocar más de 6 líneas de texto por diapositiva y no más de 6 palabras por línea, priorizando ideas fuerza para que la audiencia atienda al expositor.',
        hint: 'Evita la diapositiva enciclopedia.'
      }
    ],
    sections: [
      {
        id: '3-1-procesador-de-texto',
        title: '3.1 Procesador de Texto: Estructuración Semántica, Estilos y Formato Profesional',
        content: `Un procesador de texto (Microsoft Word, Google Docs) es mucho más que una máquina de escribir digital. Su valor fundamental radica en la **estructuración del contenido**:

### Estilos de Encabezado (Título 1, Título 2, Título 3)
El error más común de un principiante es seleccionar un título, ponerlo en negrita y subirle el tamaño manualmente a 18pt.
La forma profesional es aplicar la herramienta de **Estilos**:
- **Título 1 (H1):** Para el título general del documento o capítulos principales.
- **Título 2 (H2):** Para subtítulos o secciones dentro de un capítulo.
- **Título 3 (H3):** Para apartados específicos.
*Ventaja:* Al usar Estilos, el procesador puede generar automáticamente una **Tabla de Contenido (Índice)** con un solo clic, y el lector puede navegar por el panel de esquema.

### Interlineado, Márgenes y Párrafos
- Para documentos formales o académicos (normas APA / Icontec), el interlineado recomendado suele ser de 1.5 o doble, con márgenes estándar de 2.5 cm en los cuatro lados.
- Utiliza la alineación a la izquierda o justificada con criterio editorial, cuidando que no queden "ríos de espacio blanco" entre palabras.

### Exportación a PDF (Portable Document Format)
Cuando envíes un trabajo final, un currículum o una cotización a un cliente o colega, **nunca envíes el archivo editable en .docx a menos que te lo soliciten expresamente**. 
Exporta a **PDF**: el PDF bloquea el diseño para que se vea idéntico en cualquier dispositivo, sin importar qué fuentes o versión de software tenga el receptor.`,
        callouts: [
          {
            type: 'tip',
            title: 'Atajo Pro en Word: Guardar como PDF al instante',
            content: 'En Microsoft Word en Windows, presiona la tecla de función F12 para abrir el cuadro de diálogo Guardar como, y en el tipo de archivo selecciona directamente "PDF (*.pdf)".'
          }
        ]
      },
      {
        id: '3-2-hojas-de-calculo-formulas',
        title: '3.2 Hojas de Cálculo: Referencias Relativas/Absolutas y Fórmulas Indispensables',
        content: `Una hoja de cálculo (Excel, Google Sheets) es una cuadrícula compuesta por **Columnas** (identificadas con letras: A, B, C...) y **Filas** (identificadas con números: 1, 2, 3...). La intersección de una columna y una fila se llama **Celda** (por ejemplo, B4 es la celda en columna B, fila 4).

### Regla de Oro de las Hojas de Cálculo:
Toda fórmula o cálculo matemático **DEBE INICIAR SIEMPRE CON EL SIGNO IGUAL (=)**. Si no escribes el signo igual, el programa interpretará lo que escribas como simple texto estático.

### Referencias Relativas vs. Absolutas (El signo $):
- **Referencia Relativa (\`B2\`):** Si copias la fórmula una fila hacia abajo, se ajusta automáticamente a \`B3\`.
- **Referencia Absoluta (\`$B$2\`):** Bloquea la fila y columna. Aunque arrastres la fórmula hacia abajo o a la derecha, seguirá apuntando fijamente a la celda B2 (ideal para valores constantes como un porcentaje de impuesto o tipo de cambio). En Windows, presiona la tecla **F4** mientras editas una celda para alternar los signos de pesos rápidamente.

### Fórmulas Esenciales:
1. **Suma:** \`=SUMA(B2:B10)\` suma el rango contiguo.
2. **Promedio:** \`=PROMEDIO(C2:C25)\` calcula la media aritmética.
3. **Contar:** \`=CONTAR(A2:A50)\` cuenta celdas con valores numéricos.
4. **Función Condicional SI:** \`=SI(D2>=70, "Aprobado", "Reprobado")\` evalúa una condición lógica.
5. **Función BUSCARV (VLOOKUP):** \`=BUSCARV(valor_buscado, matriz_tabla, columna, 0)\` busca un dato en la primera columna y extrae su valor asociado.`,
        analogy: {
          concept: 'Las referencias de celdas en fórmulas',
          comparison: 'El casillero de correos o la caja de zapatos con etiqueta',
          explanation: 'Cuando escribes =B2+C2, no estás sumando el valor fijo 5 + 10, sino diciendo: "Ve al casillero B2, toma lo que haya adentro, y súmalo con lo que esté en el casillero C2". Si mañana cambias el contenido del casillero B2, la suma se actualiza automáticamente.'
        },
        callouts: [
          {
            type: 'warning',
            title: 'Error común con números formateados como texto',
            content: 'Si una suma te da 0 a pesar de tener números visibles, revisa el formato de las celdas. Si tienen un apóstrofe al inicio (\'100) o están alineadas a la izquierda por defecto, la hoja de cálculo las considera texto y no las sumará.'
          }
        ],
        interactiveComponentId: 'spreadsheet-lab'
      },
      {
        id: '3-3-presentaciones-efectivas',
        title: '3.3 Presentaciones Efectivas: Narrativa Visual y la Regla 6x6',
        content: `Una presentación de diapositivas (PowerPoint, Google Slides, Canva) es una **ayuda visual para la audiencia**, no el teleprompter personal del expositor.

### Errores Críticos que Debes Evitar:
1. **La "Diapositiva Enciclopedia":** Llenar la pantalla con 5 párrafos de texto denso. Cuando pones mucho texto, el público tiene que elegir entre leer la pantalla o escucharte a ti, y terminará haciendo ninguna de las dos cosas bien.
2. **El "Arcoíris Tipográfico":** Mezclar 5 tipos de letra diferentes con colores fluorescentes que cansan la vista.
3. **Animaciones excesivas:** Transiciones lentas con efectos de giro o rebote que distraen de la idea central.

### Principios de Diseño que Transforman tus Diapositivas:
- **La Regla 6x6:** Como guía orientativa, no más de 6 líneas de texto por diapositiva, y no más de 6 palabras por línea. Prioriza ideas fuerza y palabras clave.
- **Jerarquía visual:** El título debe ser notablemente más grande que el texto secundario, guiando la mirada de arriba hacia abajo.
- **Contraste cromático:** Texto oscuro sobre fondo claro (óptimo para aulas iluminadas) o texto muy claro sobre fondo oscuro (para auditorios con proyector de alta definición). Nunca texto amarillo sobre fondo blanco.
- **Una idea principal por diapositiva:** Es preferible tener 15 diapositivas limpias y ágiles que 3 diapositivas sobrecargadas.`,
        callouts: [
          {
            type: 'tip',
            title: 'Consejo Pro para el expositor',
            content: 'Usa la herramienta "Notas del orador" en PowerPoint o Slides. Escribe allí los datos numéricos y citas textuales para que aparezcan en tu pantalla privada de control mientras el público solo ve la imagen limpia en el proyector.'
          }
        ]
      }
    ],
    practicalWorkshop: {
      title: 'Taller Práctico de Ofimática: Presupuesto Dinámico e Informe Formal en PDF',
      description: 'Elaborarás una plantilla de presupuesto con fórmulas matemáticas dinámicas en hoja de cálculo y redactarás un documento formal con estilos exportado a PDF.',
      steps: [
        {
          step: 1,
          instruction: 'Construir la tabla en hoja de cálculo',
          detail: 'En una hoja de cálculo nueva, crea una tabla con 4 columnas: Concepto, Categoría, Monto Presupuestado y Monto Real. Introduce 5 filas de gastos cotidianos.',
          expectedResult: 'Tabla limpia con formato de moneda configurado en las celdas numéricas.'
        },
        {
          step: 2,
          instruction: 'Implementar fórmulas automáticas y condicionales',
          detail: 'Aplica =SUMA() en la base para el total. Agrega una columna con la función =SI(D2>C2, "Desviado", "En Rango") para detectar excesos presupuestarios.',
          expectedResult: 'Cálculo y evaluación condicional automáticos.'
        },
        {
          step: 3,
          instruction: 'Estructurar el documento formal y exportar a PDF',
          detail: 'En el procesador de texto aplica Título 1 con Estilos, redacta dos párrafos de análisis, pega la tabla resumen y exporta el archivo en formato PDF.',
          expectedResult: 'Documento PDF profesional generado y listo para entrega.'
        }
      ],
      deliverable: 'Archivo PDF del informe formal con la tabla y fórmulas comprobadas.'
    },
    quiz: [
      {
        id: 'q3-1',
        question: '¿Por qué es indispensable comenzar una fórmula en una hoja de cálculo con el signo igual (=)?',
        options: [
          'Porque cambia el color de la celda a verde.',
          'Porque le indica al programa que los caracteres siguientes deben ser calculados matemáticamente y no tratados como texto.',
          'Porque de lo contrario se apaga el equipo.',
          'Solo se usa en hojas de pago, no en gratuitas.'
        ],
        correctAnswer: 1,
        explanation: 'El signo igual es el operador disparador que activa el motor de cálculo de expresiones y funciones en hojas de cálculo.'
      },
      {
        id: 'q3-2',
        question: 'Si en la celda A1 tienes la nota 85 y escribes la fórmula =SI(A1>=70, "Aprobado", "Reprobado"), ¿qué resultado mostrará la celda?',
        options: [
          'Reprobado',
          'ERROR #VALOR',
          'Aprobado',
          '=SI(A1>=70, "Aprobado", "Reprobado")'
        ],
        correctAnswer: 2,
        explanation: 'La condición lógica (85 >= 70) es verdadera, por lo que la función devuelve el segundo argumento: "Aprobado".'
      },
      {
        id: 'q3-3',
        question: '¿Qué objetivo persigue la "Regla 6x6" en el diseño de diapositivas?',
        options: [
          'Obligar a que la exposición dure exactamente 36 minutos.',
          'Asegurar la síntesis visual para que la audiencia preste atención al expositor y no se agote leyendo párrafos enteros.',
          'Hacer que el archivo pese menos de 6 megabytes.',
          'Imprimir 6 diapositivas por hoja obligatoriamente.'
        ],
        correctAnswer: 1,
        explanation: 'La regla 6x6 promueve la claridad visual y evita convertir la diapositiva en un documento de lectura denso.'
      }
    ],
    reviewSummary: [
      'Los estilos de título en procesadores de texto estructuran el documento y posibilitan índices automáticos.',
      'Exportar a PDF garantiza la fidelidad visual inalterable en cualquier dispositivo receptor.',
      'Toda fórmula en hoja de cálculo inicia con el signo igual (=) y referencia celdas dinámicas.',
      'Las referencias absolutas ($A$1) fijan celdas constantes al arrastrar fórmulas.',
      'Funciones clave: SUMA, PROMEDIO, CONTAR y la condicional SI resuelven el 90% de problemas cotidianos de datos.',
      'Las diapositivas efectivas comunican una sola idea clara por pantalla con mínimo texto y máximo contraste visual.'
    ]
  },
  {
    id: 'unidad-4',
    unitNumber: 4,
    title: 'Uso de Herramientas y Aplicaciones en el Teléfono Celular',
    subtitle: 'El smartphone como oficina de bolsillo: escaneo inteligente, sincronización y seguridad móvil',
    level: 'Nivel Básico a Intermedio',
    summary: 'El teléfono celular inteligente es la computadora más accesible y utilizada en el mundo actual. Esta unidad enseña a transformar el dispositivo móvil en un centro de productividad: escaneo profesional de documentos físicos a PDF multipágina, sincronización selectiva en la nube por Wi-Fi, gestión de la memoria interna, bienestar digital y auditoría de permisos de privacidad.',
    learningObjectives: [
      'Gestionar la estructura de carpetas y descargas en sistemas operativos móviles Android e iOS.',
      'Digitalizar documentos físicos mediante la cámara del móvil generando PDFs multipágina recortados y de alto contraste.',
      'Configurar la sincronización automática en la nube (Drive, OneDrive, Fotos) optimizando el consumo de datos móviles.',
      'Auditar y revocar permisos innecesarios de aplicaciones (cámara, micrófono, ubicación en segundo plano).',
      'Implementar hábitos de bienestar digital, control de notificaciones y protección de batería.'
    ],
    flashcards: [
      {
        front: '¿Cómo digitalizar un documento de varias páginas en un único PDF con el celular?',
        back: 'Usando la función "Escanear" de Google Drive, Microsoft Lens o Notas de iOS, usando el botón "+" de agregar página antes de guardar el archivo.',
        hint: 'Evita enviar 5 fotos sueltas e inclinadas.'
      },
      {
        front: '¿Cuál es la configuración más segura para el permiso de ubicación en el celular?',
        back: 'Configurar "Permitir solo mientras la aplicación está en uso", impidiendo que rastree tus coordenadas en segundo plano cuando no la necesitas.',
        hint: 'Nunca "Permitir siempre".'
      },
      {
        front: '¿Cómo proteger la vida útil de la batería del smartphone?',
        back: 'Manteniendo la carga habitualmente entre el 20% y el 80%, evitando que se descargue a 0% con frecuencia y protegiéndolo de fuentes directas de calor.',
        hint: 'Evita los extremos térmicos y de descarga.'
      },
      {
        front: '¿Por qué debe configurarse la copia de seguridad de fotos solo mediante Wi-Fi?',
        back: 'Para evitar que la sincronización de videos y fotos pesadas consuma el plan de datos móviles de tu tarifa telefónica.',
        hint: 'Protege tus megabytes móviles.'
      }
    ],
    sections: [
      {
        id: '4-1-gestion-archivos-movil',
        title: '4.1 El Teléfono como Oficina Portátil y Gestión de Archivos',
        content: `Un teléfono inteligente moderno posee mayor capacidad de procesamiento que las computadoras que llevaron al ser humano a la Luna. Sin embargo, muchos usuarios lo emplean de manera caótica, acumulando descargas perdidas, fotos duplicadas y memorias colapsadas.

### El Explorador de Archivos en el Celular
Tanto en Android (aplicaciones como "Files de Google" o "Mis Archivos") como en iOS (la app "Archivos"):
- Existe una jerarquía de carpetas análoga a la de una computadora: **Descargas (Download)**, **Documentos**, **Imágenes**, **Audio**.
- Aprender a renombrar archivos antes de compartirlos (por ejemplo, cambiar \`IMG_20261013_WA0023.jpg\` por \`Recibo_Pago_Octubre.jpg\`) previene extravíos y proyecta profesionalismo.

### Liberar Almacenamiento Oculto:
En WhatsApp, ve a **Ajustes > Almacenamiento y datos > Administrar almacenamiento**. Podrás ver qué chats ocupan más gigabytes y eliminar videos pesados reenviados sin perder tus conversaciones de texto.`,
        analogy: {
          concept: 'El almacenamiento del teléfono',
          comparison: 'El bolso o mochila personal',
          explanation: 'Si guardas en tu mochila todos los papeles, folletos y recibos que te dan en la calle sin revisarlos nunca, en poco tiempo no encontrarás las llaves ni la libreta. Limpiar periódicamente la carpeta de Descargas y la papelera del móvil es vaciar los papeles inútiles de tu mochila.'
        },
        imageSrc: '/src/assets/images/ecosistema_movil_cloud_1791911809547.jpg',
        imageAlt: 'Ilustración didáctica de productividad móvil: escaneo con celular y sincronización en la nube',
        imageCaption: 'Figura 4.1: El teléfono celular inteligente conectado con almacenamiento en la nube y herramientas de digitalización de documentos.',
        callouts: [
          {
            type: 'tip',
            title: 'Files de Google para limpieza en dos toques',
            content: 'En dispositivos Android, la herramienta gratuita Files de Google analiza automáticamente memes repetidos, capturas de pantalla antiguas y archivos descargados olvidados para liberar entre 3 y 8 GB de espacio en pocos segundos.'
          }
        ]
      },
      {
        id: '4-2-escaneo-documentos-camara',
        title: '4.2 Escaneo Profesional de Documentos con la Cámara',
        content: `Uno de los errores más comunes al enviar un documento físico por correo o tarea es tomarle una foto normal inclinada, con sombras de la mano, sobre un mantel con platos de fondo y con flash deslumbrante.

### Cómo Escanear Correctamente con el Celular:
Existen aplicaciones gratuitas nativas excelentes: **Google Drive (función Escanear integrada)**, **Microsoft Lens**, **Adobe Scan** o la app de Notas en iPhone.

**Procedimiento paso a paso para un escaneo perfecto:**
1. **Iluminación cenital:** Coloca el papel sobre una superficie plana y despejada con buena luz, evitando que la sombra de tu cuerpo caiga sobre la hoja.
2. **Contraste de fondo:** Si la hoja es blanca, colócala sobre una mesa oscura o de madera. La cámara detectará automáticamente los 4 vértices del papel.
3. **Perspectiva perpendicular:** Sostén el teléfono paralelo a la hoja (mirando desde arriba).
4. **Filtro de documento:** La app aclarará el fondo blanco y aumentará el contraste del texto para que parezca una fotocopia láser.
5. **Añadir páginas al mismo archivo (+):** Si el documento tiene 3 páginas, presiona el botón "+" en la misma sesión para compilar **un único archivo PDF**, en lugar de enviar 3 imágenes separadas.`,
        callouts: [
          {
            type: 'tip',
            title: 'Google Drive ya tiene escáner incorporado',
            content: 'No necesitas instalar aplicaciones sospechosas llenas de publicidad. En Android o iOS, abre Google Drive, toca el botón "+" y selecciona "Escanear". El PDF se guardará directamente en tu carpeta de Drive.'
          }
        ]
      },
      {
        id: '4-3-sincronizacion-nube-seguridad-movil',
        title: '4.3 Sincronización en la Nube y Auditoría de Permisos',
        content: `### Sincronización Inteligente:
Configura tus aplicaciones de nube (Google Fotos, OneDrive, iCloud) para que realicen copias de seguridad:
- **Solo mediante Wi-Fi:** Para no consumir tu paquete de datos móviles en planes limitados.
- **Solo cuando el dispositivo esté cargando:** Para no agotar la batería durante el día de trabajo.

### Auditoría Crítica de Permisos de Aplicaciones:
Cuando instalas un juego sencillo o una calculadora, muchas aplicaciones solicitan permisos abusivos para espiar tus hábitos y vender tu perfil publicitario.
- **¿Por qué una app de linterna necesitaría acceso a tus contactos o a tu ubicación en tiempo real?** No lo necesita.
- **Acceso a Ubicación:** Configúralo siempre en "Permitir solo mientras la app está en uso", nunca "Permitir siempre en segundo plano".
- **Cámara y Micrófono:** Revisa periódicamente en Ajustes > Privacidad > Administrador de Permisos qué aplicaciones tienen autorización activa para activar el micrófono.`,
        callouts: [
          {
            type: 'warning',
            title: 'Advertencia de Ciberseguridad: Cuidado con las redes Wi-Fi públicas',
            content: 'En cafeterías, aeropuertos o plazas públicas, nunca ingreses a tu banca virtual ni realices compras con tarjeta conectado a redes Wi-Fi abiertas sin contraseña. Cualquier usuario en la misma red podría interceptar el tráfico no cifrado.'
          }
        ]
      }
    ],
    practicalWorkshop: {
      title: 'Taller Práctico Móvil: Digitalización de Documento y Auditoría de Permisos',
      description: 'Digitalizarás un documento físico de al menos dos páginas en un único archivo PDF con corrección de bordes y auditarás los permisos de privacidad de tu teléfono.',
      steps: [
        {
          step: 1,
          instruction: 'Escanear un documento físico de 2 páginas',
          detail: 'Toma dos páginas de apuntes, una factura o un documento. Con Google Drive o Microsoft Lens, escanea ambas páginas. Asegúrate de recortar los bordes y aplicar el filtro de documento.',
          expectedResult: 'Documento PDF multipágina limpio y perfectamente legible.'
        },
        {
          step: 2,
          instruction: 'Renombrar y guardar en la Nube',
          detail: 'Guarda el archivo resultante con el nombre exacto: "Documento_Escaneado_Practica.pdf" dentro de tu carpeta de almacenamiento en la nube.',
          expectedResult: 'Archivo PDF correctamente nombrado y disponible en la nube.'
        },
        {
          step: 3,
          instruction: 'Auditar permisos de micrófono y ubicación',
          detail: 'En tu teléfono ve a Ajustes > Privacidad / Seguridad > Administrador de permisos. Revisa la lista de apps con acceso al Micrófono y revoca los que resulten sospechosos o innecesarios.',
          expectedResult: 'Control pleno de la privacidad de tu dispositivo.'
        }
      ],
      deliverable: 'El archivo PDF de dos páginas escaneado profesionalmente desde el teléfono celular.'
    },
    quiz: [
      {
        id: 'q4-1',
        question: '¿Cuál es la principal ventaja de utilizar una app de escaneo (como Drive o Lens) en lugar de una foto común con la cámara?',
        options: [
          'La app de escaneo hace que el celular no gaste batería nunca.',
          'Detecta bordes automáticamente, endereza la perspectiva, aumenta el contraste de lectura y agrupa múltiples páginas en un solo PDF.',
          'Elimina la necesidad de tener pantalla en el teléfono.',
          'Permite imprimir dinero en casa de forma legal.'
        ],
        correctAnswer: 1,
        explanation: 'Las aplicaciones de escaneo aplican algoritmos de visión por computador para corregir el ángulo oblicuo, aclarar el fondo y compilar las páginas en un archivo PDF uniforme.'
      },
      {
        id: 'q4-2',
        question: '¿Cuál es la configuración más segura para el permiso de ubicación de una aplicación de mapas o transporte?',
        options: [
          'Permitir siempre, incluso cuando la pantalla esté apagada y la app cerrada.',
          'Permitir solo mientras la aplicación está en uso.',
          'Desactivar la pantalla del celular para siempre.',
          'Compartir la ubicación públicamente en redes sociales.'
        ],
        correctAnswer: 1,
        explanation: 'Configurar el permiso en "Solo mientras la app está en uso" garantiza que la app solo acceda a las coordenadas GPS cuando el usuario la necesita expresamente para navegar.'
      },
      {
        id: 'q4-3',
        question: 'Para evitar agotar tu plan de datos móviles al hacer copias de seguridad de fotos y videos, ¿qué ajuste debes activar?',
        options: [
          'Activar la opción "Hacer copias de seguridad solo mediante conexión Wi-Fi".',
          'Eliminar todas las fotos antes de dormir.',
          'Poner el teléfono en modo avión permanentemente.',
          'Cambiar de número de teléfono mensualmente.'
        ],
        correctAnswer: 0,
        explanation: 'Limitar la sincronización de archivos pesados exclusivamente a redes Wi-Fi resguarda la cuota de megabytes del plan de datos celulares.'
      }
    ],
    reviewSummary: [
      'Un teléfono bien organizado con carpetas y nombres claros ahorra tiempo y previene pérdidas.',
      'El escaneo profesional corrige perspectiva, mejora el contraste y genera un único PDF ordenado.',
      'La sincronización en la nube debe configurarse solo con Wi-Fi para proteger el plan de datos.',
      'La auditoría de permisos de cámara, micrófono y GPS es esencial para la privacidad personal.',
      'Los modos de concentración y bienestar digital previenen la sobrecarga cognitiva y la distracción.'
    ]
  },
  {
    id: 'unidad-5',
    unitNumber: 5,
    title: 'Herramientas de Inteligencia Artificial Básica y su Uso Responsable',
    subtitle: 'Comprender los modelos de lenguaje, el arte del prompting pedagógico y los principios éticos',
    level: 'Nivel Intermedio',
    summary: 'La Inteligencia Artificial se ha transformado en un asistente de productividad accesible para todos. En esta unidad desmitificamos la IA generativa, aprendemos la estructura de un prompt profesional (Rol + Contexto + Tarea + Formato + Restricciones) y abordamos de frente las alucinaciones, la privacidad y la ética digital.',
    learningObjectives: [
      'Comprender qué es un Modelo de Lenguaje Grande (LLM) y cómo predice texto probabilísticamente sin tener consciencia humana.',
      'Diferenciar las principales herramientas de IA generativa actuales (Google Gemini, ChatGPT, Microsoft Copilot).',
      'Formular instrucciones efectivas (prompts) utilizando la estructura estructurada: Rol, Contexto, Tarea, Formato y Restricciones.',
      'Identificar y verificar críticamente "alucinaciones" (datos inventados o erróneos por parte del modelo).',
      'Aplicar principios de uso responsable: confidencialidad de datos privados, honestidad académica y prevención del plagio.'
    ],
    flashcards: [
      {
        front: '¿Qué es un LLM (Modelo de Lenguaje Grande)?',
        back: 'Una red neuronal avanzada entrenada con grandes volúmenes de texto que predice la continuación lingüística más probable ante una solicitud del usuario.',
        hint: 'Predicción probabilística de lenguaje.'
      },
      {
        front: '¿Qué componentes integran la fórmula de prompting R-C-T-F-R?',
        back: 'Rol (quién actúa), Contexto (la situación), Tarea (la acción concreta), Formato (cómo debe responder) y Restricciones (límites de extensión o vocabulario).',
        hint: 'Fórmula de 5 componentes.'
      },
      {
        front: '¿Qué es una "alucinación" en una inteligencia artificial?',
        back: 'Ocurre cuando el modelo genera una respuesta convincente y bien redactada pero que resulta ser un dato falso, inventado o históricamente erróneo.',
        hint: 'Respuesta verosímil pero falsa.'
      },
      {
        front: '¿Por qué nunca se deben ingresar datos confidenciales a una IA pública?',
        back: 'Porque los datos ingresados pueden ser utilizados para reentrenar futuros modelos o ser revisados por moderadores humanos, comprometiendo el secreto profesional.',
        hint: 'Regla de privacidad y secreto de datos.'
      }
    ],
    sections: [
      {
        id: '5-1-que-es-la-ia-generativa',
        title: '5.1 ¿Qué es la Inteligencia Artificial Generativa y cómo funciona?',
        content: `La **Inteligencia Artificial Generativa** es una rama de la informática que crea contenido nuevo —texto, imágenes, código de programación, resúmenes, traducciones— a partir de patrones aprendidos de millones de datos previos.

Los sistemas más conocidos para texto son los **Modelos de Lenguaje Grande (LLMs - Large Language Models)**, tales como Google Gemini, OpenAI ChatGPT o Microsoft Copilot.

### ¿Cómo piensa realmente un LLM?
Es vital desmitificar la IA: **la IA no es un cerebro humano con sentimientos, intenciones ni conciencia**. 
Un LLM es un modelo matemático extremadamente sofisticado entrenado con miles de millones de textos que calcula: 
*"Dado el texto que me acaba de dar el usuario, ¿cuál es la palabra o frase estadísticamente más coherente y adecuada que debe seguir a continuación?"*

Debido a esto, la IA puede redactar un poema conmovedor o explicar la fotosíntesis con maestría, pero no "sabe" lo que es una flor ni comprende la vida como un ser humano.`,
        analogy: {
          concept: 'El funcionamiento de un LLM',
          comparison: 'El autocompletar predictivo del teclado del celular, pero con superpoderes',
          explanation: 'Cuando escribes en tu celular "Hola, ¿cómo..." y el teclado te sugiere "estás?", está usando predicción de probabilidad. Un modelo de IA como Gemini hace lo mismo, pero analizando bibliotecas enteras de conocimiento simultáneamente para predecir oraciones completas y razonamientos estructurados.'
        },
        callouts: [
          {
            type: 'curiosity',
            title: '¿De dónde vienen Gemini y Copilot?',
            content: 'Google Gemini está integrado con el ecosistema de Google (Drive, Gmail, YouTube, Búsqueda). Microsoft Copilot se integra con Windows, Office 365 y el navegador Edge. ChatGPT es el modelo conversacional pionero desarrollado por OpenAI.'
          }
        ]
      },
      {
        id: '5-2-el-arte-del-prompting',
        title: '5.2 El Arte del Prompting Efectivo: La Fórmula R-C-T-F-R',
        content: `Un **Prompt** es la instrucción, pregunta o petición que el usuario escribe a la inteligencia artificial. La calidad de la respuesta depende directamente de la claridad y precisión de tu prompt (*"Entra basura, sale basura"*).

### Comparativa: Prompt Pobre vs. Prompt Profesional:
- ❌ **Prompt pobre y vago:** *"Escríbeme algo sobre las plantas para mi clase."*
  - *Resultado:* Texto genérico, quizás infantil o excesivamente técnico, sin saber a qué nivel apuntar.
- ✅ **Prompt con estructura R-C-T-F-R:**
  - **R (Rol):** "Actúa como un profesor de ciencias naturales de educación secundaria."
  - **C (Contexto):** "Mis alumnos tienen entre 12 y 13 años y estamos iniciando la unidad de botánica en clima templado."
  - **T (Tarea):** "Explica el proceso de la fotosíntesis mediante una analogía con una fábrica de cocina."
  - **F (Formato):** "Presenta la respuesta en 3 secciones cortas con viñetas y un glosario final de 4 términos clave."
  - **R (Restricciones):** "No uses más de 300 palabras y evita jerga bioquímica compleja."

Al aplicar esta fórmula, la IA ajusta su tono, profundidad y vocabulario a tu necesidad exacta.`,
        callouts: [
          {
            type: 'tip',
            title: 'Consejo Pro: La técnica de conversación iterativa',
            content: 'No esperes que el primer prompt sea perfecto. Si la respuesta fue muy larga, dile a la IA en el siguiente mensaje: "Muy bien, ahora resume la sección 2 a la mitad y añade un ejemplo cotidiano". Trabaja con la IA en diálogo continuo.'
          }
        ],
        interactiveComponentId: 'prompt-lab'
      },
      {
        id: '5-3-alucinaciones-y-uso-etico',
        title: '5.3 Limitaciones Cruciales: Alucinaciones, Privacidad y Ética',
        content: `Para usar la inteligencia artificial de manera verdaderamente inteligente, debes conocer sus dos mayores riesgos:

### 1. Las "Alucinaciones" de la IA:
Ocurre cuando la IA responde con total seguridad, elocuencia y convencimiento a una pregunta, pero la información que brinda es **completamente falsa o inventada**. 
Puede citar artículos científicos con autores inventados, leyes que no existen o fechas históricas equivocadas.
- **Regla de Oro:** *Nunca uses un dato numérico, cita bibliográfica o hecho legal proporcionado por una IA sin verificarlo previamente en una fuente oficial primaria (un libro, sitio web institucional o documento legal real).*

### 2. Privacidad de Datos y Confidencialidad:
Los servicios comerciales de IA utilizan las conversaciones ingresadas para seguir entrenando a sus modelos (a menos que uses cuentas empresariales con políticas de no retención).
- **PROHIBIDO ingresar a una IA pública:**
  - Nombres completos de clientes o pacientes con diagnósticos médicos.
  - Números de tarjetas bancarias, contraseñas o documentos de identidad.
  - Secretos industriales o planes financieros internos de tu empresa.

### 3. Ética y Honestidad Académica:
Usar la IA como tutora para entender un concepto difícil, generar ideas de lluvia de ideas o corregir tu ortografía es un uso constructivo. Copiar y pegar un ensayo completo fingiendo que fue escrito por ti anula tu propio desarrollo intelectual.`,
        callouts: [
          {
            type: 'warning',
            title: 'Advertencia de Privacidad: Anonimiza siempre la información',
            content: 'Si quieres pedirle a la IA que te ayude a redactar una carta a un cliente, reemplaza su nombre real por "Empresa X" o "Cliente A". Protege siempre los datos de terceros.'
          }
        ]
      }
    ],
    practicalWorkshop: {
      title: 'Taller Práctico de IA: Diseño de Prompt Estructurado y Verificación Factual',
      description: 'Diseñarás un prompt estructurado de alta calidad aplicando la fórmula R-C-T-F-R, probarás la consulta y verificarás la exactitud de un dato en fuentes primarias.',
      steps: [
        {
          step: 1,
          instruction: 'Diseñar el prompt con la fórmula completa',
          detail: 'Elige un tema de interés. Redacta un prompt en el simulador o en tu editor que contenga los 5 componentes: Rol, Contexto, Tarea, Formato y Restricciones.',
          expectedResult: 'Prompt robusto con especificaciones precisas.'
        },
        {
          step: 2,
          instruction: 'Probar la consulta en una herramienta de IA',
          detail: 'Copia tu prompt y pruébalo en Google Gemini o ChatGPT. Analiza si la respuesta se ciñó a las restricciones establecidas.',
          expectedResult: 'Respuesta estructurada y sin digresiones.'
        },
        {
          step: 3,
          instruction: 'Verificación de fuentes y análisis crítico',
          detail: 'Identifica una afirmación o fecha provista por la IA y búscalo en una enciclopedia o sitio oficial para validar su veracidad.',
          expectedResult: 'Comprobación de la ausencia de alucinaciones.'
        }
      ],
      deliverable: 'El prompt estructurado y el resultado de la verificación del dato consultado.'
    },
    quiz: [
      {
        id: 'q5-1',
        question: '¿Qué significa el término "alucinación" en el contexto de los modelos de inteligencia artificial generativa?',
        options: [
          'Que la computadora emite colores brillantes en la pantalla.',
          'Que el modelo genera respuestas que suenan convincentes y bien redactadas pero son fácticamente falsas o inventadas.',
          'Que la inteligencia artificial se niega a responder porque está cansada.',
          'Que el usuario tiene un virus en su teclado.'
        ],
        correctAnswer: 1,
        explanation: 'Las alucinaciones son errores en los que el modelo predice texto gramaticalmente plausible pero carente de veracidad factual en el mundo real.'
      },
      {
        id: 'q5-2',
        question: 'En la fórmula de prompting R-C-T-F-R, ¿qué elemento corresponde a la letra "R" inicial?',
        options: [
          'Reinicio del computador',
          'Rol (la identidad o perspectiva experta que debe asumir la IA)',
          'Red inalámbrica de conexión',
          'Ruta de guardado en el disco'
        ],
        correctAnswer: 1,
        explanation: 'El Rol le asigna a la IA una perspectiva experta concreta (ej. "Actúa como docente de secundaria", "Actúa como auditor contable"), afinando su vocabulario y enfoque.'
      },
      {
        id: 'q5-3',
        question: '¿Por qué NUNCA se deben ingresar contraseñas, números de cuenta o datos de pacientes a una IA pública gratuita?',
        options: [
          'Porque la IA no sabe leer números.',
          'Porque los datos pueden ser almacenados en servidores remotos y utilizados para reentrenar modelos o revisados por moderadores humanos.',
          'Porque la IA cobra 10 dólares por cada número ingresado.',
          'Porque el teléfono se bloquea automáticamente por 24 horas.'
        ],
        correctAnswer: 1,
        explanation: 'En las plataformas públicas no protegidas por convenios corporativos de confidencialidad, las consultas pueden ser almacenadas y procesadas comprometiendo la privacidad de datos sensibles.'
      }
    ],
    reviewSummary: [
      'Los modelos de lenguaje generan texto mediante predicción probabilística, no por conciencia humana.',
      'La estructura R-C-T-F-R (Rol, Contexto, Tarea, Formato, Restricciones) optimiza radicalmente los resultados.',
      'Las alucinaciones obligan al usuario a ser el editor responsable y verificar siempre las fuentes primarias.',
      'La privacidad es sagrada: nunca compartir datos financieros, de salud o contraseñas con herramientas públicas.',
      'La IA es un extraordinario copiloto intelectual, pero nunca el sustituto del propio juicio reflexivo.'
    ]
  },
  {
    id: 'unidad-6',
    unitNumber: 6,
    title: 'Ciberseguridad Cotidiana y Trabajo Colaborativo en la Nube',
    subtitle: 'Protección contra fraudes digitales (Phishing), contraseñas robustas, 2FA y sinergia de equipo',
    level: 'Nivel Intermedio',
    summary: 'La mejor herramienta tecnológica pierde su valor si caemos víctimas de una estafa informática. Esta unidad dota al usuario de un escudo de defensa digital: reconocimiento forense de ingeniería social y phishing, uso de contraseñas robustas por frase, doble factor de autenticación (2FA) y gestión colaborativa de permisos (Lector, Comentador, Editor) en la nube.',
    learningObjectives: [
      'Detectar intentos de Phishing, Smishing y ataques de ingeniería social analizando remitentes, enlaces y trampas de urgencia.',
      'Crear frases de paso (passphrases) robustas y comprender el funcionamiento de los gestores de contraseñas.',
      'Activar y utilizar la Autenticación en Dos Pasos (2FA / MFA) con aplicaciones de códigos temporales.',
      'Configurar adecuadamente los permisos de colaboración en la nube (Lector, Comentador, Editor) protegiendo la información sensible.',
      'Utilizar el historial de versiones para auditar cambios y restaurar documentos en caso de errores o alteraciones accidentales.'
    ],
    flashcards: [
      {
        front: '¿Cuál es la señal número uno de un correo de Phishing?',
        back: 'La urgencia artificial (amenazas de cierre de cuenta, cobros inmediatos o premios urgentes) combinada con un enlace sospechoso que pide contraseñas.',
        hint: 'Buscan que actúes con pánico sin pensar.'
      },
      {
        front: '¿Por qué una frase de paso (passphrase) es mejor que una palabra corta con números?',
        back: 'Porque su gran longitud (ej. 4 palabras unidas) hace que descifrarla por fuerza bruta tome miles de años, además de ser fácil de recordar para el ser humano.',
        hint: 'Longitud vence a complejidad.'
      },
      {
        front: '¿Qué es el Doble Factor de Autenticación (2FA)?',
        back: 'Una segunda barrera de seguridad que exige algo que sabes (contraseña) y algo que tienes (un código temporal en tu teléfono móvil).',
        hint: 'Dos llaves distintas para abrir la puerta.'
      },
      {
        front: '¿Qué diferencia hay entre el permiso de Lector y Comentador en Google Drive?',
        back: 'El Lector solo puede visualizar el documento. El Comentador no puede modificar el texto original, pero puede insertar notas y sugerencias en los márgenes.',
        hint: 'Comentarios al margen vs solo lectura.'
      }
    ],
    sections: [
      {
        id: '6-1-anatomia-del-phishing',
        title: '6.1 Anatomía del Phishing y la Ingeniería Social',
        content: `Más del 90% de los incidentes de ciberseguridad no ocurren por "hackers" descifrando códigos complejos en la oscuridad, sino por **Ingeniería Social**: manipular a la persona para que ella misma entregue voluntariamente su contraseña o código de acceso.

El método más extendido es el **Phishing (Suplantación de Identidad)**: un atacante se hace pasar por tu banco, por una empresa de envíos, por WhatsApp o por un colega en un correo o mensaje.

### Señales Rojas para Detectar Phishing al Instante:
1. **Sensación artificial de urgencia o pánico:** *"¡Su cuenta será suspendida en 2 horas si no actualiza sus datos!", "¡Su paquete tiene una tarifa pendiente de entrega urgente!".*
2. **Dirección de correo engañosa:** El nombre visible dice "Banco Nacional", pero la dirección real detrás es \`soporte@banco-nacional-actualizacion772.com\` o una cuenta gratuita de correo.
3. **Enlaces falsos (Pasa el cursor por encima):** Si pasas el cursor del ratón sobre el botón sin hacer clic, la barra inferior del navegador revelará el destino real. Si no coincide con el dominio oficial, es una trampa.
4. **Solicitud de datos confidenciales:** Ningún banco legítimo te solicitará por correo o chat tu contraseña, tu PIN de tarjeta ni el código de 6 dígitos recibido por SMS.`,
        callouts: [
          {
            type: 'warning',
            title: 'Regla de Oro Antifraude',
            content: 'Si recibes un mensaje alarmante, NUNCA toques el enlace que viene adentro. Cierra la aplicación, abre tu navegador e ingresa escribiendo manualmente la dirección oficial en la barra.'
          }
        ],
        interactiveComponentId: 'phishing-lab'
      },
      {
        id: '6-2-contrasenas-y-2fa',
        title: '6.2 Contraseñas Robustas y Autenticación en Dos Pasos (2FA)',
        content: `### El Método de las Frases de Paso (Passphrases):
El factor determinante más poderoso en una contraseña es su **longitud**.
- *Ejemplo débil:* \`Carlos2024*\` (Descifrable en pocos minutos por fuerza bruta).
- *Ejemplo superrobusto:* \`jirafa-azul-salta-martes-78\` (Tardaría miles de años en ser descifrada por fuerza bruta, y es más fácil de recordar).

### Autenticación en Dos Pasos (2FA / Doble Factor):
El 2FA es la barrera de seguridad más crucial de la era moderna:
1. **Primer factor:** Algo que tú *sabes* (tu contraseña).
2. **Segundo factor:** Algo que tú *posees* (tu teléfono móvil que genera un código numérico dinámico de 6 dígitos que cambia cada 30 segundos en apps como Google Authenticator o Microsoft Authenticator).

*Ventaja colosal:* Aunque un atacante robe tu contraseña por phishing, si no tiene físicamente tu teléfono con el código dinámico del segundo factor, **no podrá acceder a tu cuenta**.`,
        callouts: [
          {
            type: 'tip',
            title: 'Prefiere apps de autenticación sobre SMS',
            content: 'Siempre que el servicio lo permita, elige Google Authenticator o Microsoft Authenticator en lugar de recibir el código por SMS. Los mensajes SMS pueden ser interceptados mediante duplicados no autorizados de tarjeta SIM (SIM swapping).'
          }
        ]
      },
      {
        id: '6-3-trabajo-colaborativo-permisos',
        title: '6.3 Trabajo Colaborativo en la Nube y Control de Versiones',
        content: `Herramientas como Google Docs o Microsoft 365 permiten que múltiples personas editen el mismo documento en tiempo real. Para colaborar armónicamente, debes dominar los **Niveles de Permisos**:

1. **Lector (Viewer):** La persona solo puede leer el documento. No puede borrar, editar ni escribir comentarios. Ideal para reglamentos o circulares informativas.
2. **Comentador (Commenter):** La persona no puede modificar el texto original, pero puede dejar notas al margen o sugerencias en burbujas amarillas. Ideal para revisiones de tareas o correcciones de estilo.
3. **Editor:** La persona tiene control total sobre el contenido. Puede escribir, borrar y formatear. Solo debe otorgarse a compañeros de equipo de confianza directa.

### El Salva-Vidas: Historial de Versiones
Si alguien borró por error información o dañó el diseño, en el menú Archivo > Historial de versiones puedes ver qué modificó cada persona con fecha, hora y color asignado, y restaurar con un solo clic el documento al estado exacto que tenía con anterioridad.`,
        callouts: [
          {
            type: 'tip',
            title: 'Cuidado con el enlace "Cualquier persona con el enlace"',
            content: 'Al compartir un documento, si configuras "Cualquier persona que tenga el vínculo puede editar", cualquier desconocido que reciba ese enlace podrá borrar tu trabajo de forma anónima. Comparte siempre agregando los correos específicos de tus colaboradores.'
          }
        ]
      }
    ],
    practicalWorkshop: {
      title: 'Taller Práctico de Ciberseguridad: Activación de 2FA y Documento Colaborativo Auditado',
      description: 'Verificarás el estado de seguridad de tu cuenta principal, comprobarás la autenticación en dos pasos y practicarás la asignación de roles de colaboración en la nube.',
      steps: [
        {
          step: 1,
          instruction: 'Verificar el estado de seguridad de tu cuenta principal',
          detail: 'Ingresa a myaccount.google.com/security (para Google) o account.microsoft.com/security. Revisa las recomendaciones de seguridad y confirma si tienes activada la Verificación en 2 pasos.',
          expectedResult: 'Constatación del nivel de protección de tu identidad digital.'
        },
        {
          step: 2,
          instruction: 'Crear un documento colaborativo con roles',
          detail: 'En Google Docs o Word Online crea un documento breve. Haz clic en "Compartir". Agrega el correo de un colega o cuenta secundaria asignándole el rol específico de "Comentador".',
          expectedResult: 'El colaborador solo puede sugerir cambios sin alterar el texto original.'
        },
        {
          step: 3,
          instruction: 'Explorar y restaurar el Historial de Versiones',
          detail: 'Haz modificaciones en el documento. Luego ve a Archivo > Historial de versiones > Ver historial de versiones. Observa el registro temporal y restaura la versión previa.',
          expectedResult: 'Dominio de la herramienta de rescate de documentos ante errores humanos.'
        }
      ],
      deliverable: 'Captura de pantalla mostrando el panel del Historial de Versiones con dos revisiones identificadas.'
    },
    quiz: [
      {
        id: 'q6-1',
        question: '¿Cuál de las siguientes situaciones representa el indicio más característico de un ataque de Phishing?',
        options: [
          'Un correo de felicitación que no solicita ningún dato ni enlace.',
          'Un mensaje urgente diciendo que tu cuenta bancaria será congelada en 1 hora a menos que ingreses a un enlace sospechoso a confirmar tu contraseña.',
          'Una notificación de que tu computadora actualizó el sistema operativo.',
          'Un correo en la papelera sin ningún texto.'
        ],
        correctAnswer: 1,
        explanation: 'La combinación de pánico artificial + enlace no oficial solicitando credenciales sensibles es el sello distintivo del phishing.'
      },
      {
        id: 'q6-2',
        question: '¿Por qué la autenticación en dos pasos (2FA) es tan efectiva para prevenir accesos no autorizados?',
        options: [
          'Porque hace que el teclado escriba el doble de rápido.',
          'Porque aunque un atacante robe tu contraseña, no podrá ingresar sin el código dinámico temporal generado en tu teléfono móvil.',
          'Porque cobra una multa a quien intente adivinar tu contraseña.',
          'Porque bloquea todas las conexiones de Internet de tu ciudad.'
        ],
        correctAnswer: 1,
        explanation: 'El 2FA exige dos factores independientes (conocimiento + posesión), neutralizando el robo remoto de contraseñas.'
      },
      {
        id: 'q6-3',
        question: 'Si deseas que otras personas lean un documento obligatorio pero quieres asegurar que nadie borre ni modifique el texto por accidente, ¿qué permiso debes otorgarles?',
        options: [
          'Editor',
          'Propietario total',
          'Lector (Viewer)',
          'Administrador'
        ],
        correctAnswer: 2,
        explanation: 'El rol de Lector permite visualizar el contenido completo sin otorgar facultades de escritura ni alteración del texto.'
      }
    ],
    reviewSummary: [
      'El phishing explota la urgencia psicológica; nunca ingreses credenciales desde enlaces de correos o chats.',
      'Las frases de paso largas (passphrases) son más robustas y fáciles de recordar.',
      'El doble factor de autenticación (2FA) es el cerrojo digital más potente ante el robo de claves.',
      'Compartir en la nube requiere discernimiento: usa Lector para consulta y Editor solo para confianza plena.',
      'El historial de versiones es la red de seguridad que permite rescatar cualquier documento modificado por error.'
    ]
  }
];

export const KEYBOARD_SHORTCUTS: ShortcutItem[] = [
  // Edición Universal
  { keys: ['Ctrl', 'C'], action: 'Copiar', category: 'edicion', context: 'Windows', tip: 'Copia el texto, imagen o archivo seleccionado al portapapeles sin borrar el original.' },
  { keys: ['Ctrl', 'X'], action: 'Cortar', category: 'edicion', context: 'Windows', tip: 'Copia el elemento seleccionado y lo elimina de su ubicación actual para moverlo a otra.' },
  { keys: ['Ctrl', 'V'], action: 'Pegar', category: 'edicion', context: 'Windows', tip: 'Inserta en el punto del cursor el último elemento almacenado en el portapapeles.' },
  { keys: ['Ctrl', 'Z'], action: 'Deshacer', category: 'edicion', context: 'Windows', tip: 'El salvavidas universal: revierte la última acción efectuada.' },
  { keys: ['Ctrl', 'Y'], action: 'Rehacer', category: 'edicion', context: 'Windows', tip: 'Vuelve a aplicar la acción que acabas de deshacer con Ctrl+Z.' },
  { keys: ['Ctrl', 'E'], action: 'Seleccionar todo (en español)', category: 'edicion', context: 'Windows', tip: 'En Windows en español, selecciona todo el contenido del documento o carpeta (en inglés es Ctrl+A).' },
  { keys: ['Ctrl', 'F'], action: 'Buscar en documento o página', category: 'edicion', context: 'Ambos', tip: 'Abre la barra de búsqueda para localizar rápidamente una palabra clave en textos extensos.' },
  { keys: ['Ctrl', 'G'], action: 'Guardar archivo', category: 'edicion', context: 'Windows', tip: 'En programas en español como Word/Excel guarda los cambios actuales (en inglés es Ctrl+S).' },

  // Sistema y Ventanas
  { keys: ['Win', 'D'], action: 'Mostrar / Ocultar el Escritorio', category: 'sistema', context: 'Windows', tip: 'Minimiza todas las ventanas abiertas al instante para mostrar el escritorio limpio. Presiónalo de nuevo para restaurarlas.' },
  { keys: ['Win', 'E'], action: 'Abrir el Explorador de Archivos', category: 'sistema', context: 'Windows', tip: 'Abre de inmediato la ventana de carpetas y discos de tu computador.' },
  { keys: ['Win', 'L'], action: 'Bloquear el equipo al instante', category: 'sistema', context: 'Windows', tip: 'Esencial al levantarte de tu puesto en la oficina para que nadie toque tu sesión.' },
  { keys: ['Alt', 'Tab'], action: 'Alternar entre ventanas abiertas', category: 'ventanas', context: 'Windows', tip: 'Mantén presionado Alt y pulsa Tab repetidamente para saltar con fluidez entre tus programas abiertos.' },
  { keys: ['Win', 'Shift', 'S'], action: 'Captura de pantalla selectiva', category: 'captura', context: 'Windows', tip: 'La mejor herramienta de recorte en Windows: dibuja con el ratón el área exacta que deseas capturar.' },
  { keys: ['Ctrl', 'Shift', 'Esc'], action: 'Administrador de Tareas directo', category: 'sistema', context: 'Windows', tip: 'Abre el Administrador de Tareas sin pasar por la pantalla intermedia de seguridad.' },
  { keys: ['Win', 'V'], action: 'Historial del Portapapeles', category: 'edicion', context: 'Windows', tip: 'Permite pegar no solo el último elemento copiado, sino una lista de los últimos 25 textos e imágenes copiados.' },
  { keys: ['Win', 'Flechas'], action: 'Ajustar ventana a mitad de pantalla', category: 'ventanas', context: 'Windows', tip: 'Win + Flecha Izquierda/Derecha divide la pantalla en dos mitades perfectas para trabajar con dos programas a la vez.' },

  // Navegador Web
  { keys: ['Ctrl', 'T'], action: 'Abrir una nueva pestaña', category: 'navegador', context: 'Navegador Web', tip: 'Crea una pestaña limpia de navegación sin tocar el ratón.' },
  { keys: ['Ctrl', 'W'], action: 'Cerrar la pestaña actual', category: 'navegador', context: 'Navegador Web', tip: 'Cierra velozmente la página web en la que te encuentras en este momento.' },
  { keys: ['Ctrl', 'Shift', 'T'], action: '¡Revivir la última pestaña cerrada!', category: 'navegador', context: 'Navegador Web', tip: 'El truco mágico: si cerraste una pestaña por accidente, esta combinación la reabre exactamente donde estaba.' },
  { keys: ['Ctrl', 'Shift', 'N'], action: 'Ventana de Navegación Privada / Incógnito', category: 'navegador', context: 'Navegador Web', tip: 'En Chrome o Edge abre una ventana que no guarda historial, cookies ni datos de formulario al cerrarse.' },
  { keys: ['Ctrl', 'F5'], action: 'Recarga forzada limpia de caché', category: 'navegador', context: 'Navegador Web', tip: 'Vuelve a descargar la página desde cero borrando la memoria caché local (ideal cuando una página no actualiza cambios).' },
  { keys: ['Ctrl', '+'], action: 'Aumentar Zoom de la página', category: 'navegador', context: 'Navegador Web', tip: 'Agranda el tamaño del texto e imágenes de la página web.' },
  { keys: ['Ctrl', '0'], action: 'Restablecer Zoom al 100%', category: 'navegador', context: 'Navegador Web', tip: 'Regresa el tamaño visual de la página al 100% predeterminado.' },
  { keys: ['Alt', 'Flecha Izq'], action: 'Página anterior en el historial', category: 'navegador', context: 'Navegador Web', tip: 'Equivale al botón de flecha Atrás del navegador.' }
];

export const WHATSAPP_TIPS = [
  {
    title: 'Formato de Texto Enriquecido Nativo',
    category: 'Tipografía y Estilo',
    description: 'Puedes formatear cualquier palabra o frase encerrándola entre caracteres especiales sin instalar aplicaciones de terceros:',
    examples: [
      { syntax: '*Hola mundo*', result: 'Hola mundo (en Negrita)', usage: 'Coloca un asterisco (*) al inicio y al final.' },
      { syntax: '_Hola mundo_', result: 'Hola mundo (en Cursiva)', usage: 'Coloca un guion bajo (_) al inicio y al final.' },
      { syntax: '~Hola mundo~', result: 'Hola mundo (Tachado)', usage: 'Coloca una virgulilla (~) al inicio y al final.' },
      { syntax: '```Hola mundo```', result: 'Hola mundo (Monoespaciado)', usage: 'Coloca tres comillas invertidas (```) al inicio y al final.' },
      { syntax: '- Elemento 1\n- Elemento 2', result: '• Elemento 1\n• Elemento 2 (Lista con viñetas)', usage: 'Escribe un guion seguido de un espacio antes del texto.' },
      { syntax: '1. Primero\n2. Segundo', result: '1. Primero\n2. Segundo (Lista numerada)', usage: 'Escribe el número seguido de punto y espacio.' },
      { syntax: '> Cita textual', result: '▎Cita textual (Bloque de cita)', usage: 'Escribe el signo mayor que (>) seguido de un espacio.' }
    ]
  },
  {
    title: 'Mensajes Temporales con Autodestrucción',
    category: 'Privacidad Avanzada',
    description: 'Configura chats individuales o grupales para que los mensajes se borren automáticamente transcurridas 24 horas, 7 días o 90 días. Esto ahorra memoria en el teléfono y protege la privacidad en conversaciones que no requieren archivo histórico.',
    examples: [
      { syntax: 'Ajustes del chat > Mensajes temporales > Duración', result: 'Desaparición automática programada', usage: 'Ideal para compartir notas temporales, claves de acceso transitorias o chats cotidianos.' }
    ]
  },
  {
    title: 'Grupos vs. Listas de Difusión: Cuándo usar cada uno',
    category: 'Comunicación Masiva',
    description: 'Muchos usuarios y comerciantes crean grupos donde todos los miembros ven los números de teléfono de los demás y se satura con respuestas cruzadas.',
    examples: [
      { syntax: 'Grupo de WhatsApp', result: 'Conversación comunitaria abierta', usage: 'Todos ven los mensajes de todos. Úsalo solo para debates de equipo donde se requiera interacción colectiva.' },
      { syntax: 'Lista de Difusión', result: 'Envío masivo con respuesta 1 a 1 privada', usage: 'Envías el mismo comunicado a hasta 256 personas a la vez, pero a cada receptor le llega como un mensaje privado individual. Si responden, solo tú recibes la respuesta, sin que los demás vean nada ni conozcan los números del resto.' }
    ]
  },
  {
    title: 'WhatsApp Web Multidispositivo Independiente',
    category: 'Productividad en PC',
    description: 'Con el sistema multidispositivo moderno, puedes vincular WhatsApp Web o Desktop en hasta 4 computadoras. Una vez vinculado con el código QR, tu computadora funciona de forma 100% independiente: ¡el celular puede estar apagado, sin batería o sin Internet y seguirás recibiendo y respondiendo mensajes en tu PC!',
    examples: [
      { syntax: 'web.whatsapp.com > Dispositivos vinculados > Vincular un dispositivo', result: 'Autonomía de trabajo en pantalla grande', usage: 'Permite escribir con teclado completo, arrastrar archivos pesados desde la PC y copiar textos con soltura.' }
    ]
  },
  {
    title: 'Copias de Seguridad Cifradas de Extremo a Extremo',
    category: 'Seguridad y Respaldo',
    description: 'Por defecto, la copia en Google Drive o iCloud no tenía el mismo cifrado que los chats en tránsito. Ahora puedes activar una contraseña o clave de 64 dígitos para que ni siquiera Google o Apple puedan leer tus conversaciones en caso de filtración de su servidor.',
    examples: [
      { syntax: 'Ajustes > Chats > Copia de seguridad > Copia de seguridad cifrada', result: 'Máxima protección criptográfica', usage: 'Asegúrate de no olvidar esa contraseña, ya que sin ella nadie podrá recuperar los chats al cambiar de celular.' }
    ]
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  { term: 'Algoritmo', definition: 'Conjunto ordenado y finito de instrucciones o pasos lógicos que permiten resolver un problema o realizar una tarea específica.', category: 'Software' },
  { term: 'Alucinación (en IA)', definition: 'Fenómeno por el cual un modelo de inteligencia artificial genera información fáctica incorrecta o inventada, presentándola con total seguridad y coherencia gramatical.', category: 'Inteligencia Artificial' },
  { term: 'Banda Ancha', definition: 'Tecnología de transmisión de datos de alta velocidad que permite la conexión continua a Internet a través de fibra óptica, cable módem o radioenlaces.', category: 'Redes e Internet' },
  { term: 'Browser (Navegador)', definition: 'Programa de software (como Chrome, Edge o Firefox) que interpreta el código de páginas web y lo proyecta visualmente en la pantalla del usuario.', category: 'Software' },
  { term: 'Bus de Datos', definition: 'Conjunto de líneas físicas o pistas de cobre en la placa madre a través de las cuales se transmiten las señales eléctricas entre los componentes del computador.', category: 'Hardware' },
  { term: 'Caché', definition: 'Memoria ultrarrápida de acceso temporal que guarda datos utilizados recientemente para acelerar consultas futuras sin tener que buscarlos en el origen.', category: 'Hardware' },
  { term: 'Cloud Computing (La Nube)', definition: 'Modelo de suministro de servicios informáticos (servidores, almacenamiento, bases de datos) a través de Internet bajo demanda.', category: 'Redes e Internet' },
  { term: 'CPU (Procesador)', definition: 'Unidad Central de Procesamiento; el microchip que ejecuta los cálculos aritméticos y lógicos del sistema informático.', category: 'Hardware' },
  { term: 'Doble Factor (2FA / MFA)', definition: 'Capa de seguridad complementaria que exige dos comprobaciones independientes (ej. contraseña + código en app) para autorizar un inicio de sesión.', category: 'Seguridad' },
  { term: 'DNS (Domain Name System)', definition: 'El directorio telefónico de Internet; traduce nombres amigables (como google.com) en direcciones numéricas IP (como 142.250.190.46).', category: 'Redes e Internet' },
  { term: 'Dirección IP', definition: 'Identificador numérico exclusivo asignado a cada dispositivo conectado a una red informática para que pueda ser localizado y comunicarse.', category: 'Redes e Internet' },
  { term: 'Ergonomía Digital', definition: 'Disciplina que diseña los puestos de trabajo y hábitos tecnológicos para prevenir lesiones físicas, fatiga visual y dolores musculoesqueléticos.', category: 'Hardware' },
  { term: 'GPU (Tarjeta de Video)', definition: 'Unidad de Procesamiento Gráfico diseñada para procesar masivamente cálculos paralelos para renderizado de imágenes, 3D y algoritmos de IA.', category: 'Hardware' },
  { term: 'Hardware', definition: 'Conjunto de componentes físicos, materiales y tangibles que constituyen un sistema computacional o periférico.', category: 'Hardware' },
  { term: 'Huella Digital', definition: 'Rastro acumulativo de datos que una persona deja en Internet al navegar, publicar en redes, realizar búsquedas o usar aplicaciones.', category: 'Seguridad' },
  { term: 'Ingeniería Social', definition: 'Técnicas de manipulación psicológica dirigidas a engañar a usuarios para que revelen información confidencial o ejecuten acciones que comprometan su seguridad.', category: 'Seguridad' },
  { term: 'LLM (Large Language Model)', definition: 'Modelo de Lenguaje Grande; red neuronal entrenada con grandes volúmenes de texto para comprender y generar lenguaje natural de forma probabilística.', category: 'Inteligencia Artificial' },
  { term: 'Memoria RAM', definition: 'Memoria de Acceso Aleatorio; memoria volátil ultrarrápida donde residen el sistema operativo y las aplicaciones mientras están activas.', category: 'Hardware' },
  { term: 'Phishing', definition: 'Modalidad de estafa digital donde los ciberdelincuentes suplantan la identidad de organizaciones de confianza para robar credenciales bancarias o contraseñas.', category: 'Seguridad' },
  { term: 'Prompt', definition: 'Instrucción o solicitud en lenguaje natural que el usuario ingresa a un modelo de inteligencia artificial para orientar la respuesta generada.', category: 'Inteligencia Artificial' },
  { term: 'SSD (Unidad de Estado Sólido)', definition: 'Dispositivo de almacenamiento masivo permanente no volátil basado en chips de memoria flash, significativamente más veloz que los discos magnéticos HDD.', category: 'Hardware' },
  { term: 'Software', definition: 'Conjunto de programas, instrucciones, lenguajes y procedimientos lógicos e intangibles que hacen posible el funcionamiento del computador.', category: 'Software' },
  { term: 'URL', definition: 'Localizador Uniforme de Recursos; la dirección global y única utilizada para encontrar un sitio o recurso en la World Wide Web (ej. https://ejemplo.com).', category: 'Redes e Internet' },
  { term: 'USB-C', definition: 'Conector reversible de 24 pines de estándar universal capaz de transmitir datos de alta velocidad, señales de video y alimentación eléctrica simultáneamente.', category: 'Hardware' },
  { term: 'VPN (Red Privada Virtual)', definition: 'Túnel cifrado de comunicación que protege la conexión a Internet ocultando la dirección IP real y cifrando los paquetes en redes públicas.', category: 'Seguridad' }
];
