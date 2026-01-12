import { User } from "../user/user.entity";

export class Report {
    constructor(
        public uuid: string | null,
        public createdAt: Date,
        public userId: string,
        public inputData: ReportInputData | any,
        public predictionData: ReportPredictionData | any,
        public channelName: string,
        public platformName: string,
        public aiAnalysis: string,
        public user?: User,
      ) {}

      public desactivar(): void {
        //this.estado = false;
      }
    
      static fromPrismaList(data: any[]): Report[] {
        return data.map((item) => Report.fromPrisma(item));
      }

      static fromPrisma(data: any): Report {
        return new Report(
          data.uuid,
          data.createdAt,
          data.userId,
          data.inputData as unknown as ReportInputData,
          data.predictionData as unknown as ReportPredictionData,
          data.channelName,
          data.platformName,
          data.aiAnalysis,
          data.user,
        );
      }
}

export interface ReportInputData {
  followers1: number; 
  followers2: number; 
  avgViewers1: number;
  avgViewers2: number;
  time_streamed_1: number;
  time_streamed_2: number;
  comments_most_viewed?: number;
  comments_least_viewed?: number;
  [key: string]: any;
}

export interface ReportPredictionData {
  followers_d30?: number;
  followers_d28?: number;
  avg_viewers_d30: number;
  crecimiento_neto?: number;
  debug_crecimiento?: number;
  [key: string]: any;
}