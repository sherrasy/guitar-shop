import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import GuitarForm from '../../components/forms/guitar-form';
import Header from '../../components/header/header';

function AddGuitarPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="page-content">
        <section className="add-item">
          <div className="container">
            <h1 className="add-item__title">Новый товар</h1>
            <Breadcrumbs/>
            <GuitarForm status={'add'}/>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default AddGuitarPage;
