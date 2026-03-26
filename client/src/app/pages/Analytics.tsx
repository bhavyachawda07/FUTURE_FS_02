import { useState, useEffect } from 'react';
import { TrendingUp, Users, Target, Loader2, PieChart as PieIcon, BarChart as BarIcon } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { api } from '../lib/api';
import { toast } from 'sonner';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'];

export function Analytics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.dashboard.getAnalytics();
      setData(response.data);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch analytics');
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

  const kpis = [
    { 
      title: 'Active Leads', 
      value: data?.kpis?.activeLeads || 0, 
      icon: Users, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Conversion Rate', 
      value: `${data?.conversionRate || 0}%`, 
      icon: Target, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Total Leads', 
      value: data?.kpis?.totalLeads || 0, 
      icon: TrendingUp, 
      color: 'bg-purple-500' 
    },
    { 
      title: 'Converted Leads', 
      value: data?.kpis?.convertedLeads || 0, 
      icon: Target, 
      color: 'bg-orange-500' 
    },
  ];

  const monthlyChartData = data?.leadsPerMonth?.map((item: any) => ({
    month: MONTHS[item._id.month - 1],
    leads: item.count
  })) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1>Analytics</h1>
        <p className="text-muted-foreground">Real-time insights and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.title} className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className={`${kpi.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 shadow-inner`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-muted-foreground text-sm font-medium">{kpi.title}</p>
              <p className="text-3xl font-bold mt-1 text-card-foreground">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h3 className="mb-6 font-semibold flex items-center gap-2">
            <BarIcon className="w-5 h-5 text-primary" />
            Monthly Lead Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} name="Total Leads" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
          <h3 className="mb-6 font-semibold flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-primary" />
            Lead Sources Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data?.sourceDistribution || []}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {data?.sourceDistribution?.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-6 font-semibold flex items-center gap-2">
            <BarIcon className="w-5 h-5 text-primary" />
            Property Type Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.propertyDistribution || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="type" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

