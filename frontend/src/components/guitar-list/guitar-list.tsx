import { Guitars } from '../../types/guitar.type';
import GuitarCardSmall from '../guitar-card/guitar-card-small';

type GuitarListProps = {
  guitars: Guitars;
};

function GuitarList({ guitars }: GuitarListProps): JSX.Element {
  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {guitars.map((guitar) => (
          <li className="catalog-item" key={guitar.id}>
            <GuitarCardSmall guitar={guitar} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GuitarList;
