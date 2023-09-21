import {useState, FormEvent, ChangeEvent} from 'react';
import { useAppDispatch } from '../../hooks';
import { register } from '../../store/user-data/api-actions';
import { checkValidity } from '../../utils/helpers';
import { UserFormFieldName, ValidationPattern } from '../../utils/constant';
import InputErrorField from '../input-error-field/input-error-field';
import { UserRegister } from '../../types/user.type';

function RegistrationForm(): JSX.Element {
  const registrationDataDefault = {
    name:'',
    email:'',
    password: ''
  };
  const dispatch = useAppDispatch();
  const errorMessage = 'Ошибка. Проверьте заполнение полей.';
  const [formData, setFormData] = useState(registrationDataDefault);
  const [isPasswordShown, SetIsPasswordShown] = useState(false);
  const [isErrorShown, SetIsErrorShown] = useState(false);

  const handleSubmitData = (userData: UserRegister) => dispatch(register(userData));

  const handleShowButtonClick = ()=> SetIsPasswordShown((prev)=> !prev);

  const handleInputChange = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const isEmailValid = checkValidity(formData.email, ValidationPattern.Email);
    const isPasswordValid = checkValidity(formData.password, ValidationPattern.Password);
    const isNameValid = checkValidity(formData.name, ValidationPattern.Name);
    if(isEmailValid && isPasswordValid && isNameValid){
      handleSubmitData(formData);
      SetIsErrorShown(false);
    }else{
      SetIsErrorShown(true);
    }
  };
  return (
    <div>
      <div className="container">
        <section className="login">
          <h1 className="login__title">Регистрация</h1>
          <form method="post" action="/" onSubmit={handleFormSubmit}>
            <div className="input-login">
              <label htmlFor={UserFormFieldName.Name}>Введите имя</label>
              <input
                type="text"
                id={UserFormFieldName.Name}
                name={UserFormFieldName.Name}
                autoComplete="off"
                onChange={handleInputChange}
                required
              />
              {formData[UserFormFieldName.Name] === '' && <InputErrorField/>}
            </div>
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input
                type="email"
                id={UserFormFieldName.Email}
                name={UserFormFieldName.Email}
                autoComplete="off"
                onChange={handleInputChange}
                required
              />
              {formData[UserFormFieldName.Email] === '' && <InputErrorField/>}
            </div>
            <div className="input-login">
              <label htmlFor={UserFormFieldName.Password}>Придумайте пароль</label>
              <span>
                <input
                  type={isPasswordShown ? 'text' : 'password'}
                  placeholder="• • • • • • • • • • • •"
                  id={UserFormFieldName.Password}
                  name={UserFormFieldName.Password}
                  autoComplete="off"
                  onChange={handleInputChange}
                  required
                />
                <button className="input-login__button-eye" type="button" onClick={handleShowButtonClick}>
                  <svg width="14" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-eye"></use>
                  </svg>
                </button>
              </span>
              {formData[UserFormFieldName.Password] === '' && <InputErrorField/>}
            </div>
            <button
              className="button login__button button--medium"
              type="submit"
            >
              Зарегистрироваться
            </button>
          </form>
          {isErrorShown && <p className="input-login__error">{errorMessage}</p>}
        </section>
      </div>
    </div>
  );
}

export default RegistrationForm;
