import { PageHolder } from './PageHolder';
import { LoginPage } from './LoginPage';

export class Pages extends PageHolder {
  readonly loginPage: LoginPage = new LoginPage(this.page);
}
