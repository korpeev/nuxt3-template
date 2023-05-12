import { BaseApiImpl } from "services/base-api";
import type { User } from "services/user";
interface UserServiceImpl {
  changeHttp(http: BaseApiImpl): void;
  getUsers(): Promise<User[]>;
  getUser(userId: number): Promise<User>;
}
export class UserService implements UserServiceImpl {
  constructor(private http: BaseApiImpl) {
    this.http = http;
  }

  changeHttp(passedHttp: BaseApiImpl) {
    this.http = passedHttp;
  }

  async getUsers(): Promise<User[]> {
    return await this.http.get<User[]>("users", { params: { _limit: 10 } });
  }

  async getUser(userId: number): Promise<User> {
    return await this.http.get<User>("users", { params: { id: userId } });
  }
}
