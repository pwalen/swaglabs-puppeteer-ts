import { LoginPage } from '@pages/public/LoginPage';

export async function givenUserIsOnLoginPage(loginPage: LoginPage): Promise<void> {
  await loginPage.open();
}
