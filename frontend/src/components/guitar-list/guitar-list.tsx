import GuitarCardSmall from '../guitar-card/guitar-card-small';

function GuitarList(): JSX.Element {
  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        <li className="catalog-item">
          <GuitarCardSmall/>
        </li>
      </ul>
    </div>
  );
}

export default GuitarList;
