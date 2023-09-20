import { useNavigate } from 'react-router-dom';
import { AppRoute, FormFieldName, FormStatus, STRINGS_AMOUNTS } from '../../utils/constant';
import { Guitar, NewGuitar } from '../../types/guitar.type';
import {
  formatDateToLocale,
  formatPrice,
  getGuitarTypeWithName,
} from '../../utils/helpers';
import InputErrorField from '../input-error-field/input-error-field';

type GuitarFormProps<T> = {
  status: string;
  guitar: T;
};

function GuitarForm<T extends Guitar | NewGuitar>({
  status,
  guitar,
}: GuitarFormProps<T>): JSX.Element {
  const {
    name,
    description,
    createdDate,
    photo,
    type,
    vendor,
    price,
    stringsAmount,
  } = guitar;
  const formattedDate = formatDateToLocale(createdDate);
  const formattedPrice = formatPrice(price);
  const isNewGuitar = status === FormStatus.Add;
  const guitarTypes = getGuitarTypeWithName();
  const navigate = useNavigate();
  const handleBackButtonClick = () => navigate(AppRoute.List);

  return (
    <div>
      <form className="add-item__form" action="#" method="get" >
        <div className="add-item__form-left">
          <div className="edit-item-image add-item__form-image">
            <div className="edit-item-image__image-wrap">
              <img className='edit-item-image_image' src={ photo } alt=""/>
            </div>
            <div className="edit-item-image__btn-wrap">
              <button className="button button--small button--black-border edit-item-image__btn" disabled>
                {isNewGuitar ? 'Добавить' : 'Edit'}
              </button>
              <button className="button button--small button--black-border edit-item-image__btn" disabled>
                Удалить
              </button>
            </div>
          </div>
          <div className="input-radio add-item__form-radio">
            <span>
              {isNewGuitar ? 'Выберите тип товара' : 'Тип товара'}
            </span>
            {guitarTypes.map((item) => (
              <div key={item.type}>
                <input
                  type="radio"
                  id={item.type}
                  value={item.type}
                  name={FormFieldName.Type}
                  defaultChecked={type === item.type}
                />
                <label htmlFor={item.type}>{item.name}</label>
              </div>
            ))}
          </div>
          <div className="input-radio add-item__form-radio">
            <span>Количество струн</span>
            {STRINGS_AMOUNTS.map((item) => (
              <div key={item}>
                <input
                  type="radio"
                  id={`string-qty-${item}`}
                  name={FormFieldName.StringsAmount}
                  value={item}
                  defaultChecked={item === stringsAmount}
                />
                <label htmlFor={`string-qty-${item}`}>{item}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="add-item__form-right">
          <div className="custom-input add-item__form-input">
            <label>
              <span>Дата добавления товара</span>
              <input
                type="text"
                name={FormFieldName.Date}
                defaultValue={formattedDate}
                placeholder="Дата в формате 00.00.0000"
              />
            </label>
            <InputErrorField />
          </div>
          <div className="custom-input add-item__form-input">
            <label>
              <span>
                {isNewGuitar
                  ? 'Введите наименование товара'
                  : 'Наименование товара'}
              </span>
              <input
                type="text"
                name={FormFieldName.Title}
                defaultValue={name}
                placeholder="Наименование"
              />
            </label>
            <InputErrorField />
          </div>
          <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
            <label>
              <span>
                {isNewGuitar ? 'Введите цену товара' : 'Цена товара'}
              </span>
              <input
                type="text"
                name={FormFieldName.Price}
                defaultValue={formattedPrice}
                placeholder="Цена в формате 00 000"
              />
            </label>
            <InputErrorField />
          </div>
          <div className="custom-input add-item__form-input">
            <label>
              <span>
                {isNewGuitar ? 'Введите артикул товара' : 'Артикул товара'}{' '}
              </span>
              <input
                type="text"
                name={FormFieldName.Vendor}
                defaultValue={vendor}
                placeholder="Артикул товара"
              />
            </label>
            <InputErrorField />
          </div>
          <div className="custom-textarea add-item__form-textarea">
            <label>
              <span>
                {isNewGuitar
                  ? 'Введите описание товара'
                  : 'Описание товара'}
              </span>
              <textarea
                name={FormFieldName.Description}
                placeholder=""
                defaultValue={description}
              >
              </textarea>
            </label>
            <InputErrorField />
          </div>
        </div>
        <div className="add-item__form-buttons-wrap">
          <button
            className="button button--small add-item__form-button"
            type="submit"
            disabled
          >
            Сохранить изменения
          </button>
          <button
            className="button button--small add-item__form-button"
            type="button"
            onClick={handleBackButtonClick}
          >
            Вернуться к списку товаров
          </button>
        </div>
      </form>
    </div>
  );
}

export default GuitarForm;
