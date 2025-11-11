class BasePage {
  protected page: string = 'protected page';
  private secret: string = 'private data';

  public showProtected(): void {
    console.log('From BasePage - page:', this.page);
  }

  public showPrivate(): void {
    console.log('From BasePage - secret: ', this.secret);
  }
}

class LoginPage extends BasePage {
  public showInherited(): void {
    console.log('Accessing protected: ', this.page);
    // console.log('Accessing provate: ', this.secret); // ❌ error if uncommented
  }
}

const login = new LoginPage();

login.showInherited(); // ✅ will print "Accessing protected: protected page"
login.showProtected(); // ✅ will print "From BasePage: protected page"
login.showPrivate(); // ✅ will print "From BasePage: private data"

// ❌ Both of these are forbidden from outside the class hierarchy:
// console.log(login.page); // ❌ error: 'page' is protected
// console.log(login.secret); // ❌ error: 'secret' is private
