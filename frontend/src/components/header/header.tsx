import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../utils/constant';
import { getIsAuthorized, getUserData } from '../../store/user-data/selectors';
import { useAppSelector } from '../../hooks';

function Header(): JSX.Element {
  const location = useLocation();
  const isMain = location.pathname === AppRoute.Login;
  const isAuthorized = useAppSelector(getIsAuthorized);
  const userData = useAppSelector(getUserData);
  const username = userData ? userData.name : 'Имя';
  return (
    <div>
      <header className={isAuthorized ? 'header--admin header' : 'header'} id="header">
        <div className="container">
          <div className="header__wrapper">
            {isMain ? (
              <span className="header__logo logo">
                <img
                  className="logo__img"
                  width="70"
                  height="70"
                  src="./img/svg/logo.svg"
                  alt="Логотип"
                />
              </span>
            ) : (
              <Link className="header__logo logo" to={AppRoute.Login}>
                <img
                  className="logo__img"
                  width="70"
                  height="70"
                  src="./img/svg/logo.svg"
                  alt="Логотип"
                />
              </Link>
            )}
            <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item">
                  <Link className="link main-nav__link" to={AppRoute.List}>
                    Каталог
                  </Link>
                </li>
                <li className="main-nav__item">
                  <Link className="link main-nav__link" to="#">
                    Где купить?
                  </Link>
                </li>
                <li className="main-nav__item">
                  <Link className="link main-nav__link" to="#">
                    О компании
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="header__container">
              <span className="header__user-name">{username}</span>
              <Link
                className="header__link"
                to="login.html"
                aria-label="Перейти в личный кабинет"
              >
                <svg
                  className="header__link-icon"
                  width="12"
                  height="14"
                  aria-hidden="true"
                >
                  <use xlinkHref="#icon-account"></use>
                </svg>
                <span className="header__link-text">Вход</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
