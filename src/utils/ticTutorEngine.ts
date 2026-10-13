/**
 * Motor pedagógico de conocimiento TIC para el Tutor de Voz.
 * Funciona tanto conectado como de forma 100% autónoma en el navegador.
 * Conoce todo el contenido del Manual de Herramientas TIC para Aprendices:
 * el computador, ciclo de procesamiento, hardware, software, ofimática,
 * celulares, atajos, ciberseguridad, IA y talleres prácticos.
 */

import { UNITS_DATA, GLOSSARY_TERMS } from '../data/manualData';

export interface TutorResponse {
  answer: string;
  recommendedUnit?: string;
  category: string;
  isUnknown?: boolean;
}

interface CuratedTopic {
  keywords: string[];
  answer: string;
  recommendedUnit: string;
  category: string;
}

const SPANISH_STOP_WORDS = new Set([
  'a', 'al', 'algo', 'ante', 'antes', 'aqui', 'asi',
  'bien', 'buen', 'buena', 'buenas', 'bueno', 'buenos',
  'cada', 'como', 'con', 'contra', 'cual', 'cuales', 'cuando', 'cuanto', 'cuanta',
  'de', 'del', 'desde', 'donde', 'dos', 'dias',
  'el', 'ella', 'ellas', 'ello', 'ellos', 'en', 'entre', 'era', 'eras', 'eramos', 'eran',
  'es', 'esa', 'esas', 'ese', 'eso', 'esos', 'esta', 'estas', 'este', 'estos', 'estaba',
  'estado', 'estamos', 'estan', 'estar', 'favor',
  'fue', 'fueron', 'fui', 'fuimos',
  'gracias', 'ha', 'habia', 'hablan', 'hablar', 'hace', 'hacen', 'hacer', 'hacia', 'hasta',
  'hay', 'hola',
  'la', 'las', 'le', 'les', 'lo', 'los',
  'mas', 'me', 'mi', 'mis', 'mismo', 'misma', 'mucha', 'muchas', 'mucho', 'muchos', 'muy',
  'nada', 'ni', 'no', 'nos', 'nosotros', 'nuestra', 'nuestras', 'nuestro', 'nuestros',
  'o', 'otra', 'otras', 'otro', 'otros',
  'para', 'pero', 'poco', 'por', 'porque', 'porfa', 'porfavor', 'puedes', 'puede', 'puedo',
  'que', 'quien', 'quienes', 'quiero',
  'saber', 'sabes', 'se', 'sea', 'segun', 'ser', 'si', 'sido', 'siempre', 'sin', 'sobre',
  'solo', 'somos', 'son', 'su', 'sus', 'suya', 'suyas', 'suyo', 'suyos',
  'tal', 'tambien', 'tampoco', 'tan', 'tarde', 'tardes', 'te', 'tenemos', 'tener', 'tenga',
  'tengo', 'tiene', 'tienen', 'toda', 'todas', 'todo', 'todos', 'tras', 'tu', 'tus', 'tutor',
  'un', 'una', 'unas', 'uno', 'unos', 'usted', 'ustedes',
  'va', 'vamos', 'van', 'varias', 'varios', 'vez', 'veces',
  'y', 'ya'
]);

