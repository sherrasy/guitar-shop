import { Link } from 'react-router-dom';
import { AppRoute, FormStatus } from '../../utils/constant';

const mockGuitar = {
  id:1,
  name: 'СURT Z30 Plus',
  type:'Электрогитара',
  price:17500,
  date:'19.09.2022'
};

function GuitarCardSmall(): JSX.Element {
  return (
    <>
      <div className="catalog-item__data"><img src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="36" height="93" alt="Картинка гитары"/>
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={`${AppRoute.List}/1`}><p className="catalog-item__data-title">{mockGuitar.type} {mockGuitar.name}</p></Link>
          <br/>
          <p className="catalog-item__data-date">Дата добавления {mockGuitar.date}</p>
          <p className="catalog-item__data-price">{mockGuitar.price} ₽</p>
        </div>
      </div>
      <div className="catalog-item__buttons"><Link className="button button--small button--black-border" to={`${AppRoute.List}/${mockGuitar.id}/${FormStatus.Edit}`} aria-label="Редактировать товар">Редактировать</Link>
        <button className="button button--small button--black-border" type="submit" aria-label="Удалить товар">Удалить</button>
      </div>
    </>

  );
}

export default GuitarCardSmall;
