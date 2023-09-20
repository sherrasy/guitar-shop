import {useRef, useState, FormEvent} from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, ValidationPattern } from '../../utils/constant';
import { useAppDispatch } from '../../hooks';
import { AuthData } from '../../types/auth-data.type';
import { login } from '../../store/user-data/api-actions';
import { checkValidity } from '../../utils/helpers';
import InputErrorField from '../input-error-field/input-error-field';

function LoginForm(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isEmailInvalid, SetIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, SetIsPasswordInvalid] = useState(false);
  const [isPasswordShown, SetIsPasswordShown] = useState(false);
  const [isErrorShown, SetIsErrorShown] = useState(false);
  const errorMessage = 'Возникла ошибка входа. Проверьте введенные данные и попробуйте снова';

  const dispatch = useAppDispatch();

  const handleSubmitData = (authData: AuthData) => dispatch(login(authData));

  const handleShowButtonClick = ()=> SetIsPasswordShown((prev)=> !prev);

  const checkEmail = ()=>{
    if(emailRef.current?.value === ''){
      SetIsEmailInvalid(true);
      return false;
    }
    return true;
  };

  const checkPassword = ()=>{
    if (passwordRef.current?.value === ''){
      SetIsPasswordInvalid(true);
      return false;
    }
    return true;

  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current && passwordRef.current ) {
      const isEmailValid = checkEmail() && checkValidity(emailRef.current, ValidationPattern.Email);
      const isPasswordValid = checkPassword() && checkValidity(passwordRef.current, ValidationPattern.Password);
      if (isEmailValid && isPasswordValid) {
        handleSubmitData ({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
        SetIsErrorShown(false);
      }else{
        SetIsErrorShown(true);
      }
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
              id="email"
              name="email"
              autoComplete="off"
              ref={emailRef}
              onChange={()=>SetIsEmailInvalid(false)}
              onBlur={checkEmail}
              required
            />
            {isEmailInvalid && <InputErrorField/>}
          </div>
          <div className="input-login">
            <label htmlFor="passwordLogin">Введите пароль</label>
            <span>
              <input
                type={isPasswordShown ? 'text' : 'password'}
                placeholder="• • • • • • • • • • • •"
                id="passwordLogin"
                name="password"
                autoComplete="off"
                ref={passwordRef}
                onChange={()=>SetIsPasswordInvalid(false)}
                onBlur={checkPassword}
                required
              />
              <button className="input-login__button-eye" type="button" onClick={handleShowButtonClick}>
                <svg width="14" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-eye"></use>
                </svg>
              </button>
            </span>
            { isPasswordInvalid && <InputErrorField/>}
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
