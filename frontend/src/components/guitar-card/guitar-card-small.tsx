import { Link } from 'react-router-dom';
import { AppRoute, FormStatus } from '../../utils/constant';
import { Guitar } from '../../types/guitar.type';
import { formatDate } from '../../utils/helpers';

type GuitarCardSmallProps = {
  guitar: Guitar;
};

function GuitarCardSmall({guitar}:GuitarCardSmallProps): JSX.Element {
  const formattedDate = formatDate(guitar.createdDate);
  return (
    <>
      <div className="catalog-item__data"><img src={guitar.photo} srcSet={guitar.photo} width="36" height="93" alt="Картинка гитары"/>
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={`${AppRoute.List}/${guitar.id}`}><p className="catalog-item__data-title">{guitar.type} {guitar.name}</p></Link>
          <br/>
          <p className="catalog-item__data-date">Дата добавления {formattedDate}</p>
          <p className="catalog-item__data-price">{guitar.price} ₽</p>
        </div>
      </div>
      <div className="catalog-item__buttons"><Link className="button button--small button--black-border" to={`${AppRoute.List}/${guitar.id}/${FormStatus.Edit}`} aria-label="Редактировать товар">Редактировать</Link>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
      </div>
    </>

  );
}

export default GuitarCardSmall;
