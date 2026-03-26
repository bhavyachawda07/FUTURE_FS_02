import { TrendingUp, Users, Calendar, CheckCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { dashboardStats, mockActivities } from '../data/mockData';

export function Dashboard() {
  const stats = [
    {
      title: 'Total Leads',
      value: dashboardStats.totalLeads,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'New Leads',
      value: dashboardStats.newLeads,
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-green-500',
    },
    {
      title: 'Site Visits',
      value: dashboardStats.siteVisits,
      change: '-3%',
      trend: 'down',
      icon: Calendar,
      color: 'bg-orange-500',
    },
    {
      title: 'Converted',
      value: dashboardStats.converted,
      change: '+15%',
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your lead overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">{stat.title}</p>
                <p className="text-3xl mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="mb-4">Leads per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardStats.leadsThisMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="mb-4">Conversion Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardStats.conversionRate}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}%`}
                outerRadius={100}
                dataKey="value"
              >
                {dashboardStats.conversionRate.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                activity.type === 'new_lead' ? 'bg-blue-100 dark:bg-blue-900' :
                activity.type === 'site_visit' ? 'bg-orange-100 dark:bg-orange-900' :
                activity.type === 'status_change' ? 'bg-green-100 dark:bg-green-900' :
                'bg-purple-100 dark:bg-purple-900'
              }`}>
                {activity.type === 'new_lead' && <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                {activity.type === 'site_visit' && <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
                {activity.type === 'status_change' && <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />}
                {activity.type === 'note_added' && <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
              </div>
              <div className="flex-1">
                <p className="text-card-foreground">{activity.description}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {activity.leadName} • {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
