import Footer from '../../components/footer/footer';
import RegistrationForm from '../../components/forms/registration-form';
import Header from '../../components/header/header';

function RegistrationPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="page-content">
        <RegistrationForm/>
      </main>
      <Footer />
    </>
  );
}
export default RegistrationPage;
