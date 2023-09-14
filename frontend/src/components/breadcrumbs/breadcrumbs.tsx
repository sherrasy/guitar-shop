import { Link } from 'react-router-dom';

function Breadcrumbs(): JSX.Element {
  return (
    <div>
      <ul className="breadcrumbs page-content__breadcrumbs">
        <li className="breadcrumbs__item"><Link className="link" to="./main.html">Главная</Link>
        </li>
        <li className="breadcrumbs__item"><Link className="link" to="./main.html">Каталог</Link>
        </li>
        <li className="breadcrumbs__item"><Link className="link" to=''>Товар</Link>
        </li>
      </ul>
    </div>
  );
}

export default Breadcrumbs;
