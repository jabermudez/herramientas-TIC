/**
 * Motor pedagógico de conocimiento TIC para el Tutor de Voz.
 * Funciona tanto conectado como de forma 100% autónoma en el navegador.
 * Conoce todo el contenido del Manual de Herramientas TIC para Aprendices:
 * las 8 unidades, glosario, atajos, talleres interactivos y conceptos tecnológicos.
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

const CURATED_KNOWLEDGE: CuratedTopic[] = [
  // --- TALLERES INTERACTIVOS DE LA PÁGINA ---
  {
    keywords: ['talleres', 'laboratorios', 'donde estan los talleres', 'practicar', 'simulador'],
    category: 'talleres',
    recommendedUnit: 'Menú superior > Talleres Interactivos',
    answer: 'En este manual cuentas con 8 talleres interactivos prácticos: el Entrenador de Atajos, el Simulador de Formato WhatsApp, el Inspector de Phishing, el Laboratorio de Puertos, el Explorador de Hardware, el Simulador de Excel, el Laboratorio de Operadores de Búsqueda y el Taller de Prompts. Puedes ingresar a cualquiera pulsando el botón "Talleres Interactivos" en la barra de navegación superior.'
  },
  {
    keywords: ['taller de atajos', 'entrenador de atajos'],
    category: 'talleres',
    recommendedUnit: 'Taller: Entrenador de Atajos de Teclado',
    answer: 'El Entrenador de Atajos te permite pulsar combinaciones reales en tu teclado físico (como Ctrl+C, Ctrl+Shift+T o Win+V) y recibir retroalimentación visual interactiva en tiempo real para ganar velocidad.'
  },
  {
    keywords: ['taller de whatsapp', 'simulador de whatsapp'],
    category: 'talleres',
    recommendedUnit: 'Taller: Simulador de Formato WhatsApp',
    answer: 'En el Simulador de WhatsApp puedes redactar textos y aplicar negrita (*texto*), cursiva (_texto_), tachado (~texto~) y monoespaciado (```texto```), viendo en pantalla una simulación exacta de cómo se verá el mensaje en un teléfono móvil.'
  },
  {
    keywords: ['taller de phishing', 'inspector de phishing'],
    category: 'talleres',
    recommendedUnit: 'Taller: Inspector de Phishing',
    answer: 'El Inspector de Phishing te presenta casos reales de correos bancarios sospechosos y ofertas fraudulentas para que aprendas a inspeccionar el dominio del remitente, los enlaces engañosos y los trucos de urgencia psicológica.'
  },
  {
    keywords: ['taller de puertos', 'laboratorio de puertos'],
    category: 'talleres',
    recommendedUnit: 'Taller: Laboratorio de Puertos y Cables',
    answer: 'En el Laboratorio de Puertos puedes explorar conectores físicos como USB Tipo A, USB-C, HDMI, DisplayPort, RJ-45 Ethernet y conector de audio Jack de 3.5mm, conociendo su velocidad y usos recomendados.'
  },
  {
    keywords: ['taller de hardware', 'explorador de hardware'],
    category: 'talleres',
    recommendedUnit: 'Taller: Explorador Interactivo de Hardware',
    answer: 'El Explorador de Hardware te muestra el chasis y la arquitectura interna de un computador: CPU, memoria RAM, unidad SSD, placa madre, disipador y fuente de poder con especificaciones claras.'
  },
  {
    keywords: ['taller de excel', 'simulador de hoja de calculo'],
    category: 'talleres',
    recommendedUnit: 'Taller: Simulador de Hoja de Cálculo',
    answer: 'El Simulador de Excel te permite probar fórmulas analíticas reales interactivas como =SUMA, =PROMEDIO, =SI y referencias absolutas directamente en una tabla dinámica en tu navegador.'
  },

  // --- HARDWARE Y ARQUITECTURA ---
  {
    keywords: ['ram', 'memoria ram', 'borra al apagar', 'volatil'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'La memoria RAM es la memoria de trabajo temporal ultrarrápida y volátil del computador. Requiere energía eléctrica constante para retener los datos; al apagar el equipo se vacía por completo. Permite que el procesador ejecute múltiples aplicaciones abiertas simultáneamente con máxima agilidad.'
  },
  {
    keywords: ['cpu', 'procesador', 'cerebro del pc'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'La CPU o Procesador es el cerebro del computador. Su misión es decodificar las instrucciones de los programas y efectuar los cálculos lógicos y aritméticos. Su rendimiento depende de la cantidad de núcleos de procesamiento y de su frecuencia medida en gigahercios (GHz).'
  },
  {
    keywords: ['gpu', 'tarjeta de video', 'grafica'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'La GPU o Tarjeta Gráfica está diseñada con miles de micro-núcleos en paralelo para procesar imágenes, video en alta resolución, modelado 3D, videojuegos y procesamiento de modelos de Inteligencia Artificial.'
  },
  {
    keywords: ['ssd', 'disco solido', 'disco duro', 'hdd', 'diferencia entre disco'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'La diferencia principal es que los discos duros mecánicos (HDD) usan platos magnéticos giratorios y agujas lectoras, mientras que las unidades de estado sólido (SSD) usan chips de memoria flash sin piezas mecánicas móviles. Un SSD es de 5 a 10 veces más rápido al iniciar Windows y abrir programas.'
  },
  {
    keywords: ['mantenimiento', 'calienta', 'ventilador', 'limpiar pc', 'polvo', 'pasta termica'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'El sobrecalentamiento ocurre cuando el polvo obstruye los disipadores o la pasta térmica se reseca. Se recomienda realizar mantenimiento preventivo cada 6 a 12 meses: retirar el polvo con aire comprimido, renovar la pasta térmica del procesador y verificar la ventilación del chasis.'
  },
  {
    keywords: ['placa madre', 'motherboard', 'tarjeta madre'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'La placa madre es el circuito principal que interconecta todos los componentes del computador: el procesador, la memoria RAM, los discos de almacenamiento, las tarjetas de expansión y los puertos periféricos a través de buses de datos.'
  },
  {
    keywords: ['fuente de poder', 'fuente de alimentacion', 'psu'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'La fuente de poder transforma la corriente alterna del tomacorriente de la pared en corriente continua de bajo voltaje (12V, 5V, 3.3V) para alimentar de manera segura y regulada los componentes del computador.'
  },
  {
    keywords: ['usb-c', 'tipo c', 'conector reversible'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'USB-C es un estándar de conector reversible de 24 pines que permite transferir datos a alta velocidad, enviar señal de video a monitores y cargar dispositivos a gran potencia con el mismo cable.'
  },
  {
    keywords: ['hdmi', 'displayport', 'cable de video'],
    category: 'hardware',
    recommendedUnit: 'Unidad 2: Arquitectura del Hardware y Diagnóstico',
    answer: 'HDMI transmite audio y video digital a televisores y monitores comunes. DisplayPort es el estándar preferido en computadores profesionales y monitores de alta frecuencia de refresco (Hz), ya que soporta mayor ancho de banda.'
  },

  // --- FUNDAMENTOS TIC Y NUBE ---
  {
    keywords: ['que son las tic', 'concepto de tic', 'definicion tic'],
    category: 'fundamentos',
    recommendedUnit: 'Unidad 1: Fundamentos de las TIC y del Entorno Digital',
    answer: 'Las TIC (Tecnologías de la Información y la Comunicación) son el conjunto convergente de herramientas electrónicas, programas informáticos y redes de comunicación que permiten procesar, almacenar, transmitir e intercambiar información en texto, audio, video y datos.'
  },
  {
    keywords: ['hardware y software', 'diferencia entre hardware'],
    category: 'fundamentos',
    recommendedUnit: 'Unidad 1: Fundamentos de las TIC y del Entorno Digital',
    answer: 'El hardware es la parte física y tangible del computador (teclado, pantalla, procesador, cables; lo que se puede tocar). El software es la parte lógica e intangible (sistemas operativos, programas y aplicaciones como Windows, Excel o navegadores).'
  },
  {
    keywords: ['cloud', 'la nube', 'cloud computing', 'guardar en la nube'],
    category: 'fundamentos',
    recommendedUnit: 'Unidad 1: Fundamentos de las TIC y del Entorno Digital',
    answer: 'La computación en la nube consiste en almacenar archivos y ejecutar servicios en centros de datos remotos conectados a Internet (como Google Drive o OneDrive) en lugar de depender únicamente del disco local de tu dispositivo, permitiendo acceder a tu trabajo desde cualquier lugar.'
  },
  {
    keywords: ['https', 'candado', 'seguridad web'],
    category: 'fundamentos',
    recommendedUnit: 'Unidad 1: Fundamentos de las TIC y del Entorno Digital',
    answer: 'El prefijo HTTPS y el candado en la barra de direcciones indican que la conexión entre tu navegador y el sitio web está cifrada con un certificado digital, protegiendo tus datos y contraseñas de ser interceptados en la red.'
  },
  {
    keywords: ['huella digital', 'rastro en internet'],
    category: 'fundamentos',
    recommendedUnit: 'Unidad 1: Fundamentos de las TIC y del Entorno Digital',
    answer: 'La huella digital es el rastro permanente de datos que dejas en Internet cada vez que navegas, publicas fotos, envías formularios, comentas en redes o buscas información. Es fundamental gestionarla con privacidad y responsabilidad.'
  },

  // --- PROCESAMIENTO DE TEXTO (WORD) ---
  {
    keywords: ['word', 'tabla de contenido', 'crear indice', 'indice automatico'],
    category: 'ofimatica',
    recommendedUnit: 'Unidad 3: Procesamiento de Textos y Documentación',
    answer: 'Para crear una tabla de contenido automática en Word: aplica estilos de "Título 1" y "Título 2" a tus encabezados desde la pestaña Inicio. Luego ve a la pestaña "Referencias", haz clic en "Tabla de contenido" y selecciona el estilo automático. ¡Se actualizará sola con un solo clic!'
  },
  {
    keywords: ['combinar correspondencia', 'cartas masivas', 'diplomas masivos'],
    category: 'ofimatica',
    recommendedUnit: 'Unidad 3: Procesamiento de Textos y Documentación',
    answer: 'La combinación de correspondencia permite enlazar un documento base en Word con una lista de datos en Excel (nombres, correos, notas), generando en segundos cientos de certificados o cartas personalizadas sin escribirlas una a una.'
  },
  {
    keywords: ['normas apa', 'formato apa', 'citar apa'],
    category: 'ofimatica',
    recommendedUnit: 'Unidad 3: Procesamiento de Textos y Documentación',
    answer: 'Las Normas APA establecen estándares para documentos académicos: márgenes de 2.54 cm en todos los lados, fuente legible (como Times New Roman 12 o Calibri 11), interlineado doble, sangría de 1.27 cm en la primera línea de cada párrafo y citas estructuradas por Autor y Año.'
  },

  // --- EXCEL Y HOJAS DE CÁLCULO ---
  {
    keywords: ['si', 'formula si', '=si', 'condicional excel'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'La función =SI evalúa una condición lógica y devuelve un resultado si es verdadera y otro si es falsa. Su estructura es =SI(prueba_lógica; valor_si_verdadero; valor_si_falso). Por ejemplo: =SI(C2>=3; "Aprobado"; "Pendiente").'
  },
  {
    keywords: ['buscarv', 'buscarx', 'vlookup'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'BUSCARV busca un dato en la primera columna a la izquierda de una tabla y devuelve el dato de otra columna a la derecha. Por su parte, la moderna función BUSCARX busca tanto a la izquierda como a la derecha, no se altera si insertas columnas y permite definir un mensaje personalizado si no encuentra el dato.'
  },
  {
    keywords: ['suma', 'sumar en excel', '=suma'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'La función =SUMA calcula rápidamente el total de un rango de celdas numéricas, por ejemplo =SUMA(B2:B50). También puedes pulsar el atajo rápido Alt + Shift + = en Windows para insertar una autosuma automática.'
  },
  {
    keywords: ['signo de dolar', 'fijar celda', 'referencia absoluta', '$a$1', 'tecla f4'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'El signo de dólar ($) en Excel bloquea una fila o columna al arrastrar una fórmula para crear una referencia absoluta (ejemplo: $B$1). Puedes insertarlo al instante pulsando la tecla F4 mientras editas la referencia.'
  },
  {
    keywords: ['tabla dinamica', 'resumen de datos excel'],
    category: 'excel',
    recommendedUnit: 'Unidad 4: Hoja de Cálculo Analítica con Excel',
    answer: 'Las tablas dinámicas permiten resumir, filtrar y agrupar miles de filas de datos en segundos sin escribir fórmulas complejas, permitiendo arrastrar campos a filas, columnas y valores numéricos para análisis inmediato.'
  },

  // --- CELULARES Y SMARTPHONES ---
  {
    keywords: ['liberar espacio', 'memoria llena', 'almacenamiento celular', 'borrar cache'],
    category: 'movil',
    recommendedUnit: 'Unidad 5: Ecosistema Móvil y Productividad en Smartphones',
    answer: 'Para liberar espacio en tu celular: 1) Limpia la memoria caché de aplicaciones pesadas en Ajustes > Aplicaciones. 2) En WhatsApp, ve a Ajustes > Almacenamiento y elimina videos reenviados pesados. 3) Usa la opción "Liberar espacio" de Google Fotos para borrar fotos que ya tengan copia segura en la nube.'
  },
  {
    keywords: ['bateria celular', 'cuidar bateria', 'duracion bateria'],
    category: 'movil',
    recommendedUnit: 'Unidad 5: Ecosistema Móvil y Productividad en Smartphones',
    answer: 'Para alargar la vida útil de la batería: mantén la carga habitual entre el 20% y el 80%, evita que se descargue a 0%, no utilices el celular intensamente mientras se carga para evitar calentamiento y activa el brillo automático.'
  },
  {
    keywords: ['whatsapp hd', 'foto hd', 'video hd'],
    category: 'movil',
    recommendedUnit: 'Unidad 5: Ecosistema Móvil y Productividad en Smartphones',
    answer: 'Para enviar fotos y videos con máxima calidad en WhatsApp, toca el botón "HD" en la parte superior antes de enviar y selecciona "Calidad HD". O si necesitas preservar el archivo original sin ninguna compresión, envíalo como "Documento".'
  },
  {
    keywords: ['whatsapp web', 'usar whatsapp en pc'],
    category: 'movil',
    recommendedUnit: 'Unidad 5: Ecosistema Móvil y Productividad en Smartphones',
    answer: 'Con WhatsApp Web multidispositivo puedes conectar hasta 4 computadores desde web.whatsapp.com escaneando el código QR. Una vez vinculado, funcionará de manera independiente aunque tu celular esté apagado o sin conexión a Internet.'
  },

  // --- ATAJOS DE TECLADO ---
  {
    keywords: ['recuperar pestana', 'ctrl shift t', 'reabrir pestana'],
    category: 'atajos',
    recommendedUnit: 'Unidad 6: Atajos de Teclado y Flujos de Alta Velocidad',
    answer: 'El atajo Ctrl + Shift + T (o Cmd + Shift + T en Mac) restaura inmediatamente la última pestaña cerrada por accidente en el navegador, conservando todo el historial de navegación de esa página.'
  },
  {
    keywords: ['portapapeles', 'win v', 'historial de copiado'],
    category: 'atajos',
    recommendedUnit: 'Unidad 6: Atajos de Teclado y Flujos de Alta Velocidad',
    answer: 'La combinación Windows + V abre el Historial del Portapapeles en Windows. Te permite ver y pegar cualquiera de los últimos textos, imágenes o enlaces copiados, en lugar de conservar únicamente el último elemento.'
  },
  {
    keywords: ['captura de pantalla', 'win shift s', 'recorte de pantalla'],
    category: 'atajos',
    recommendedUnit: 'Unidad 6: Atajos de Teclado y Flujos de Alta Velocidad',
    answer: 'El atajo Windows + Shift + S activa la herramienta de recorte selectivo en Windows para capturar un área rectangular precisa, una ventana completa o la pantalla entera y copiarla al portapapeles sin programas adicionales.'
  },
  {
    keywords: ['bloquear pc', 'win l'],
    category: 'atajos',
    recommendedUnit: 'Unidad 6: Atajos de Teclado y Flujos de Alta Velocidad',
    answer: 'Presionar Windows + L bloquea tu sesión de inmediato al levantarte del puesto de trabajo, protegiendo tus documentos y credenciales de miradas de terceros.'
  },

  // --- CIBERSEGURIDAD ---
  {
    keywords: ['phishing', 'correo falso', 'estafa bancaria', 'suplantacion'],
    category: 'seguridad',
    recommendedUnit: 'Unidad 7: Ciberseguridad, Privacidad y Navegación Crítica',
    answer: 'El Phishing es un engaño donde delincuentes suplantan a entidades bancarias o plataformas conocidas mediante correos o mensajes urgentes para robar contraseñas. Siempre revisa el dominio exacto del remitente después del @ y nunca ingreses tus credenciales desde enlaces recibidos.'
  },
  {
    keywords: ['2fa', 'doble factor', 'mfa', 'autenticacion en dos pasos'],
    category: 'seguridad',
    recommendedUnit: 'Unidad 7: Ciberseguridad, Privacidad y Navegación Crítica',
    answer: 'El Doble Factor de Autenticación (2FA) añade una capa extra de protección: para ingresar se requiere tu contraseña más un código temporal generado en tu teléfono (como Google Authenticator). Aunque alguien descubra tu contraseña, no podrá entrar sin ese segundo factor.'
  },
  {
    keywords: ['contrasena segura', 'clave segura', 'password'],
    category: 'seguridad',
    recommendedUnit: 'Unidad 7: Ciberseguridad, Privacidad y Navegación Crítica',
    answer: 'Una contraseña segura debe ser una frase de paso larga (más de 12 a 15 caracteres) combinando mayúsculas, minúsculas, números y símbolos (ej: "CafecitoCaliente2026!"), evitando fechas de nacimiento o nombres de familiares.'
  },
  {
    keywords: ['copia 3-2-1', 'respaldo 3-2-1', 'backup seguro'],
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
    keywords: ['alucinacion', 'la ia inventa', 'la ia se equivoca', 'fuentes falsas'],
    category: 'ia',
    recommendedUnit: 'Unidad 8: Inteligencia Artificial Ética y Asistentes Productivos',
    answer: 'Una alucinación ocurre cuando un modelo de IA genera datos falsos, nombres ficticios o citas inexistentes con apariencia de total certeza. Por eso nunca debes aceptar respuestas técnicas o bibliográficas sin contrastarlas en fuentes oficiales.'
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
 * Motor pedagógico de consulta. Busca exhaustivamente en la base de datos
 * curricular del manual (curada, glosario, unidades y secciones).
 * Si no encuentra una respuesta técnica confiable, lo manifiesta con
 * sinceridad pedagógica y proporciona una guía práctica de cómo averiguarlo.
 */
