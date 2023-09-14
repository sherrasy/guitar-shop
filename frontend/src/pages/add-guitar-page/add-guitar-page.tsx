import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import GuitarForm from '../../components/forms/guitar-form';
import Header from '../../components/header/header';

function AddGuitarPage(): JSX.Element {
  return (
    <>
      <Header />
      <section className="add-item">
        <div className="container">
          <h1 className="add-item__title">Новый товар</h1>
          <Breadcrumbs/>
          <GuitarForm status={'add'}/>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default AddGuitarPage;
