import { Guitars } from '../../types/guitar.type';
import GuitarCardSmall from '../guitar-card/guitar-card-small';

type GuitarListProps = {
  guitars:Guitars;
  }

function GuitarList({guitars}:GuitarListProps): JSX.Element {
  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        <li className="catalog-item">
          {
            guitars.map((guitar)=> <GuitarCardSmall key = {guitar.id} guitar={guitar}/>)
          }

        </li>
      </ul>
    </div>
  );
}

export default GuitarList;
