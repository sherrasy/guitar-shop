import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import GuitarCard from '../../components/guitar-card/guitar-card';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGuitar, getGuitarError, getGuitarStatus } from '../../store/guitar-data/selectors';
import { fetchGuitarById } from '../../store/guitar-data/api-actions';
import Loader from '../../components/loader/loader';
import ErrorPage from '../error-page/error-page';
import { useEffect } from 'react';

function GuitarPage(): JSX.Element {
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
    <div>
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Товар</h1>
          <Breadcrumbs/>
          <GuitarCard guitar={guitar}/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default GuitarPage;
