import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../utils/constant';

function Breadcrumbs(): JSX.Element {
  const { pathname } = useLocation();

  return (
    <div>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item">
          <Link className="link" to={AppRoute.Login}>
            Главная
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="link" to={AppRoute.List}>
            Каталог
          </Link>
        </li>
        {pathname !== AppRoute.List && (
          <li className="breadcrumbs__item">
            <Link className="link" to={pathname}>
              Товар
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Breadcrumbs;
