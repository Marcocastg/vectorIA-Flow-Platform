import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { USER_REPOSITORY } from "src/core/constants/constants";
import { User } from "src/core/entities/user/user.entity";
import type { UserRepository } from "src/core/repositories/user/user.repository";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor() {
    super();
    // Este log debe aparecer UNA VEZ al iniciar el servidor
    console.log('--- 🟢 SessionSerializer INSTANCIADO (Versión Simple) ---');
  }

  serializeUser(user: any, done: (err: Error | null, id?: any) => void): void {
    // Este log debe aparecer DESPUÉS del login exitoso
    console.log('--- ✅ SERIALIZE USER LLAMADO (Versión Simple) ---', user);
    
    // Usamos el uuid que viene del objeto de usuario que nos pasó la estrategia
    done(null, user.uuid); 
  }

  deserializeUser(payload: any, done: (err: Error | null, payload?: any) => void): void {
    // Este log aparecerá en las peticiones posteriores al login
    console.log('--- 🔵 DESERIALIZE USER LLAMADO (Versión Simple) ---', payload);
    
    // Simplemente devolvemos el payload que guardamos. En este caso, el uuid.
    done(null, { uuid: payload }); 
  }
}