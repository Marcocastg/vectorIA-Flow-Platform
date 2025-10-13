import { Channel } from "../channel/channel.entity";
import { User } from "../user/user.entity";

export class Analysis {
  constructor(
    public uuid: string | null,
    public title: string,
    public userId: string,
    public channelId: string,
    public user?: User,
    public channel?: Channel,
  ) {}

  public desactivar(): void {
    //this.estado = false;
  }

  static fromPrismaList(data: any[]): Analysis[] {
    return data.map((item) => Analysis.fromPrisma(item));
  }

  static fromPrisma(data: any): Analysis {
    return new Analysis(
      data.uuid,
      data.title,
      data.userId,
      data.channelId,
      data.user,
      data.channel,
    );
  }
}
