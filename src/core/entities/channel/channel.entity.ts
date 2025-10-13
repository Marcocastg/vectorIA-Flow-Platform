import { Platform } from "../platform/platform.entity";

export class Channel {
  constructor(
    public uuid: string | null,
    public name: string,
    public followers: number,
    public lastSeenAt: string,
    public description: string,
    public platformId: string,
    public platform?: Platform,
  ) {}

  public desactivar(): void {
    //this.estado = false;
  }

  static fromPrismaList(data: any[]): Channel[] {
    return data.map((item) => Channel.fromPrisma(item));
  }

  static fromPrisma(data: any): Channel {
    return new Channel(
      data.uuid,
      data.name,
      data.followers,
      data.lastSeenAt,
      data.description,
      data.platformId,
      data.platform,
    );
  }
}
