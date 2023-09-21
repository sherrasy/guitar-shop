import { Guitar } from '../../types/guitar.type';
import { GuitarTab } from '../../utils/constant';
import { useState } from 'react';

type GuitarCardProps = {
  guitar:Guitar;
}

function GuitarCard({guitar}:GuitarCardProps): JSX.Element {
  const { name, description, photo, type, vendor, stringsAmount } = guitar;

  const [currentTab, setCurrentTab] = useState<string>(GuitarTab.Details);

  const getClassname = (tab:string)=>{
    const defaultClassname = 'button button--medium tabs__button';
    const inActiveClassName = ' button--black-border';
    return currentTab === tab ? defaultClassname : defaultClassname.concat(inActiveClassName);
  };

  return (
    <div className="product-container">
      <img className="product-container__img" src={photo} srcSet={photo} width="90" height="235" alt="" />
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
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
                  <td className="tabs__value">{vendor}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Тип:</td>
                  <td className="tabs__value">{type}</td>
                </tr>
                <tr className="tabs__table-row">
                  <td className="tabs__title">Количество струн:</td>
                  <td className="tabs__value">{stringsAmount} струнная</td>
                </tr>
              </tbody>
            </table>
            <p className={currentTab === GuitarTab.Description ? 'tabs__product-description' : 'tabs__product-description hidden'}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuitarCard;
