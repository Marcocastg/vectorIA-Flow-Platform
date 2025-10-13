import { Channel } from "../channel/channel.entity";

export class Platform {
  constructor(
    public uuid: string | null,
    public name: string,
    public url: string,
    public logoUrl: string,
  ) {}

  public desactivar(): void {
    //this.estado = false;
  }

  static fromPrismaList(data: any[]): Platform[] {
    return data.map((item) => Platform.fromPrisma(item));
  }

  static fromPrisma(data: any): Platform {
    return new Platform(
      data.uuid,
      data.name,
      data.url,
      data.logoUrl,
    );
  }
}
