import { Platform } from "../platform/platform.entity";

export class Category {
  constructor(
    public uuid: string | null,
    public name: string,
    public currentViewers: number,
    public platformId: string,
    public platform?: Platform,
  ) {}

  public desactivar(): void {
    //this.estado = false;
  }

  static fromPrismaList(data: any[]): Category[] {
    return data.map((item) => Category.fromPrisma(item));
  }

  static fromPrisma(data: any): Category {
    return new Category(
      data.uuid,
      data.name,
      data.currentViewers,
      data.platformId,
      data.platform,
    );
  }
}
