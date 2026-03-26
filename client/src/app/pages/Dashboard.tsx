import { useState, useEffect } from 'react';
import { TrendingUp, Users, Calendar, CheckCircle, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../lib/api';
import { toast } from 'sonner';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, analyticsRes, leadsRes] = await Promise.all([
        api.dashboard.getStats(),
        api.dashboard.getAnalytics(),
        api.leads.getAll()
      ]);

      setStats(statsRes.data);
      setAnalytics(analyticsRes.data);
      setRecentLeads(leadsRes.data.slice(0, 5)); // Show last 5 leads
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Leads',
      value: stats?.totalLeads || 0,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'New Leads',
      value: stats?.newLeads || 0,
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Site Visits',
      value: stats?.siteVisits || 0,
      icon: Calendar,
      color: 'bg-orange-500',
    },
    {
      title: 'Converted',
      value: stats?.convertedLeads || 0,
      icon: CheckCircle,
      color: 'bg-purple-500',
    },
  ];

  // Helper function to format month chart data
  const formatChartData = (data: any[]) => {
    if (!data) return [];
    return data.map(item => ({
      month: MONTHS[item._id.month - 1],
      count: item.count
    }));
  };

  const chartData = formatChartData(analytics?.leadsPerMonth);
  const conversionData = [
    { name: 'Converted', value: analytics?.conversionRate || 0, fill: '#10b981' },
    { name: 'Remaining', value: 100 - (analytics?.conversionRate || 0), fill: '#3b82f6' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your real-time lead overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center shadow-inner`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold mt-1 text-card-foreground">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h3 className="mb-6 font-semibold">Leads Growth (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h3 className="mb-6 font-semibold">Conversion Rate (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={conversionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {conversionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Converted ({analytics?.conversionRate}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-muted-foreground">Other</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="mb-6 font-semibold">Recent Leads</h3>
        <div className="space-y-4">
          {recentLeads.length > 0 ? (
            recentLeads.map((lead: any) => (
              <div key={lead._id} className="flex items-center gap-4 py-3 border-b border-border last:border-0 hover:bg-accent/50 transition-colors px-2 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-card-foreground">{lead.name}</p>
                  <p className="text-sm text-muted-foreground">
                    New lead from {lead.source} • {lead.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{new Date(lead.createdAt).toLocaleDateString()}</p>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full mt-1 inline-block">
                    {lead.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-6 text-muted-foreground italic">No recent activity found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

