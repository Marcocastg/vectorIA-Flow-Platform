import { Category } from "../category/category.entity";
import { Channel } from "../channel/channel.entity";

export class Livestream {
  constructor(
    public uuid: string | null,
    public title: string,
    public thumbnailUrl: string,
    public language: string,
    public startedAt: string,
    public currentViewers: number,
    public matureContent: boolean,
    public channelId: string,
    public categoryId: string,    
    public channel?: Channel,
    public category?: Category,

  ) {}

  public desactivar(): void {
    //this.estado = false;
  }

  static fromPrismaList(data: any[]): Livestream[] {
    return data.map((item) => Livestream.fromPrisma(item));
  }

  static fromPrisma(data: any): Livestream {
    return new Livestream(
      data.uuid,
      data.title,
      data.thumbnailUrl,
      data.language,
      data.startedAt,
      data.currentViewers,
      data.matureContent,    
      data.channelId,
      data.categoryId,
      data.channel,
      data.category,
      
    );
  }
}
