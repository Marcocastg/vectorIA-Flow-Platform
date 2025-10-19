import { Category } from "../category/category.entity";
import { Channel } from "../channel/channel.entity";

export class User {
  constructor(
    public uuid: string | null,
    public firstName: string,
    public lastName: string,
    public password: string,
    public email: string,
    public companyName: string,
  ) {}

  public desactivar(): void {
    //this.estado = false;
  }

  static fromPrismaList(data: any[]): User[] {
    return data.map((item) => User.fromPrisma(item));
  }

  static fromPrisma(data: any): User {
    return new User(
      data.uuid,
      data.firstName,
      data.lastName,
      data.password,
      data.email,
      data.companyName,
    );
  }
}
