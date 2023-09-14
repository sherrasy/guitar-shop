import { GuitarTab } from '../../utils/constant';
import { useState } from 'react';

const mockGuitar = {
  name: 'СURT Z30 Plus',
  description: 'Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений. Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.',
  stringsAmount: 6,
  type: 'Электрогитара',
  vendor: 'SO754565'
};

function GuitarCard(): JSX.Element {
  const [currentTab, setCurrentTab] = useState<string>(GuitarTab.Details);
  const getClassname = (tab:string)=>{
    const defaultClassname = 'button button--medium tabs__button';
    const inActiveClassName = ' button--black-border';
    return currentTab === tab ? defaultClassname : defaultClassname.concat(inActiveClassName);
  };
  return (
    <div className="product-container"><img className="product-container__img" src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="90" height="235" alt="" />
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{mockGuitar.name}</h2>
        <br />
        <br />
        <div className="tabs">
          <button className={getClassname(GuitarTab.Details)} onClick={()=>setCurrentTab(GuitarTab.Details)}>Характеристики</button>
          <button className={getClassname(GuitarTab.Description)} onClick={()=>setCurrentTab(GuitarTab.Description)}>Описание</button>
          <div className="tabs__content" id="characteristics">
            <table className={currentTab === GuitarTab.Details ? 'tabs__table' : 'tabs__table hidden'}>
              <tbody>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Артикул:</td>
                  <td className="tabs__value">{mockGuitar.vendor}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">{mockGuitar.type}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">{mockGuitar.stringsAmount} струнная</td>
                </tr>
              </tbody>
            </table>
            <p className={currentTab === GuitarTab.Description ? 'tabs__product-description' : 'tabs__product-description hidden'}>{mockGuitar.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuitarCard;
