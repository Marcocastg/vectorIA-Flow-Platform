import { Channel } from "diagnostics_channel";
import { Platform } from "../platform/platform.entity";

export class VideoOnDemand {
  constructor(
    public uuid: string | null,
    public title: string,
    public duration: number,
    public views: number,
    public matureContent: boolean,
    public channelId: string,
    public channel?: Channel,
  ) {}

  public desactivar(): void {
    //this.estado = false;
  }

  static fromPrismaList(data: any[]): VideoOnDemand[] {
    return data.map((item) => VideoOnDemand.fromPrisma(item));
  }

  static fromPrisma(data: any): VideoOnDemand {
    return new VideoOnDemand(
      data.uuid,
      data.title,
      data.duration,
      data.views,
      data.matureContent,
      data.channelId,
      data.channel,
    );
  }
}
