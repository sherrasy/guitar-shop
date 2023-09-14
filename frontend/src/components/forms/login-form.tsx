import {useRef, useState, FormEvent} from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/constant';
import InputErrorField from './input-error-field';

function LoginForm(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isEmailInvalid, SetIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, SetIsPasswordInvalid] = useState(false);


  const checkEmail = ()=>{
    if(emailRef.current === null || emailRef.current.value === ''){
      SetIsEmailInvalid(true);
    }
  };

  const checkPassword = ()=>{
    if(passwordRef.current === null || passwordRef.current.value === ''){
      SetIsPasswordInvalid(true);
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null) {
      return{
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
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
                type="password"
                placeholder="• • • • • • • • • • • •"
                id="passwordLogin"
                name="password"
                autoComplete="off"
                ref={passwordRef}
                onChange={()=>SetIsPasswordInvalid(false)}
                onBlur={checkPassword}
                required
              />
              <button className="input-login__button-eye" type="button">
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
      </section>
    </div>
  );
}

export default LoginForm;
