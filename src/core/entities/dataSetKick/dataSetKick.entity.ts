import { Channel } from "../channel/channel.entity";

export class dataSetKick {
  constructor(
    public uuid: string | null,
    public channelName: string,
    public channelPfp: string,
    public rank: number,
    public averageViewers: number,
    public hoursWatched: number,
    public maxViewers: number,
    public hoursStreamed: number,
    public totalFollowers: number,
    public language: string,
    public rankVariation: number,
    public fechaRegistro: string,
    public channelId: string,
    public channel?: Channel,  
  ) {}

  public desactivar(): void {
    //this.estado = false;
  }

  static fromPrismaList(data: any[]): dataSetKick[] {
    return data.map((item) => dataSetKick.fromPrisma(item));
  }

  static fromPrisma(data: any): dataSetKick {
    return new dataSetKick(
      data.uuid,
      data.channelName,
      data.channelPfp,
      data.rank,
      data.averageViewers,
      data.hoursWatched,
      data.maxViewers,
      data.hoursStreamed,
      data.totalFollowers,
      data.language,
      data.rankVariation,
      data.fechaRegistro,
      data.channelId,
      data.channel,
    );
  }
}
