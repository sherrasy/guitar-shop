import { STRINGS_AMOUNTS } from '../../utils/constant';
import { getGuitarTypeWithName } from '../../utils/helpers';

function ListFilters(): JSX.Element {
  const guitarTypes = getGuitarTypeWithName();

  return (
    <form className="catalog-filter" action="#" method="post">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {guitarTypes.map(({type, name}) => (
          <div className="form-checkbox catalog-filter__block-item" key={type}>
            <input
              className="visually-hidden"
              type="checkbox"
              id={type}
              name={type}
            />
            <label htmlFor={type}>{name}</label>
          </div>
        ))}
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">
          Количество струн
        </legend>
        {STRINGS_AMOUNTS.map((item) => (
          <div className="form-checkbox catalog-filter__block-item" key={item}>
            <input
              className="visually-hidden"
              type="checkbox"
              id={`${item}-strings`}
              name={`${item}-strings`}
            />
            <label htmlFor={`${item}-strings`}>{item}</label>
          </div>
        ))}
      </fieldset>
      <button
        className="catalog-filter__reset-btn button button--black-border button--medium"
        type="reset"
      >
        Очистить
      </button>
    </form>
  );
}

export default ListFilters;
