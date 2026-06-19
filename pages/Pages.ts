import { PageHolder } from './PageHolder';
import { LoginAppPage } from './LoginAppPage';

export class Pages extends PageHolder {
  readonly loginAppPage: LoginAppPage;

  constructor(page: any) {
    super(page);
    this.loginAppPage = new LoginAppPage(page);
  }
}