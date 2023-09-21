import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import GuitarList from '../../components/guitar-list/guitar-list';
import Header from '../../components/header/header';
import { AppRoute, FormStatus, PaginationParam } from '../../utils/constant';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGuitars, getGuitarsStatus } from '../../store/guitars-data/selectors';
import { fetchGuitars, fetchPagesAmount } from '../../store/guitars-data/api-actions';
import Loader from '../../components/loader/loader';
import { useEffect, useState } from 'react';
import Pagination from '../../components/pagination/pagination';
import ListSorting from '../../components/list-sorting/list-sorting';
import ListFilters from '../../components/list-filters/list-filters';

function GuitarListPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isListLoading = useAppSelector(getGuitarsStatus);
  const guitarsData = useAppSelector(getGuitars);
  const [currentPage, setCurrentPage] = useState(PaginationParam.DefaultPage);

  useEffect(() => {
    dispatch(fetchGuitars(currentPage));
    dispatch(fetchPagesAmount());
  }, [dispatch, currentPage]);

  if(isListLoading ){
    return <Loader/>;
  }

  const handlePageChange = (page:number)=>setCurrentPage(page);

  return (
    <>
      <Header />
      <main className="page-content">
        <section className="product-list">
          <div className="container">
            <h1 className="product-list__title">Список товаров</h1>
            <Breadcrumbs/>
            <div className="catalog">
              <ListFilters/>
              <ListSorting/>
              <GuitarList guitars = {guitarsData}/>
            </div>
            <button className="button product-list__button button--red button--big" onClick={()=>navigate(`${AppRoute.List}/${FormStatus.Add}`)}>Добавить новый товар</button>
            <Pagination currentPage={currentPage} onChangePage={handlePageChange}/>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default GuitarListPage;
