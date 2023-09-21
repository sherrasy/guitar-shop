import { useState, FormEvent, ChangeEvent} from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, UserFormFieldName, ValidationPattern } from '../../utils/constant';
import { useAppDispatch } from '../../hooks';
import { AuthData } from '../../types/auth-data.type';
import { login } from '../../store/user-data/api-actions';
import { checkValidity } from '../../utils/helpers';
import InputErrorField from '../input-error-field/input-error-field';

function LoginForm(): JSX.Element {
  const loginDataDefault = {
    email:'',
    password: ''
  };
  const [formData, setFormData] = useState(loginDataDefault);
  const [isPasswordShown, SetIsPasswordShown] = useState(false);
  const [isErrorShown, SetIsErrorShown] = useState(false);
  const errorMessage = 'Возникла ошибка входа. Проверьте введенные данные и попробуйте снова';

  const dispatch = useAppDispatch();

  const handleSubmitData = (authData: AuthData) => dispatch(login(authData));

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
    if(isEmailValid && isPasswordValid){
      handleSubmitData(formData);
      SetIsErrorShown(false);
    }else{
      SetIsErrorShown(true);
    }
  };

  return (
    <div className="container">
      <section className="login">
        <h1 className="login__title">Войти</h1>
        <p className="login__text">
              Hовый пользователь?
          <Link className="login__link" to={AppRoute.Register}>
                Зарегистрируйтесь
          </Link>
              прямо сейчас
        </p>
        <form method="post" action="/" onSubmit={handleFormSubmit}>
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
            <label htmlFor="passwordLogin">Введите пароль</label>
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
                Войти
          </button>
        </form>
        {isErrorShown && <p className="input-login__error">{errorMessage}</p>}
      </section>
    </div>
  );
}

export default LoginForm;
