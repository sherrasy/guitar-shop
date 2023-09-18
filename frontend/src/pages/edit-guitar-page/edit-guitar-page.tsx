import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import GuitarForm from '../../components/forms/guitar-form';
import Header from '../../components/header/header';

function EditGuitarPage(): JSX.Element {
  return (
    <>
      <Header />
      <main className="page-content">
        <section className="edit-item">
          <div className="container">
            <h1 className="edit-item__title">СURT Z30 Plus</h1>
            <Breadcrumbs/>
            <GuitarForm status={'edit'}/>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default EditGuitarPage;
