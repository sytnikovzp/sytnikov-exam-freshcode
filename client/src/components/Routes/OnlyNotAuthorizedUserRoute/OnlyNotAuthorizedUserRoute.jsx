import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
// =============================================
import { getUser } from '../../../store/slices/userSlice';
// =============================================
import Spinner from '../../Spinner/Spinner';

function OnlyNotAuthorizedUserRoute() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isFetching } = useSelector((state) => state.userStore);

  useEffect(() => {
    dispatch(getUser(navigate));
  }, [dispatch, navigate]);

  if (isFetching) {
    return <Spinner />;
  }

  if (data) {
    navigate('/');
    return null;
  }

  return <Outlet />;
}

export default OnlyNotAuthorizedUserRoute;
