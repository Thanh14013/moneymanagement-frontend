import React, {useState, useEffect, use} from 'react'
import Dashboard from '../components/Dashboard'
import { useUser } from '../hook/useUser'
import InfoCard from '../components/InfoCard';
import { Coins, Wallet, WalletCards } from 'lucide-react';
import { addThousandsSeparator } from '../util/util';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../util/AxiosConfig';
import { API_ENDPONT } from '../util/apiEnpoint';
import RecentTransaction from '../components/RecentTransaction';
import FinanceOverview from '../components/FinanceOverview';
import Transactions from '../components/Transactions';

const Home = () => {
  useUser();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const respond = await axiosConfig.get(API_ENDPONT.DASHBOARD_DATA);
      if (respond.status === 200) {
        setDashboardData(respond.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => {};
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Dashboard" >
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Display the cards*/}
            <InfoCard
              icon={<WalletCards />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
              color="bg-blue-800"
            />
            <InfoCard
              icon={<Wallet/>}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncomes || 0)}
              color="bg-green-800"
            />
            <InfoCard
              icon={<Coins />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpenses || 0)}
              color="bg-red-800"
            />

          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mt-6">
            {/* Recent transactions */}
            <RecentTransaction
              Transactions={dashboardData?.recentTransactions}
              onMore={() => navigate('/expense')}
            />

            {/* finance overview chart */}
              <FinanceOverview 
                totalBalance={dashboardData?.totalBalance}
                totalIncome={dashboardData?.totalIncomes}
                totalExpense={dashboardData?.totalExpenses}
              />

            {/* Expense transactions */}
              <Transactions
                transactions={dashboardData?.recent5Expenses}
                onMore={() => navigate('/expense')}
                type="expense"
                title="Recent Expense Transactions"
              />

            {/* Income transactions */}
              <Transactions
                transactions={dashboardData?.recent5Incomes}
                onMore={() => navigate('/income')}
                type="income"
                title="Recent Income Transactions"
              />

          </div>
        </div>

      </Dashboard>
    </div>
  )
}

export default Home