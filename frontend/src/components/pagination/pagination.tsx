import { useAppSelector } from '../../hooks';
import { getPagesAmount } from '../../store/guitars-data/selectors';
import { Link } from 'react-router-dom';
import { AppRoute, PaginationParam } from '../../utils/constant';

type PaginationProps={
  currentPage:number;
  onChangePage:(page:number)=>void;
}

function Pagination({currentPage, onChangePage}:PaginationProps): JSX.Element {
  const pagesAmount = useAppSelector(getPagesAmount);
  const pageNumbers = pagesAmount ? Array.from({ length: pagesAmount }, (_, key) => key + PaginationParam.DefaultPage)
    : [PaginationParam.DefaultPage];

  const visiblePageNumbers = pageNumbers.slice(
    currentPage - PaginationParam.DefaultPage,
    currentPage + PaginationParam.NextPage
  );

  const lastPage = pageNumbers[pageNumbers.length - PaginationParam.DefaultPage];
  const isNextVisible = visiblePageNumbers.length >= PaginationParam.DefaultAmount && currentPage !== lastPage;
  const isBackVisible = currentPage !== PaginationParam.DefaultPage;

  const handlePageClick = (page:number)=>{
    onChangePage(page);
  };
  const handleBackButtonClick = ()=>{
    const step = currentPage - PaginationParam.DefaultPage;
    onChangePage(step);
  };

  const handleNextButtonClick = ()=>{
    const nextPage = currentPage + PaginationParam.DefaultPage;
    const step = nextPage < lastPage ? nextPage : lastPage;
    onChangePage(step);
  };
  return (
    <div className="pagination product-list__pagination">
      <ul className="pagination__list">
        {isBackVisible && (
          <li className="pagination__page pagination__page--next" id="next">
            <Link className="link pagination__page-link" to="#" onClick={handleBackButtonClick}>
              Назад
            </Link>
          </li>
        )}
        {visiblePageNumbers.map((item) => (
          <li
            key={item}
            className={
              currentPage === item
                ? 'pagination__page pagination__page--active'
                : 'pagination__page'
            }
          >
            <Link className="link pagination__page-link" to={AppRoute.List} onClick={()=>handlePageClick(item)}>
              {item.toString()}
            </Link>
          </li>
        ))}

        {isNextVisible && (
          <li className="pagination__page pagination__page--next" id="next">
            <Link className="link pagination__page-link" to="#" onClick={handleNextButtonClick}>
              Далее
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
