import { Link } from 'react-router-dom';
import { AppRoute, FormStatus } from '../../utils/constant';
import { Guitar } from '../../types/guitar.type';
import { formatDateToLocale, formatPrice } from '../../utils/helpers';
import { useAppDispatch } from '../../hooks';
import { deleteGuitar } from '../../store/guitar-data/api-actions';

type GuitarCardSmallProps = {
  guitar: Guitar;
};

function GuitarCardSmall({guitar}:GuitarCardSmallProps): JSX.Element {
  const { id, name, createdDate, photo,type, price } = guitar;
  const formattedDate = formatDateToLocale(createdDate);
  const formattedPrice = formatPrice(price);
  const pathGuitar = `${AppRoute.List}/${id}`;
  const pathEditGuitar = `${pathGuitar}/${FormStatus.Edit}`;
  const dispatch = useAppDispatch();
  const handleDeleteClick = ()=>{
    dispatch(deleteGuitar(id));
  };
  return (
    <>
      <div className="catalog-item__data"><img src={photo} srcSet={photo} width="36" height="93" alt="Картинка гитары"/>
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={pathGuitar}><p className="catalog-item__data-title">{type} {name}</p></Link>
          <br/>
          <p className="catalog-item__data-date">Дата добавления {formattedDate}</p>
          <p className="catalog-item__data-price">{formattedPrice} ₽</p>
        </div>
      </div>
      <div className="catalog-item__buttons"><Link className="button button--small button--black-border" to={pathEditGuitar} aria-label="Редактировать товар">Редактировать</Link>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар" onClick={handleDeleteClick}>Удалить</button>
      </div>
    </>

  );
}

export default GuitarCardSmall;
