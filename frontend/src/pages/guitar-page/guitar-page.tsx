import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import GuitarCard from '../../components/guitar-card/guitar-card';
import Header from '../../components/header/header';

function GuitarPage(): JSX.Element {
  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="page-content__title title title--bigger">Товар</h1>
        <Breadcrumbs/>
        <GuitarCard/>
      </div>
      <Footer />
    </div>
  );
}
export default GuitarPage;
