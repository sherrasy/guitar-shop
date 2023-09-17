import {useRef, useState, FormEvent} from 'react';
import InputErrorField from './input-error-field';
import { useAppDispatch } from '../../hooks';
import CreateUserDto from '../../dto/user/create-user.dto';
import { register } from '../../store/user-data/api-actions';
import { checkValidity } from '../../utils/helpers';
import { ValidationPattern } from '../../utils/constant';

function RegistrationForm(): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [isEmailInvalid, SetIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, SetIsPasswordInvalid] = useState(false);
  const [isNameInvalid, SetIsNameInvalid] = useState(false);
  const [isPasswordShown, SetIsPasswordShown] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = (userData: CreateUserDto) => dispatch(register(userData));

  const handleClick = ()=> SetIsPasswordShown((prev)=> !prev);

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

  const checkName = ()=>{
    if(nameRef.current?.value === ''){
      SetIsNameInvalid(true);
      return false;
    }
    return true;
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (emailRef.current && passwordRef.current && nameRef.current) {
      const isEmailValid = checkEmail() && checkValidity(emailRef.current, ValidationPattern.Email);
      const isPasswordValid = checkPassword() && checkValidity(passwordRef.current, ValidationPattern.Password);
      const isNameValid = checkName();
      if(isEmailValid && isPasswordValid && isNameValid){
        onSubmit({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          name: nameRef.current.value,
        });
      }
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
                ref={nameRef}
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
                ref={emailRef}
                required
              />
              {isEmailInvalid && <InputErrorField/>}
            </div>
            <div className="input-login">
              <label htmlFor="password">Придумайте пароль</label>
              <span>
                <input
                  type={isPasswordShown ? 'text' : 'password'}
                  placeholder="• • • • • • • • • • • •"
                  id="password"
                  name="password"
                  autoComplete="off"
                  onChange={()=>SetIsPasswordInvalid(false)}
                  onBlur={checkPassword}
                  ref={passwordRef}
                  required
                />
                <button className="input-login__button-eye" type="button" onClick={handleClick}>
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
