import { withAuth } from '@/lib/auth';

function Dashboard() {
	return <div>Dashboard</div>;
}

export default withAuth(Dashboard);
