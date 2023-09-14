import {useRef, useState, FormEvent} from 'react';
import InputErrorField from './input-error-field';

function RegistrationForm(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [isEmailInvalid, SetIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, SetIsPasswordInvalid] = useState(false);
  const [isNameInvalid, SetIsNameInvalid] = useState(false);


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

  const checkName = ()=>{
    if(nameRef.current === null || nameRef.current.value === ''){
      SetIsNameInvalid(true);
    }
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current !== null && passwordRef.current !== null && nameRef.current !== null) {
      return{
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name: nameRef.current.value,
      };
    }
  };
  return (
    <div>
      <div className="container">
        <section className="login">
          <h1 className="login__title">Регистрация</h1>
          <form method="post" action="/" onSubmit={handleFormSubmit}>
            <div className="input-login">
              <label htmlFor="name">Введите имя</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                onChange={()=>SetIsNameInvalid(false)}
                onBlur={checkName}
                required
              />
              {isNameInvalid && <InputErrorField/>}
            </div>
            <div className="input-login">
              <label htmlFor="email">Введите e-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                onChange={()=>SetIsEmailInvalid(false)}
                onBlur={checkEmail}
                required
              />
              {isEmailInvalid && <InputErrorField/>}
            </div>
            <div className="input-login">
              <label htmlFor="password">Придумайте пароль</label>
              <span>
                <input
                  type="password"
                  placeholder="• • • • • • • • • • • •"
                  id="password"
                  name="password"
                  autoComplete="off"
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
              Зарегистрироваться
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default RegistrationForm;
