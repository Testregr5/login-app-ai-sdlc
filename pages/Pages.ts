import { PageHolder } from './PageHolder';
import { LoginAppPage } from './LoginAppPage';

export class Pages extends PageHolder {
  readonly loginAppPage: LoginAppPage = new LoginAppPage(this.page);
}
