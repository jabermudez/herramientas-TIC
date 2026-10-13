/**
 * Motor pedagógico de conocimiento TIC para el Tutor de Voz.
 * Funciona de manera 100% autónoma en el navegador (compatible con GitHub Pages,
 * modo offline y entornos estáticos), proporcionando explicaciones claras,
 * cálidas y pedagógicas con lenguaje accesible en español.
 */

interface TopicResponse {
  keywords: string[];
  answer: string;
  recommendedUnit?: string;
  category: 'hardware' | 'ofimatica' | 'excel' | 'movil' | 'whatsapp' | 'atajos' | 'seguridad' | 'ia' | 'general';
}

const TIC_KNOWLEDGE_BASE: TopicResponse[] = [
  // --- HARDWARE ---
  {
    keywords: ['ram', 'memoria ram', 'borra al apagar', 'volatil'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'La memoria RAM es un componente de almacenamiento temporal ultrarrápido y volátil. Esto significa que necesita energía eléctrica constante para mantener los datos. Cuando apagas la computadora, la electricidad cesa y todo su contenido se borra inmediatamente. Su función principal es permitir que el procesador trabaje al mismo tiempo con múltiples programas abiertos sin ralentizarse.'
  },
  {
    keywords: ['cpu', 'procesador', 'cerebro'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'La CPU o Procesador es el verdadero cerebro de la computadora. Se encarga de interpretar las instrucciones de los programas y ejecutar todos los cálculos matemáticos y lógicos del sistema. Su rendimiento se mide por sus núcleos de procesamiento y su velocidad en gigahercios (GHz).'
  },
  {
    keywords: ['ssd', 'disco solido', 'disco duro', 'hdd', 'diferencia entre disco'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'La gran diferencia es que un disco mecánico tradicional (HDD) tiene platos magnéticos giratorios y agujas físicas, mientras que una unidad de estado sólido (SSD) usa chips de memoria flash sin piezas móviles. Un SSD es entre 5 y 10 veces más rápido para arrancar la PC, abrir programas y no se daña con golpes leves.'
  },
  {
    keywords: ['mantenimiento', 'calienta', 'ventilador', 'limpiar pc', 'polvo', 'pasta termica'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'El sobrecalentamiento suele deberse a acumulación de polvo en los disipadores y ventiladores, o a pasta térmica seca. Se recomienda realizar mantenimiento preventivo cada 6 a 12 meses: limpiar con aire comprimido, cambiar la pasta térmica y verificar que el flujo de aire no esté obstruido.'
  },

  // --- EXCEL Y HOJAS DE CÁLCULO ---
  {
    keywords: ['si', 'formula si', '=si', 'condicional'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'La función =SI en Excel evalúa una condición lógica y devuelve un resultado si se cumple y otro diferente si no. Su sintaxis básica es: =SI(condición; valor_si_verdadero; valor_si_falso). Por ejemplo: =SI(A2>=3; "Aprobado"; "Reprobado"). ¡Es fundamental para tomar decisiones automáticas en tus tablas!'
  },
  {
    keywords: ['suma', '=suma', 'sumar celdas'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'La función =SUMA permite totalizar un rango continuo o discontinuo de números rápidamente. En lugar de escribir =A1+A2+A3, escribes =SUMA(A1:A50). También puedes usar el atajo Alt + Shift + = en Windows para insertar una autosuma automática.'
  },
  {
    keywords: ['buscarv', 'buscarx', 'vlookup', 'buscar datos'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'BUSCARV busca un valor en la primera columna izquierda de una tabla y devuelve el dato de otra columna hacia la derecha. Su versión moderna, BUSCARX, es mucho más potente: busca tanto a la izquierda como a la derecha, no se rompe si insertas columnas y permite definir mensajes si el dato no se encuentra.'
  },
  {
    keywords: ['signo de dolar', 'fijar celda', 'referencia absoluta', '$a$1', 'f4'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'El signo de dólar ($) en Excel se usa para fijar una celda al arrastrar una fórmula, creando una referencia absoluta. Si escribes $A$1, ni la columna A ni la fila 1 cambiarán al copiar la fórmula. Puedes insertarlo rápidamente presionando la tecla F4 mientras editas la referencia.'
  },
  {
    keywords: ['tabla dinamica', 'resumir datos'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'Una Tabla Dinámica es la herramienta más poderosa de Excel para resumir y analizar grandes volúmenes de datos en segundos sin escribir fórmulas complejas. Te permite arrastrar campos a filas, columnas y valores para obtener totales, promedios y porcentajes al instante.'
  },

  // --- OFIMÁTICA Y PROCESADORES DE TEXTO ---
  {
    keywords: ['word', 'indice', 'tabla de contenido', 'estilos'],
    category: 'ofimatica',
    recommendedUnit: 'Unidad 3: Procesamiento de Textos y Documentación',
    answer: 'Para crear un índice o tabla de contenido automática en Word, debes aplicar estilos de Título (Título 1, Título 2) a cada encabezado de tu documento. Luego, vas a la pestaña "Referencias" y seleccionas "Tabla de contenido". ¡Se creará y actualizará sola con un solo clic!'
  },
  {
    keywords: ['combinar correspondencia', 'cartas masivas', 'certificados'],
    category: 'ofimatica',
    recommendedUnit: 'Unidad 3: Procesamiento de Textos y Documentación',
    answer: 'La combinación de correspondencia permite vincular una plantilla de Word con una lista de datos en Excel (como nombres, correos o calificaciones). Al procesarla, genera cientos de cartas o certificados personalizados en cuestión de segundos.'
  },

  // --- CELULARES Y SMARTPHONES ---
  {
    keywords: ['liberar espacio', 'memoria llena', 'almacenamiento celular', 'borrar cache'],
    category: 'movil',
    recommendedUnit: 'Unidad 5: Ecosistema Móvil y Productividad en Smartphones',
    answer: 'Para liberar espacio en tu celular sin perder fotos personales: 1) Borra la memoria caché de aplicaciones pesadas como Instagram, TikTok y navegadores. 2) En WhatsApp, ve a Ajustes > Almacenamiento y elimina videos reenviados pesados. 3) Usa Google Fotos o iCloud con copia de seguridad para luego presionar "Liberar espacio en el dispositivo".'
  },
  {
    keywords: ['bateria celular', 'durar bateria', 'cuidar bateria'],
    category: 'movil',
    recommendedUnit: 'Unidad 5: Ecosistema Móvil y Productividad en Smartphones',
    answer: 'Para cuidar la batería de iones de litio de tu teléfono: mantén la carga entre el 20% y el 80%, evita que llegue al 0%, no uses el celular para jugar intensamente mientras está conectado al cargador (el calor excesivo degrada la batería) y desactiva el brillo al máximo.'
  },

  // --- WHATSAPP Y MENSAJERÍA ---
  {
    keywords: ['whatsapp', 'calidad hd', 'foto hd', 'video hd'],
    category: 'whatsapp',
    recommendedUnit: 'Unidad 5: Ecosistema Móvil y Productividad en Smartphones',
    answer: 'Para enviar fotos o videos sin que WhatsApp los comprima en baja resolución: antes de presionar enviar, toca el botón "HD" en la parte superior de la vista previa y selecciona "Calidad HD". O mejor aún, envíalo como "Documento" para preservar el archivo 100% original con sus metadatos.'
  },
  {
    keywords: ['estafa whatsapp', 'seguridad whatsapp', 'codigo de 6 digitos', 'clonar whatsapp'],
    category: 'whatsapp',
    recommendedUnit: 'Unidad 5: Ecosistema Móvil y Productividad en Smartphones',
    answer: '¡Regla de oro de seguridad en WhatsApp! NUNCA compartas con nadie un código de 6 dígitos que te llegue por SMS, ni siquiera si te lo pide un conocido. Además, activa de inmediato la "Verificación en dos pasos" en Ajustes > Cuenta > Verificación en dos pasos. Eso te pedirá un PIN propio y evitará que te roben la cuenta.'
  },

  // --- CIBERSEGURIDAD Y PROTECCIÓN ---
  {
    keywords: ['phishing', 'correo falso', 'suplantacion', 'estafa'],
    category: 'seguridad',
    recommendedUnit: 'Unidad 7: Ciberseguridad, Privacidad y Navegación Crítica',
    answer: 'El Phishing es una técnica de engaño donde delincuentes se hacen pasar por tu banco, Netflix, Mercado Libre o servicios públicos para que ingreses tu contraseña. Para detectarlo: revisa el dominio exacto del remitente (después del @), desconfía de mensajes que causan urgencia o pánico ("¡Su cuenta será bloqueada!") y nunca hagas clic en enlaces sospechosos.'
  },
  {
    keywords: ['contrasena', 'password', 'clave segura', '2fa', 'doble factor'],
    category: 'seguridad',
    recommendedUnit: 'Unidad 7: Ciberseguridad, Privacidad y Navegación Crítica',
    answer: 'Una contraseña segura no debe ser una sola palabra con números predecibles. Lo ideal es usar frases de paso largas (ejemplo: "MiGatoTomaCafeEn1998!"). Además, es indispensable activar el Doble Factor de Autenticación (2FA) en tu correo y redes sociales mediante aplicaciones autenticadoras.'
  },
  {
    keywords: ['copia de seguridad 3-2-1', 'respaldo', 'backup'],
    category: 'seguridad',
    recommendedUnit: 'Unidad 7: Ciberseguridad, Privacidad y Navegación Crítica',
    answer: 'La regla de oro 3-2-1 para copias de seguridad establece: Mantener 3 copias de tus datos importantes, en 2 soportes físicos distintos (como tu PC y un disco externo), y con al menos 1 copia fuera de tu hogar u oficina (en la nube, como Google Drive o OneDrive).'
  },

  // --- ATAJOS DE TECLADO ---
  {
    keywords: ['atajo', 'pestanas', 'recuperar pestana', 'ctrl shift t'],
    category: 'atajos',
    recommendedUnit: 'Unidad 6: Atajos de Teclado y Flujos de Alta Velocidad',
    answer: '¡El mejor atajo para salvar tu día en el navegador es Ctrl + Shift + T (o Cmd + Shift + T en Mac)! Si cerraste por accidente una pestaña con un trabajo o información valiosa, este atajo la reabre de inmediato en el mismo punto donde estaba.'
  },
  {
    keywords: ['portapapeles', 'win v', 'historial de copiar'],
    category: 'atajos',
    recommendedUnit: 'Unidad 6: Atajos de Teclado y Flujos de Alta Velocidad',
    answer: 'Presionar la tecla Windows + V abre el Historial del Portapapeles en Windows. En lugar de poder pegar solo lo último que copiaste, te muestra una lista con textos, enlaces e imágenes copiadas previamente para pegarlas cuantas veces quieras.'
  },
  {
    keywords: ['captura de pantalla', 'recorte', 'win shift s'],
    category: 'atajos',
    recommendedUnit: 'Unidad 6: Atajos de Teclado y Flujos de Alta Velocidad',
    answer: 'El atajo Windows + Shift + S activa la herramienta de recorte selectivo. Te permite seleccionar un área rectangular exacta, una ventana o dibujar a mano alzada, copiando la imagen al portapapeles sin necesidad de abrir ningún programa adicional.'
  },

  // --- INTELIGENCIA ARTIFICIAL ---
  {
    keywords: ['prompt', 'como hacer prompt', 'preguntar a la ia', 'inteligencia artificial'],
    category: 'ia',
    recommendedUnit: 'Unidad 8: Inteligencia Artificial Ética y Asistentes Productivos',
    answer: 'Para obtener las mejores respuestas de una Inteligencia Artificial, estructura tu prompt con 4 elementos: 1) Rol ("Actúa como un profesor TIC"), 2) Contexto ("Soy un estudiante principiante"), 3) Tarea clara ("Explícame cómo crear una tabla en Word"), y 4) Formato deseado ("Dame 3 pasos numerados y un ejemplo").'
  },
  {
    keywords: ['alucinacion', 'la ia miente', 'verificar fuentes'],
    category: 'ia',
    recommendedUnit: 'Unidad 8: Inteligencia Artificial Ética y Asistentes Productivos',
    answer: 'Una "alucinación" ocurre cuando un modelo de Inteligencia Artificial genera información falsa, inventa fechas o citas bibliográficas que suenan convincentes pero no existen en la realidad. Por eso nunca debes aceptar respuestas críticas sin contrastarlas con fuentes oficiales o bibliografía de respaldo.'
  }
];

/**
 * Busca en la base de conocimientos la mejor respuesta pedagógica
 * para la consulta del estudiante.
 */
export function queryTicKnowledgeBase(userQuestion: string): {
  answer: string;
  recommendedUnit?: string;
  category: string;
} {
  const normalized = userQuestion
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  let bestMatch: TopicResponse | null = null;
  let highestScore = 0;

  for (const item of TIC_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.keywords) {
      const kwNorm = kw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (normalized.includes(kwNorm)) {
        score += kwNorm.length * 2; // Más peso a coincidencias largas
      } else {
        // Coincidencia de palabras individuales
        const words = kwNorm.split(' ');
        for (const w of words) {
          if (w.length > 3 && normalized.includes(w)) {
            score += 1;
          }
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore > 0) {
    return {
      answer: bestMatch.answer,
      recommendedUnit: bestMatch.recommendedUnit,
      category: bestMatch.category
    };
  }

  // Respuesta pedagógica contextual por defecto si la pregunta no coincide exactamente
  return {
    answer: `Excelente pregunta sobre "${userQuestion.slice(0, 60)}". En el Manual de Herramientas TIC abordamos este tema paso a paso. Te sugiero explorar las unidades temáticas desde el menú superior, o usar el buscador global en la cabecera para ver explicaciones detalladas y talleres prácticos paso a paso.`,
    recommendedUnit: 'Explora las Unidades del Manual en la barra superior',
    category: 'general'
  };
}
