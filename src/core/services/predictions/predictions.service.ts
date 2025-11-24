import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { envs } from 'src/config/envs';

@Injectable()
export class PredictionsService {
  private readonly logger = new Logger('AI-Service');
  
  // URL de tu API de Python (Render o localhost).
  // Asegúrate de tener esta variable en tu .env o en Railway
  private readonly pythonUrl = envs.PYTHON_API_URL;

  constructor(private readonly httpService: HttpService) {}

  async getPrediction(platform: string, data: any) {
    // 1. Validar la plataforma
    const cleanPlatform = platform.toLowerCase().trim();
    if (!['twitch', 'kick'].includes(cleanPlatform)) {
      throw new HttpException(
        'Plataforma no soportada. Usa "twitch" o "kick".', 
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      // 2. Construir la URL del endpoint de Python
      const endpoint = cleanPlatform === 'twitch' ? '/predecir/twitch' : '/predecir/kick';
      const fullUrl = `${this.pythonUrl}${endpoint}`;

      this.logger.log(`🤖 Conectando con Motor de IA: ${fullUrl}`);

      // 3. Enviar datos a Python
      const response = await lastValueFrom(
        this.httpService.post(fullUrl, data)
      );

      // 4. Retornar la respuesta limpia
      if (response.data && response.data.status === 'success') {
        return response.data;
      } else {
        throw new Error('Respuesta inválida del motor de IA');
      }

    } catch (error) {
      this.logger.error(`❌ Error en IA: ${error.message}`);
      
      // Manejo de errores específicos
      if (error.response) {
        // Si Python respondió con un error (ej. 400 Bad Request)
        throw new HttpException(
          error.response.data.detail || 'Error de cálculo en la IA', 
          error.response.status
        );
      }
      
      // Si no hubo respuesta (Render dormido o caído)
      throw new HttpException(
        'El motor de IA no está disponible en este momento. Intenta de nuevo.', 
        HttpStatus.BAD_GATEWAY
      );
    }
  }
}