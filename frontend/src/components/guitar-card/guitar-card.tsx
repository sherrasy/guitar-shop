const mockGuitar = {
  name: 'СURT Z30 Plus',
  description:'Гитара подходит как для старта обучения, так и для домашних занятий или использования в полевых условиях, например, в походах или для проведения уличных выступлений. Доступная стоимость, качество и надежная конструкция, а также приятный внешний вид, который сделает вас звездой вечеринки.',
  stringsAmount:6,
  type:'Электрогитара',
  vendor:'SO754565'
};

function GuitarCard(): JSX.Element {
  return (
    <div className="product-container"><img className="product-container__img" src="img/content/catalog-product-1.png" srcSet="img/content/catalog-product-1@2x.png 2x" width="90" height="235" alt=""/>
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{mockGuitar.name}</h2>
        <br/>
        <br/>
        <div className="tabs"><a className="button button--medium tabs__button" href="#characteristics">Характеристики</a><a className="button button--black-border button--medium tabs__button" href="#description">Описание</a>
          <div className="tabs__content" id="characteristics">
            <table className="tabs__table">
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
            <p className="tabs__product-description hidden">{mockGuitar.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuitarCard;
