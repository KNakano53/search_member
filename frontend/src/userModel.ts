export class UserModel {
  constructor(
    public id: string,
    public name: string,
    public address: string,
    public tel: string
  ) {}

  getParameter(params: string): string | undefined {
    switch (params) {
      case "id":
        return this.id;
      case "name":
        return this.name;
      case "address":
        return this.address;
      case "tel":
        return this.tel;
      default:
        return undefined;
    }
  }
}
