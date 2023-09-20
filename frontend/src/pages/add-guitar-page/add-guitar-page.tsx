import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import GuitarForm from '../../components/forms/guitar-form';
import Header from '../../components/header/header';
import { useAppDispatch } from '../../hooks';
import { createGuitar } from '../../store/guitar-data/api-actions';
import { GuitarType } from '../../types/guitar-type.enum';
import { NewGuitar } from '../../types/guitar.type';
import { FormStatus, PriceLimit, STRINGS_AMOUNTS } from '../../utils/constant';

const EMPTY_GUITAR: NewGuitar = {
  name: '',
  description: '',
  photo: '',
  createdDate: new Date().toISOString() ,
  type:GuitarType.Electric,
  vendor:'',
  price: PriceLimit.Min,
  stringsAmount: STRINGS_AMOUNTS[0]
};


function AddGuitarPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (data: NewGuitar) => {
    dispatch(createGuitar(data));
  };
  return (
    <>
      <Header />
      <main className="page-content">
        <section className="add-item">
          <div className="container">
            <h1 className="add-item__title">Новый товар</h1>
            <Breadcrumbs/>
            <GuitarForm guitar={EMPTY_GUITAR} status={FormStatus.Add} onSubmit={handleFormSubmit}/>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default AddGuitarPage;
