import { Route, Routes } from 'react-router-dom';
import { AppRoute, FormStatus } from '../../utils/constant';
import LoginPage from '../../pages/login-page/login-page';
import RegistrationPage from '../../pages/regstration-page/registration-page';
import ErrorPage from '../../pages/error-page/error-page';
import PrivateRoute from '../private-route/private-route';
import GuitarListPage from '../../pages/guitar-list-page/guitar-list-page';
import GuitarPage from '../../pages/guitar-page/guitar-page';
import EditGuitarPage from '../../pages/edit-guitar-page/edit-guitar-page';
import AddGuitarPage from '../../pages/add-guitar-page/add-guitar-page';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthCheckedStatus, getIsAuthorized } from '../../store/user-data/selectors';
import { checkAuth } from '../../store/user-data/api-actions';
import { useEffect } from 'react';
import Loader from '../loader/loader';

function App(): JSX.Element {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isAuthorized = useAppSelector(getIsAuthorized);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  if(!isAuthChecked){
    return <Loader/>;
  }

  return (
    <Routes>
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route path={`${AppRoute.Register}`} element={<RegistrationPage />} />
      <Route path={AppRoute.Error} element={<ErrorPage />} />
      <Route
        path={AppRoute.List}
        element={
          <PrivateRoute isAuthorized={isAuthorized}>
            <GuitarListPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.List}/:id`}
        element={
          <PrivateRoute isAuthorized={isAuthorized}>
            <GuitarPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.List}/:id/${FormStatus.Edit}`}
        element={
          <PrivateRoute isAuthorized={isAuthorized}>
            <EditGuitarPage />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.List}/${FormStatus.Add}`}
        element={
          <PrivateRoute isAuthorized={isAuthorized}>
            <AddGuitarPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
