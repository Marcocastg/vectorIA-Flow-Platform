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

  constructor(private readonly httpService: HttpService) {
    // 1. Inicializamos Gemini con tu API Key
    // Asegúrate de tener GEMINI_API_KEY en tu archivo .env (y en Railway)
    this.genAI = new GoogleGenerativeAI(envs.GEMINI_API_KEY);
    
    // 2. Configuración del Modelo "Pro"
    // Usamos gemini-1.5-pro para obtener razonamiento avanzado y mejores consejos.
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7, // Balance perfecto entre creatividad y precisión
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024, // Suficiente para un análisis de 3-4 párrafos
      }
    }); 
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
        this.httpService.post(fullUrl, data)
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
        Actúa como un Consultor Senior de Estrategia Digital especializado en Streaming y Creación de Contenido.
        Tu cliente es un streamer de la plataforma ${platform.toUpperCase()}.
        
        Analiza sus métricas proyectadas para el próximo mes:
        - Seguidores actuales estimados: ${metrics.currentFollowers}
        - Crecimiento proyectado (30 días): ${metrics.growthPrediction} (Nuevos seguidores)
        - Audiencia promedio estimada: ${metrics.viewersPrediction} (Viewers simultáneos)
        
        TAREA:
        Genera un reporte estratégico breve, directo y motivador en español.
        Usa el siguiente formato exacto (Markdown):

        ### 📊 Diagnóstico Rápido
        [Escribe aquí 1 o 2 frases contundentes sobre su estado actual. ¿Está estancado, creciendo orgánicamente o explotando?]

        ### 🔮 Interpretación de la IA
        [Explica qué significan estos números para su carrera. Sé honesto pero constructivo. Si el crecimiento es bajo, menciónalo como oportunidad.]

        ### 🚀 Plan de Acción (3 Tácticas)
        1. **[Táctica 1]:** [Consejo específico basado en sus viewers, ej. si son pocos, enfócate en retención; si son muchos, enfócate en monetización]
        2. **[Táctica 2]:** [Consejo sobre interacción o contenido]
        3. **[Táctica 3]:** [Consejo sobre consistencia o redes sociales]
        
        El tono debe ser profesional, analítico y orientado a resultados. No uses saludos genéricos como "Hola". Ve directo al grano.
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