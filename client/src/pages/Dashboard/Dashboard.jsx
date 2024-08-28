import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// =============================================
import { USER_ROLES } from '../../constants';
// =============================================
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const params = useParams();

  const { role } = useSelector((state) => state.userStore.data);
  return role === USER_ROLES.CUSTOMER ? (
    <CustomerDashboard navigate={navigate} params={params} />
  ) : (
    <CreatorDashboard navigate={navigate} params={params} />
  );
};

export default Dashboard;
