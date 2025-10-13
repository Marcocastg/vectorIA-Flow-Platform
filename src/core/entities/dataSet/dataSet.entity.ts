export class dataSet {
  constructor(
    public uuid: string | null,
    public channelName: string,
    public averageViewers: number,
    public hoursWatched: number,
    public maxViewers: number,
    public minutesStreamed: number,
    public followersGained: number,
    public totalFollowers: number,
    public rank: number,
    public fechaRegistro: string,
  ) {}

  public desactivar(): void {
    //this.estado = false;
  }

  static fromPrismaList(data: any[]): dataSet[] {
    return data.map((item) => dataSet.fromPrisma(item));
  }

  static fromPrisma(data: any): dataSet {
    return new dataSet(
      data.uuid,
      data.channelName,
      data.averageViewers,
      data.hoursWatched,
      data.maxViewers,
      data.minutesStreamed,
      data.followersGained,
      data.totalFollowers,
      data.rank,
      data.fechaRegistro,
    );
  }
}
