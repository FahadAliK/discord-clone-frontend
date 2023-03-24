import { useSelector } from 'react-redux';
import Layout from '../shared/Layout';
import { connectSocket } from '../socket';

function Dashboard() {
	const { token } = useSelector((state) => state.auth);
	if (token) {
		connectSocket(token);
	}
	return (
		<div>
			<Layout>Dashborad</Layout>
		</div>
	);
}

export default Dashboard;
