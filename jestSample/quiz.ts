import axios from "axios";

export function validateEmail(email: string): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
}

interface DataSorce<T> {
  save(): Promise<boolean>;
  first(): Promise<T>;
}

export class User implements DataSorce<User> {
  private host = "http://localhost/";
  public name: string;
  public constructor(name: string) {
    this.name = name;
  }
  public async save(): Promise<boolean> {
    const response = await axios.post(this.host + "/user", { name: this.name });
    return response.status === 201;
  }
  public async first(): Promise<User> {
    const response = await axios.get(this.host + "/user/1");
    const user = response.data.user as User;
    return user;
  }
}