const CURATED_KNOWLEDGE: CuratedTopic[] = [
  // --- EL COMPUTADOR Y ARQUITECTURA FUNDAMENTAL ---
  {
    keywords: [
      'que es un computador',
      'que es el computador',
      'el computador',
      'concepto de computador',
      'definicion de computador',
      'que es una computadora',
      'la computadora',
      'concepto de computadora',
      'definicion de computadora',
      'ordenador',
      'que es un ordenador',
      'para que sirve el computador',
      'como funciona el computador',
      'que hace un computador',
      'aparato computador',
      'maquina programable'
    ],
    category: 'computador',
    recommendedUnit: 'Unidad 1: Sección 1.2 (El Computador: Concepto Fundamental)',
    answer: 'Un computador (o computadora) es una máquina electrónica digital y programable diseñada para capturar datos crudos del exterior, procesarlos a gran velocidad siguiendo instrucciones lógicas de software, almacenarlos de forma temporal o permanente, y generar información útil como resultado para el usuario. Sigue el modelo universal de 4 fases: Entrada, Procesamiento, Almacenamiento y Salida. Puedes profundizar en la Sección 1.2 de la Unidad 1.'
  },
  {
    keywords: [
      'ciclo de procesamiento',
      'ciclo del computador',
      'entrada proceso salida',
      'fases del computador',
      'etapas del computador',
      'ciclo de datos',
      'modelo de von neumann',
      'input process output',
      'como procesa datos el computador'
    ],
    category: 'computador',
    recommendedUnit: 'Unidad 1: Sección 1.2 (El Computador: Concepto Fundamental)',
    answer: 'El ciclo básico de procesamiento de un computador consta de 4 fases continuas: 1) Entrada (Input): captura de datos mediante teclado, ratón, micrófono o cámara. 2) Procesamiento (Processing): la CPU efectúa los cálculos lógicos y aritméticos. 3) Almacenamiento (Storage): la memoria RAM guarda temporalmente lo que está en curso y el disco SSD retiene los archivos permanentemente. 4) Salida (Output): el monitor o los altavoces proyectan la información lista para el usuario.'
  },
  {
    keywords: [
      'dato e informacion',
      'dato vs informacion',
      'diferencia entre dato e informacion',
      'que es un dato',
      'que es informacion',
      'datos e informacion'
    ],
    category: 'computador',
    recommendedUnit: 'Unidad 1: Sección 1.2 (El Computador: Concepto Fundamental)',
    answer: 'Un dato es un registro crudo y aislado sin contexto ni significado (por ejemplo, el número "39.5" o la palabra "ROJO"). En cambio, la información es ese dato ya procesado, ordenado y contextualizado para permitir la toma de decisiones (por ejemplo: "Temperatura corporal del paciente: 39.5°C [Alerta: Fiebre Alta]"). El dato es la materia prima y la información es el producto final útil.'
  },
  {
    keywords: [
      'tipos de computadores',
      'computador de escritorio',
      'portatil vs escritorio',
      'laptop vs pc',
      'servidores en la nube',
      'computadores embebidos',
      'clases de computadores'
    ],
    category: 'computador',
    recommendedUnit: 'Unidad 1: Sección 1.2 (El Computador: Concepto Fundamental)',
    answer: 'Existen 5 tipos principales de computadores: 1) De Escritorio (Desktop/Torre), con máxima potencia fija y piezas actualizables. 2) Portátiles (Laptops/Notebooks), con batería y pantalla integrada para trabajar en movimiento. 3) Servidores, máquinas de alta disponibilidad en centros de datos que funcionan 24/7. 4) Dispositivos Móviles (Smartphones y Tablets), microcomputadores de bolsillo. 5) Sistemas Embebidos, chips integrados en cajeros automáticos, vehículos y electrodomésticos.'
  },
  {
    keywords: [
      'diferencia entre tic y computador',
      'computador vs tic',
      'las tic son solo computadores',
      'relacion tic y computador'
    ],
    category: 'fundamentos',
    recommendedUnit: 'Unidad 1: Fundamentos de las TIC',
    answer: 'El computador es el equipo o máquina electrónica individual que procesa datos. Por su parte, las TIC (Tecnologías de la Información y la Comunicación) son todo el ecosistema convergente que une computadores, teléfonos celulares, redes de Internet, fibra óptica, satélites, plataformas en la nube y las personas que colaboran e intercambian conocimiento a través de ellos.'
  },

  // --- FUNDAMENTOS TIC Y NUBE ---
  {
    keywords: ['que son las tic', 'concepto de tic', 'definicion tic', 'para que sirven las tic', 'que significa tic'],
    category: 'fundamentos',
    recommendedUnit: 'Unidad 1: Fundamentos de las TIC y del Entorno Digital',
    answer: 'Las TIC (Tecnologías de la Información y la Comunicación) son el conjunto convergente de recursos, herramientas electrónicas, programas informáticos y redes de comunicación que permiten compilar, procesar, almacenar, transmitir e intercambiar información en texto, sonido, imagen y video.'
  },
  {
    keywords: ['hardware y software', 'diferencia entre hardware y software', 'que es hardware', 'que es software'],
    category: 'fundamentos',
    recommendedUnit: 'Unidad 1: Sección 1.3 (Hardware vs Software)',
    answer: 'El hardware es la parte física y tangible del computador (teclado, pantalla, procesador, memoria, cables; todo lo que se puede tocar). El software es la parte lógica e intangible (el sistema operativo, los programas y aplicaciones como Windows, Word, Excel o navegadores web que le ordenan a la máquina qué hacer).'
  },
  {
    keywords: ['sistema operativo', 'que es el sistema operativo', 'windows', 'linux', 'macos'],
    category: 'fundamentos',
    recommendedUnit: 'Unidad 1: Sección 1.3 (Hardware vs Software)',
    answer: 'El sistema operativo (como Windows, GNU/Linux o macOS) es el software maestro de un computador. Administra directamente los recursos físicos del hardware (procesador, memoria RAM, discos) y proporciona la interfaz visual de ventanas para que puedas interactuar con tus programas con facilidad.'
  },
  {
    keywords: ['cloud', 'la nube', 'cloud computing', 'guardar en la nube', 'almacenamiento en la nube'],
    category: 'fundamentos',
    recommendedUnit: 'Unidad 1: Sección 1.5 (La Computación en la Nube)',
    answer: 'La computación en la nube consiste en almacenar archivos y ejecutar servicios en centros de datos remotos conectados a Internet (como Google Drive, OneDrive o Dropbox) en lugar de depender únicamente del disco local de tu equipo, permitiendo acceder a tu información desde cualquier lugar y dispositivo con respaldo automático.'
  },
  {
    keywords: ['https', 'candado', 'seguridad web', 'protocolo seguro'],
    category: 'fundamentos',
    recommendedUnit: 'Unidad 1: Sección 1.4 (Cómo funciona Internet)',
    answer: 'El prefijo HTTPS y el icono de candado en el navegador indican que la conexión entre tu computador y ese sitio web está cifrada con certificados SSL/TLS, garantizando que nadie en la misma red Wi-Fi pueda interceptar tus contraseñas o datos personales en tránsito.'
  },
  {
    keywords: ['huella digital', 'rastro en internet', 'privacidad en la red'],
    category: 'fundamentos',
    recommendedUnit: 'Unidad 1: Sección 1.5 (Ciudadanía Digital)',
    answer: 'La huella digital es el rastro permanente de información que dejas en Internet al navegar, publicar en redes sociales, comentar en foros, buscar contenidos o diligenciar formularios. Es fundamental gestionarla con responsabilidad y configurar la privacidad de tus cuentas.'
  },

  // --- HARDWARE Y DIAGNÓSTICO ---
  {
    keywords: ['ram', 'memoria ram', 'borra al apagar', 'volatil', 'para que sirve la ram'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'La memoria RAM es la memoria de trabajo temporal ultrarrápida del computador. Es volátil, lo que significa que requiere corriente eléctrica constante; al apagar el equipo se vacía por completo. Su misión es mantener abiertos y ágiles el sistema operativo y las aplicaciones que estás usando en ese instante.'
  },
  {
    keywords: ['cpu', 'procesador', 'cerebro del pc', 'que hace la cpu'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'La CPU o Procesador es el cerebro del computador. Interpreta las instrucciones de los programas y realiza todos los cálculos lógicos y aritméticos. Su rendimiento se mide por la cantidad de núcleos de procesamiento y por su frecuencia de reloj en gigahercios (GHz).'
  },
  {
    keywords: ['gpu', 'tarjeta de video', 'grafica', 'para que sirve la gpu'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'La GPU o Tarjeta Gráfica cuenta con miles de micro-núcleos en paralelo optimizados para procesar imágenes, video de alta definición, videojuegos, modelado 3D y modelos de Inteligencia Artificial.'
  },
  {
    keywords: ['ssd', 'disco solido', 'disco duro', 'hdd', 'diferencia entre disco ssd y hdd'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'Los discos mecánicos (HDD) usan platos magnéticos giratorios y agujas lectoras, mientras que las unidades de estado sólido (SSD) utilizan chips de memoria flash sin piezas móviles. Un SSD es entre 5 y 10 veces más rápido al iniciar Windows y abrir programas.'
  },
  {
    keywords: ['mantenimiento', 'calienta', 'ventilador', 'limpiar pc', 'polvo', 'pasta termica'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'El sobrecalentamiento ocurre cuando el polvo obstruye los disipadores o la pasta térmica entre el procesador y el disipador se reseca. Se recomienda realizar mantenimiento preventivo cada 6 a 12 meses: retirar el polvo con aire comprimido y renovar la pasta térmica.'
  },
  {
    keywords: ['placa madre', 'motherboard', 'tarjeta madre', 'placa base'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'La placa madre o tarjeta madre es el circuito principal que interconecta físicamente todos los componentes del computador: el procesador, la memoria RAM, los discos SSD, la tarjeta gráfica y los puertos externos a través de buses de datos.'
  },
  {
    keywords: ['fuente de poder', 'fuente de alimentacion', 'psu'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'La fuente de poder transforma la corriente alterna del tomacorriente (110V o 220V) en corriente continua de bajo voltaje regulado (12V, 5V y 3.3V) para alimentar de manera segura todos los circuitos del computador.'
  },
  {
    keywords: ['usb-c', 'tipo c', 'puerto usb c', 'conector reversible'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'USB-C es un estándar de conector reversible de 24 pines que permite transferir datos a altísima velocidad, enviar señal de video a monitores externos y cargar laptops y celulares a gran potencia con el mismo cable.'
  },
  {
    keywords: ['hdmi', 'displayport', 'cable de video', 'diferencia hdmi displayport'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'HDMI transmite audio y video digital a televisores y monitores estándar. DisplayPort es el conector predilecto en computadores de alto rendimiento y monitores de alta frecuencia (Hz), ya que soporta mayor ancho de banda de datos.'
  },

  // --- PROCESAMIENTO DE TEXTO (WORD) ---
  {
    keywords: ['word', 'tabla de contenido', 'crear indice', 'indice automatico'],
    category: 'ofimatica',
    recommendedUnit: 'Unidad 3: Procesamiento de Textos y Documentación',
    answer: 'Para crear un índice o tabla de contenido automática en Word: aplica estilos de "Título 1" y "Título 2" a tus encabezados desde la pestaña Inicio. Luego ve a la pestaña "Referencias", pulsa "Tabla de contenido" y selecciona el estilo automático. ¡Se actualizará sola cuando agregues páginas!'
  },
  {
    keywords: ['combinar correspondencia', 'cartas masivas', 'diplomas masivos'],
    category: 'ofimatica',
    recommendedUnit: 'Unidad 3: Procesamiento de Textos y Documentación',
    answer: 'La combinación de correspondencia permite enlazar una plantilla base en Word con una lista de datos en Excel (nombres, cédulas, notas), generando en cuestión de segundos cientos de cartas o certificados personalizados sin escribirlos manualmente.'
  },
  {
    keywords: ['normas apa', 'formato apa', 'citar apa', 'margenes apa'],
    category: 'ofimatica',
    recommendedUnit: 'Unidad 3: Procesamiento de Textos y Documentación',
    answer: 'Las Normas APA para documentos formales estipulan: márgenes de 2.54 cm en todos los lados, fuente legible (Times New Roman 12, Arial 11 o Calibri 11), interlineado doble, sangría de 1.27 cm en la primera línea de cada párrafo y citas estructuradas por Autor y Año.'
  },

  // --- EXCEL Y HOJAS DE CÁLCULO ---
  {
    keywords: ['si', 'formula si', '=si', 'condicional excel', 'funcion si'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'La función condicional =SI evalúa una condición lógica y devuelve un valor si es verdadera y otro si es falsa. Su sintaxis es =SI(prueba_lógica; valor_si_verdadero; valor_si_falso). Ejemplo: =SI(C2>=3; "Aprobado"; "Pendiente").'
  },
  {
    keywords: ['buscarv', 'buscarx', 'vlookup', 'xlookup'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'BUSCARV localiza un valor en la primera columna a la izquierda de una tabla y trae el dato de otra columna. La moderna función BUSCARX busca tanto hacia la izquierda como a la derecha, no se altera si insertas columnas y permite colocar un mensaje personalizado si no encuentra el dato.'
  },
  {
    keywords: ['suma', 'sumar en excel', '=suma', 'autosuma'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'La función =SUMA calcula el total de un rango numérico, por ejemplo =SUMA(B2:B50). También puedes pulsar el atajo rápido Alt + Shift + = en Windows para insertar una autosuma instantánea.'
  },
  {
    keywords: ['signo de dolar', 'fijar celda', 'referencia absoluta', '$a$1', 'f4 excel'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'El signo de dólar ($) en Excel fija una fila o columna para crear una referencia absoluta (ejemplo: $B$1). Al arrastrar la fórmula hacia abajo o hacia los lados, esa celda permanecerá bloqueada. Puedes insertarlo rápidamente pulsando la tecla F4.'
  },
  {
    keywords: ['tabla dinamica', 'resumen de datos excel', 'pivot table'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'Las tablas dinámicas permiten agrupar, resumir y filtrar miles de registros en segundos sin escribir fórmulas complejas, permitiendo arrastrar campos a filas, columnas y valores para obtener métricas inmediatas.'
  },

  // --- CELULARES Y PRODUCTIVIDAD ---
  {
    keywords: ['liberar espacio', 'memoria llena', 'almacenamiento celular', 'borrar cache'],
    category: 'movil',
    recommendedUnit: 'Unidad 5: Ecosistema Móvil y Productividad en Smartphones',
    answer: 'Para liberar espacio en tu celular: 1) Limpia la memoria caché de aplicaciones pesadas en Ajustes > Aplicaciones. 2) En WhatsApp, ve a Ajustes > Almacenamiento y elimina videos reenviados repetidos. 3) Usa la opción "Liberar espacio" de Google Fotos para retirar fotos que ya tienen copia segura en la nube.'
  },
  {
    keywords: ['bateria celular', 'cuidar bateria', 'duracion bateria', 'vida util bateria'],
    category: 'movil',
    recommendedUnit: 'Unidad 5: Ecosistema Móvil y Productividad en Smartphones',
    answer: 'Para alargar la vida útil de la batería: mantén la carga habitual entre el 20% y el 80%, evita que se descargue al 0%, no utilices el celular intensamente mientras se carga para prevenir el calor y mantén activo el brillo automático.'
  },
  {
    keywords: ['whatsapp hd', 'foto hd', 'video hd en whatsapp'],
    category: 'movil',
    recommendedUnit: 'Unidad 5: Ecosistema Móvil y Productividad en Smartphones',
    answer: 'Para enviar fotos o videos en máxima resolución por WhatsApp, pulsa el botón "HD" en la parte superior antes de enviar y selecciona "Calidad HD". O si requieres enviar el archivo con calidad 100% original sin ninguna compresión, adjúntalo como "Documento".'
  },
  {
    keywords: ['whatsapp web', 'usar whatsapp en pc', 'multidispositivo'],
    category: 'movil',
    recommendedUnit: 'Unidad 5: Ecosistema Móvil y Productividad en Smartphones',
    answer: 'Con WhatsApp Web multidispositivo puedes conectar hasta 4 computadores desde web.whatsapp.com escaneando el código QR. Una vez vinculado, funcionará de manera independiente aunque tu celular esté apagado, sin batería o sin conexión a Internet.'
  },

  // --- ATAJOS DE TECLADO ---
  {
    keywords: ['recuperar pestana', 'ctrl shift t', 'reabrir pestana cerrada'],
    category: 'atajos',
    recommendedUnit: 'Unidad 6: Atajos de Teclado y Flujos de Alta Velocidad',
    answer: 'El atajo Ctrl + Shift + T (o Cmd + Shift + T en Mac) restaura inmediatamente la última pestaña cerrada por accidente en el navegador, conservando todo el historial de navegación de esa página.'
  },
  {
    keywords: ['portapapeles', 'win v', 'historial de copiado'],
    category: 'atajos',
    recommendedUnit: 'Unidad 6: Atajos de Teclado y Flujos de Alta Velocidad',
    answer: 'La combinación Windows + V abre el Historial del Portapapeles en Windows. Te permite consultar y pegar cualquiera de los últimos 25 textos o imágenes copiados, en lugar de conservar únicamente el último.'
  },
  {
    keywords: ['captura de pantalla', 'win shift s', 'recorte de pantalla'],
    category: 'atajos',
    recommendedUnit: 'Unidad 6: Atajos de Teclado y Flujos de Alta Velocidad',
    answer: 'El atajo Windows + Shift + S activa la herramienta de recorte selectivo en Windows para capturar un área rectangular precisa, una ventana completa o la pantalla entera y copiarla al portapapeles sin programas adicionales.'
  },
  {
    keywords: ['bloquear pc', 'win l', 'bloquear sesion'],
    category: 'atajos',
    recommendedUnit: 'Unidad 6: Atajos de Teclado y Flujos de Alta Velocidad',
    answer: 'Presionar Windows + L bloquea tu sesión de inmediato al levantarte del puesto de trabajo, protegiendo tus documentos y credenciales de miradas de terceros.'
  },

  // --- CIBERSEGURIDAD ---
  {
    keywords: ['phishing', 'correo falso', 'estafa bancaria', 'suplantacion de identidad'],
    category: 'seguridad',
    recommendedUnit: 'Unidad 7: Ciberseguridad, Privacidad y Navegación Crítica',
    answer: 'El Phishing es un engaño donde atacantes suplantan a entidades bancarias o plataformas de confianza mediante correos o mensajes urgentes para robar contraseñas. Siempre revisa el dominio exacto del remitente después del @ y nunca introduzcas credenciales desde enlaces recibidos.'
  },
  {
    keywords: ['2fa', 'doble factor', 'mfa', 'autenticacion en dos pasos'],
    category: 'seguridad',
    recommendedUnit: 'Unidad 7: Ciberseguridad, Privacidad y Navegación Crítica',
    answer: 'El Doble Factor de Autenticación (2FA) añade una capa extra de protección: para ingresar se requiere tu contraseña más un código temporal generado en tu teléfono (como Google Authenticator). Aunque alguien descubra tu contraseña, no podrá entrar sin ese segundo factor.'
  },
  {
    keywords: ['contrasena segura', 'clave segura', 'password robusta'],
    category: 'seguridad',
    recommendedUnit: 'Unidad 7: Ciberseguridad, Privacidad y Navegación Crítica',
    answer: 'Una contraseña segura debe ser una frase de paso larga (más de 12 a 15 caracteres) combinando mayúsculas, minúsculas, números y símbolos (ej: "CafecitoCaliente2026!"), evitando fechas de nacimiento o nombres de familiares.'
  },
  {
    keywords: ['copia 3-2-1', 'respaldo 3-2-1', 'backup seguro', 'regla 321'],
    category: 'seguridad',
    recommendedUnit: 'Unidad 7: Ciberseguridad, Privacidad y Navegación Crítica',
    answer: 'La regla 3-2-1 para copias de seguridad estipula: tener al menos 3 copias de tus datos importantes, en 2 soportes físicos distintos (como tu equipo y un disco externo), y 1 copia fuera del lugar físico (en la nube como Google Drive o OneDrive).'
  },

  // --- INTELIGENCIA ARTIFICIAL ---
  {
    keywords: ['prompt', 'como hacer un prompt', 'crear prompt', 'preguntar a la ia'],
    category: 'ia',
    recommendedUnit: 'Unidad 8: Inteligencia Artificial Ética y Asistentes Productivos',
    answer: 'Un buen prompt se estructura con 4 elementos: 1) Rol ("Actúa como tutor técnico TIC"), 2) Contexto ("Soy un aprendiz preparando una evidencia técnica"), 3) Tarea clara ("Explícame cómo crear tablas dinámicas"), y 4) Formato ("Dame 3 pasos numerados y un ejemplo").'
  },
  {
    keywords: ['alucinacion', 'la ia inventa', 'la ia se equivoca', 'fuentes falsas en ia'],
    category: 'ia',
    recommendedUnit: 'Unidad 8: Inteligencia Artificial Ética y Asistentes Productivos',
    answer: 'Una alucinación ocurre cuando un modelo de IA genera datos falsos, nombres ficticios o citas inexistentes con apariencia de total certeza. Por eso nunca debes aceptar respuestas técnicas o bibliográficas sin contrastarlas en fuentes oficiales.'
  },

  // --- TALLERES INTERACTIVOS DE LA PÁGINA ---
  {
    keywords: ['talleres', 'laboratorios', 'donde estan los talleres', 'practicar', 'simulador'],
    category: 'talleres',
    recommendedUnit: 'Menú superior > Talleres Interactivos',
    answer: 'En este manual cuentas con 8 talleres interactivos prácticos: el Entrenador de Atajos, el Simulador de Formato WhatsApp, el Inspector de Phishing, el Laboratorio de Puertos, el Explorador de Hardware, el Simulador de Excel, el Laboratorio de Operadores de Búsqueda y el Taller de Prompts. Puedes ingresar a cualquiera pulsando el botón "Talleres Interactivos" en la barra de navegación superior.'
  }
];

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Determina si la consulta es EXCLUSIVAMENTE un saludo conversacional
 * sin ninguna pregunta técnica adicional.
 */
function isPureGreeting(normQuestion: string): boolean {
  const pureGreetingPhrases = [
    'hola',
    'hola tutor',
    'hola como estas',
    'hola que tal',
    'buenos dias',
    'buenas tardes',
    'buenas noches',
    'saludos',
    'saludos tutor',
    'que tal',
    'como estas',
    'como te va',
    'quien eres',
    'como te llamas',
    'que haces',
    'como me ayudas',
    'en que me puedes ayudar'
  ];

  if (pureGreetingPhrases.includes(normQuestion)) return true;

  const words = normQuestion.split(' ').filter(w => w.length > 0);
  const greetingWords = new Set(['hola', 'tutor', 'buenos', 'buenas', 'dias', 'tardes', 'noches', 'saludos', 'que', 'tal', 'como', 'estas', 'quien', 'eres']);
  return words.length <= 4 && words.every(w => greetingWords.has(w));
}

function isGratitudeOnly(normQuestion: string): boolean {
  const gratitudePhrases = ['gracias', 'muchas gracias', 'excelente', 'entendido', 'muy bien', 'ok gracias', 'vale gracias'];
  return gratitudePhrases.includes(normQuestion);
}

/**
 * Motor pedagógico de consulta. Busca de forma inteligente y jerárquica:
 * 1. Temas curados de alta prioridad (con soporte para preguntas que incluyen saludos).
 * 2. Glosario técnico especializado.
 * 3. Base curricular de unidades y secciones de UNITS_DATA (por puntuación semántica ponderada).
 * 4. Si el tema está fuera del temario, lo manifiesta con total sinceridad y brinda una guía práctica para investigarlo.
 */
export function queryTicKnowledgeBase(userQuestion: string): TutorResponse {
  const normQuestion = normalizeText(userQuestion);
  if (!normQuestion) {
    return {
      answer: 'Por favor realiza tu pregunta técnica sobre el computador, el manual o las herramientas TIC.',
      recommendedUnit: 'Explora las unidades en el menú superior',
      category: 'general'
    };
  }

  // 1. Manejo de saludos o agradecimientos puros
  if (isPureGreeting(normQuestion)) {
    return {
      answer: '¡Hola! Es un gusto saludarte, aprendiz. Soy tu Tutor pedagógico del Manual TIC. ¿Qué tema deseas explorar hoy? Puedes consultarme sobre qué es el computador, partes del hardware, fórmulas de Excel, documentos en Word, trucos de celular o ciberseguridad.',
      recommendedUnit: 'Unidad 1: Fundamentos de las TIC y del Entorno Digital',
      category: 'saludo'
    };
  }

  if (isGratitudeOnly(normQuestion)) {
    return {
      answer: '¡Con muchísimo gusto, aprendiz! Me alegra que te haya sido de ayuda. Si tienes otra inquietud o quieres practicar en los talleres interactivos de la página, dime cuando quieras.',
      recommendedUnit: 'Manual TIC para Aprendices',
      category: 'general'
    };
  }

  // Detectar si el usuario saludó al inicio de una pregunta técnica (ej. "hola qué es un computador")
  const containsGreeting = normQuestion.includes('hola') || normQuestion.includes('buenos dias') || normQuestion.includes('buenas tardes');
  const greetingIntro = containsGreeting ? '¡Hola, aprendiz! ' : '';

  // Extraer palabras significativas sin stop words
  const rawWords = normQuestion.split(' ').filter(w => w.length >= 2);
  const meaningfulWords = rawWords.filter(w => w.length >= 3 && !SPANISH_STOP_WORDS.has(w));

  // 2. Búsqueda en conocimiento curado
  let bestCurated: CuratedTopic | null = null;
  let bestCuratedScore = 0;

  for (const topic of CURATED_KNOWLEDGE) {
    let score = 0;
    for (const kw of topic.keywords) {
      const normKw = normalizeText(kw);

      // Coincidencia exacta de la frase clave completa
      if (normQuestion.includes(normKw)) {
        score += normKw.length * 5 + 30;
      } else {
        // Coincidencia por palabras clave significativas de la frase
        const kwWords = normKw.split(' ').filter(w => w.length >= 3 && !SPANISH_STOP_WORDS.has(w));
        for (const kwWord of kwWords) {
          if (normQuestion.includes(kwWord)) {
            score += 12;
          }
        }
      }
    }

    if (score > bestCuratedScore) {
      bestCuratedScore = score;
      bestCurated = topic;
    }
  }

  if (bestCurated && bestCuratedScore >= 20) {
    const finalAnswer = containsGreeting && !bestCurated.answer.startsWith('¡Hola')
      ? `${greetingIntro}${bestCurated.answer}`
      : bestCurated.answer;

    return {
      answer: finalAnswer,
      recommendedUnit: bestCurated.recommendedUnit,
      category: bestCurated.category
    };
  }

  // 3. Búsqueda en GLOSSARY_TERMS
  let bestGlossary: typeof GLOSSARY_TERMS[0] | null = null;
  let bestGlossaryScore = 0;

  for (const term of GLOSSARY_TERMS) {
    const normTerm = normalizeText(term.term);
    let score = 0;

    if (normQuestion.includes(normTerm)) {
      score += normTerm.length * 4 + 25;
    } else {
      const termWords = normTerm.split(' ').filter(w => w.length >= 3 && !SPANISH_STOP_WORDS.has(w));
      for (const tw of termWords) {
        if (normQuestion.includes(tw)) {
          score += 10;
        }
      }
    }

    if (score > bestGlossaryScore) {
      bestGlossaryScore = score;
      bestGlossary = term;
    }
  }

  if (bestGlossary && bestGlossaryScore >= 18) {
    return {
      answer: `${greetingIntro}${bestGlossary.term}: ${bestGlossary.definition}. Puedes consultar más detalles en el Glosario técnico del manual.`,
      recommendedUnit: `Glosario de Términos (${bestGlossary.category})`,
      category: bestGlossary.category.toLowerCase()
    };
  }

  // 4. Búsqueda semántica ponderada en secciones de UNITS_DATA
  let bestSection: { sec: any; unit: any; matchedText: string } | null = null;
  let bestSectionScore = 0;

  if (meaningfulWords.length > 0) {
    for (const unit of UNITS_DATA) {
      for (const sec of unit.sections) {
        const normTitle = normalizeText(sec.title);
        const normContent = normalizeText(sec.content);
        let secScore = 0;

        // Puntos por coincidencia de palabras significativas en el título
        for (const mw of meaningfulWords) {
          if (normTitle.includes(mw)) {
            secScore += 30;
          }
        }

        // Puntos por bigramas en el título
        for (let i = 0; i < meaningfulWords.length - 1; i++) {
          const bigram = `${meaningfulWords[i]} ${meaningfulWords[i + 1]}`;
          if (normTitle.includes(bigram)) {
            secScore += 45;
          }
        }

        // Puntos por palabras en el contenido
        for (const mw of meaningfulWords) {
          if (normContent.includes(mw)) {
            secScore += 4;
          }
        }

        if (secScore > bestSectionScore && secScore >= 24) {
          bestSectionScore = secScore;

          // Buscar el párrafo más relevante del contenido
          const paragraphs = sec.content
            .split('\n')
            .map(p => p.trim())
            .filter(p => p.length > 50 && !p.startsWith('#') && !p.startsWith('-'));

          let bestP = paragraphs[0] || '';
          let bestPScore = 0;
          for (const p of paragraphs) {
            const normP = normalizeText(p);
            let pScore = 0;
            for (const mw of meaningfulWords) {
              if (normP.includes(mw)) pScore += 10;
            }
            if (pScore > bestPScore) {
              bestPScore = pScore;
              bestP = p;
            }
          }

          bestSection = {
            sec,
            unit,
            matchedText: bestP
          };
        }
      }
    }
  }

  if (bestSection && bestSectionScore >= 24) {
    const cleanParagraph = bestSection.matchedText
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/`{1,3}[^`]*`{1,3}/g, '')
      .slice(0, 320);

    return {
      answer: `${greetingIntro}${cleanParagraph}... Puedes profundizar en este tema en la ${bestSection.unit.title} (${bestSection.sec.title}).`,
      recommendedUnit: `Unidad ${bestSection.unit.unitNumber}: ${bestSection.unit.title}`,
      category: 'unidades'
    };
  }

  // 5. Si no se conoce la respuesta: manifestarlo con sinceridad pedagógica y guiar al aprendiz
  return {
    isUnknown: true,
    answer: `${greetingIntro}Actualmente no tengo una referencia directa sobre ese tema específico en el manual técnico.

🔎 Guía práctica para investigarlo de manera confiable:
1. Búsqueda exacta: Escribe en Google "${userQuestion.trim().slice(0, 35)}" entre comillas para encontrar coincidencias literales.
2. Fuentes oficiales: Si es sobre computadores o software, consulta documentación de fabricantes y portales educativos como Microsoft Learn, MDN Web Docs o sitios .edu.
3. Temas disponibles del manual: Puedes preguntarme sobre ¿Qué es el computador?, el ciclo de procesamiento, memoria RAM, fórmulas de Excel, atajos de teclado, trucos de celular o ciberseguridad. ¿Sobre cuál te gustaría aprender ahora?`,
    recommendedUnit: 'Guía de Consulta y Autoaprendizaje Técnico',
    category: 'orientacion'
  };
}
