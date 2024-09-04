import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
// =============================================
import Spinner from '../../Spinner/Spinner';

function PrivateRoute() {
  const { data, isFetching } = useSelector((state) => state.userStore);

  if (isFetching) {
    return <Spinner />;
  }

  return data ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