export function queryTicKnowledgeBase(userQuestion: string): TutorResponse {
  const normQuestion = normalizeText(userQuestion);
  if (!normQuestion) {
    return {
      answer: 'Por favor realiza tu pregunta técnica sobre el manual o las herramientas TIC.',
      recommendedUnit: 'Explora las unidades en el menú superior',
      category: 'general'
    };
  }

  const queryWords = normQuestion.split(' ').filter(w => w.length > 2);

  // 1. Búsqueda en conocimiento curado
  let bestCurated: CuratedTopic | null = null;
  let bestCuratedScore = 0;

  for (const topic of CURATED_KNOWLEDGE) {
    let score = 0;
    for (const kw of topic.keywords) {
      const normKw = normalizeText(kw);
      if (normQuestion.includes(normKw)) {
        score += normKw.length * 3;
      } else {
        const kwWords = normKw.split(' ');
        for (const kwWord of kwWords) {
          if (kwWord.length > 3 && normQuestion.includes(kwWord)) {
            score += 2;
          }
        }
      }
    }
    if (score > bestCuratedScore) {
      bestCuratedScore = score;
      bestCurated = topic;
    }
  }

  if (bestCurated && bestCuratedScore >= 6) {
    return {
      answer: bestCurated.answer,
      recommendedUnit: bestCurated.recommendedUnit,
      category: bestCurated.category
    };
  }

  // 2. Búsqueda en GLOSSARY_TERMS
  let bestGlossary: typeof GLOSSARY_TERMS[0] | null = null;
  let bestGlossaryScore = 0;

  for (const term of GLOSSARY_TERMS) {
    const normTerm = normalizeText(term.term);
    let score = 0;
    if (normQuestion.includes(normTerm)) {
      score += 15;
    } else {
      const termWords = normTerm.split(' ');
      for (const tw of termWords) {
        if (tw.length > 3 && normQuestion.includes(tw)) {
          score += 4;
        }
      }
    }

    if (score > bestGlossaryScore) {
      bestGlossaryScore = score;
      bestGlossary = term;
    }
  }

  if (bestGlossary && bestGlossaryScore >= 8) {
    return {
      answer: `${bestGlossary.term}: ${bestGlossary.definition}`,
      recommendedUnit: `Glosario de Términos (${bestGlossary.category})`,
      category: bestGlossary.category.toLowerCase()
    };
  }

  // 3. Búsqueda en secciones y unidades de UNITS_DATA
  for (const unit of UNITS_DATA) {
    for (const sec of unit.sections) {
      const normTitle = normalizeText(sec.title);
      let matches = 0;
      for (const qw of queryWords) {
        if (normTitle.includes(qw)) {
          matches++;
        }
      }

      if (matches >= 2 || (queryWords.length === 1 && normTitle.includes(queryWords[0]))) {
        // Extraer primer párrafo explicativo del contenido
        const firstParagraph = sec.content
          .split('\n')
          .map(p => p.trim())
          .filter(p => p.length > 40 && !p.startsWith('#') && !p.startsWith('-'))[0];

        if (firstParagraph) {
          const cleanParagraph = firstParagraph
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .slice(0, 320);

          return {
            answer: `${cleanParagraph}... Puedes profundizar en este tema en la ${unit.title}.`,
            recommendedUnit: `Unidad ${unit.unitNumber}: ${unit.title}`,
            category: 'unidades'
          };
        }
      }
    }
  }

  // 4. Si después de revisar el manual no se conoce la respuesta con certeza:
  // Manifestar con sinceridad y proporcionar la guía práctica solicitada por el aprendiz
  return {
    isUnknown: true,
    answer: `No tengo registrada una respuesta específica sobre ese tema en el contenido actual del manual. Para que puedas averiguarlo de forma precisa y confiable, te brindo esta guía práctica: 1) Realiza una búsqueda en Google usando comillas con el término exacto (ejemplo: "${userQuestion.slice(0, 35)}"). 2) Consulta la documentación técnica oficial del fabricante o software. 3) Usa el buscador en la barra superior de este manual para consultar conceptos relacionados.`,
    recommendedUnit: 'Guía de Investigación Técnica y Consulta Oficial',
    category: 'orientacion'
  };
}
