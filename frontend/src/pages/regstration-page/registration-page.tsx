import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import RegistrationForm from '../../components/registration-form/registration-form';

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
