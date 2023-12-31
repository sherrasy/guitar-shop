import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGuitar, getGuitarError, getGuitarStatus } from '../../store/guitar-data/selectors';
import { fetchGuitarById } from '../../store/guitar-data/api-actions';
import Loader from '../../components/loader/loader';
import ErrorPage from '../error-page/error-page';
import { useEffect } from 'react';
import { FormStatus } from '../../utils/constant';
import GuitarForm from '../../components/guitar-form/guitar-form';

function EditGuitarPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id:guitarId} = useParams();
  const guitar = useAppSelector(getGuitar);
  const isGuitarLoading = useAppSelector(getGuitarStatus);
  const guitarError = useAppSelector(getGuitarError);

  useEffect(()=>{
    if(guitarId){
      dispatch(fetchGuitarById(guitarId));
    }
  },[dispatch, guitarId]);

  if(isGuitarLoading ){
    return <Loader/>;
  }

  if(!guitarId || !guitar || guitarError){
    return <ErrorPage/>;
  }

  return (
    <>
      <Header />
      <main className="page-content">
        <section className="edit-item">
          <div className="container">
            <h1 className="edit-item__title">{guitar.name}</h1>
            <Breadcrumbs/>
            <GuitarForm status={FormStatus.Edit} guitar={guitar} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default EditGuitarPage;
