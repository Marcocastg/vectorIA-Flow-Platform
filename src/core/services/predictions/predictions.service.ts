import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { envs } from 'src/config/envs';

@Injectable()
export class PredictionsService {
  private readonly logger = new Logger('AI-Service');
  
  // URL de tu API de Python (Render)
  private readonly pythonUrl = envs.PYTHON_API_URL;
  
  // Cliente de Gemini
  private genAI: GoogleGenerativeAI;
  private model: any;

  private readonly axiosConfig = {
    timeout: 60000, // 60000ms = 60 segundos
  };

  constructor(private readonly httpService: HttpService) {
    // 1. Inicializamos Gemini con tu API Key
    // Asegúrate de tener GEMINI_API_KEY en tu archivo .env (y en Railway)
    this.genAI = new GoogleGenerativeAI(envs.GEMINI_API_KEY);
    
    // 2. Configuración del Modelo "Pro"
    // Usamos gemini-1.5-pro para obtener razonamiento avanzado y mejores consejos.
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        temperature: 0.8, // Balance perfecto entre creatividad y precisión
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024, // Suficiente para un análisis de 3-4 párrafos
      }
    }); 
  }

  async wakeUpModels() {
    try {
      this.logger.log('⏰ Enviando señal de despertador a la IA...');
      // Llamamos a la raíz "/" de Python que es ligera y rápida
      // Usamos firstValueFrom o lastValueFrom
      const response = await lastValueFrom(
        this.httpService.get(this.pythonUrl, this.axiosConfig)
      );
      return { status: 'awake', message: 'Motor de IA listo' };
    } catch (error) {
      // No lanzamos error para no bloquear el frontend, solo logueamos
      this.logger.warn('El motor de IA aún está despertando...');
      return { status: 'waking_up' };
    }
  }

  // ===========================================================================
  // MÉTODO 1: CÁLCULO NUMÉRICO (Python Microservice)
  // ===========================================================================
  async getPrediction(platform: string, data: any) {
    const cleanPlatform = platform.toLowerCase().trim();
    
    // Validación básica
    if (!['twitch', 'kick'].includes(cleanPlatform)) {
      throw new HttpException(
        'Plataforma no soportada. Usa "twitch" o "kick".', 
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      // Construir URL: ej. https://mi-ia.onrender.com/predecir/twitch
      const endpoint = cleanPlatform === 'twitch' ? '/predecir/twitch' : '/predecir/kick';
      const fullUrl = `${this.pythonUrl}${endpoint}`;

      this.logger.log(`🤖 Enviando datos numéricos a Python: ${fullUrl}`);

      // Llamada HTTP a tu API de Python
      const response = await lastValueFrom(
        this.httpService.post(fullUrl, data, this.axiosConfig),
      );

      if (response.data && response.data.status === 'success') {
        return response.data;
      } else {
        throw new Error('El motor de IA (Python) no devolvió un estado exitoso');
      }

    } catch (error) {
      this.logger.error(`❌ Error en Python IA: ${error.message}`);
      
      // Manejo de errores específicos de la API de Python
      if (error.response) {
        throw new HttpException(
          error.response.data.detail || 'Error de cálculo matemático', 
          error.response.status
        );
      }
      // Error de conexión (Render dormido o caído)
      throw new HttpException(
        'El motor de predicción no está disponible. Intenta de nuevo en 1 minuto.', 
        HttpStatus.BAD_GATEWAY
      );
    }
  }

  // ===========================================================================
  // MÉTODO 2: ANÁLISIS ESTRATÉGICO (Gemini Pro)
  // ===========================================================================
  async getAnalysis(platform: string, metrics: any) {
    try {
      this.logger.log('🧠 Solicitando consultoría estratégica a Gemini Pro...');

      // Ingeniería del Prompt: Diseñado para sonar como un consultor experto
      const prompt = `
        Actúa como un estratega digital experto y mentor empático. Estás hablando directamente con un streamer de ${platform.toUpperCase()}.
        
        Sus métricas proyectadas para el próximo mes son:
        - Seguidores actuales estimados: ${metrics.currentFollowers}
        - Crecimiento proyectado (30 días): ${metrics.growthPrediction} nuevos seguidores
        - Audiencia promedio estimada: ${metrics.viewersPrediction} espectadores simultáneos
        
        TAREA:
        Escribe una respuesta breve, fluida y natural en español (máximo 2 o 3 párrafos cortos).
        
        REGLAS DE ESTILO (IMPORTANTE):
        1. NO uses encabezados, títulos (como "Diagnóstico"), negritas excesivas ni listas con viñetas.
        2. Escribe como si fuera un correo personal o una charla cara a cara.
        3. El tono debe ser profesional pero cercano y motivador.
        
        ESTRUCTURA NARRATIVA:
        Empieza con una valoración honesta de su situación actual basada en los números (¿es un crecimiento sólido, lento o explosivo?).
        Luego, integra en la misma narrativa 2 o 3 consejos tácticos muy específicos para mejorar (por ejemplo sobre retención, interacción o contenido), pero hazlo de forma fluida dentro del texto, no como una lista.
        Termina con una frase genuina de cierre que inspire confianza.
      `;

      // Llamada al modelo generativo
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return { analysis: text };

    } catch (error) {
      this.logger.error(`❌ Error con Gemini Pro: ${error.message}`);
      
      // Fallback elegante: Si Google falla, no rompemos la app, devolvemos un mensaje genérico.
      return { 
        analysis: "El análisis estratégico detallado no está disponible momentáneamente debido a una alta demanda en los servidores de IA. Sin embargo, tus métricas indican una tendencia que deberías monitorear de cerca en los próximos días." 
      };
    }
  }
}