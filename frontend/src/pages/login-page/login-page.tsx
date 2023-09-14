import Footer from '../../components/footer/footer';
import LoginForm from '../../components/forms/login-form';
import Header from '../../components/header/header';

function LoginPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="page-content">
        <LoginForm/>
      </main>
      <Footer />
    </>
  );
}
export default LoginPage;
