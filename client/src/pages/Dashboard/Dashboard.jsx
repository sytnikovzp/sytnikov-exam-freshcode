import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// =============================================
import constants from '../../constants';
// =============================================
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';

function Dashboard() {
  const navigate = useNavigate();
  const params = useParams();
  const { role } = useSelector((state) => state.userStore.data);

  if (role === constants.USER_ROLES.CUSTOMER) {
    return <CustomerDashboard navigate={navigate} params={params} />;
  } else {
    return <CreatorDashboard navigate={navigate} params={params} />;
  }
}

export default Dashboard;
