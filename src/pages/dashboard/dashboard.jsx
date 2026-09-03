import CardMetrics from './layout/CardMetrics';
import DocumentStatusOverview from './layout/DocumentStatusOverview';
import DocumentByCategory from './layout/DocumentByCategory';
import RecentDocuments from './layout/RecentDocuments';
import Notification from './layout/Notification';
import QuickAction from './layout/QuickAction';

const Dashboard = () => {
    return (
        <div className='grid gap-4'>
            <CardMetrics/>
            <QuickAction/>
        </div>
    );
};

export default Dashboard;