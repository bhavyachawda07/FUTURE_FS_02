import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const monthlyData = [
  { month: 'Oct', leads: 12, converted: 3, revenue: 180 },
  { month: 'Nov', leads: 18, converted: 5, revenue: 300 },
  { month: 'Dec', leads: 15, converted: 4, revenue: 240 },
  { month: 'Jan', leads: 22, converted: 7, revenue: 420 },
  { month: 'Feb', leads: 19, converted: 6, revenue: 360 },
  { month: 'Mar', leads: 25, converted: 8, revenue: 480 },
];

const sourceData = [
  { name: 'Website', value: 35, fill: '#3b82f6' },
  { name: 'Referral', value: 25, fill: '#10b981' },
  { name: 'Social Media', value: 20, fill: '#f59e0b' },
  { name: 'Walk-in', value: 12, fill: '#8b5cf6' },
  { name: 'Advertisement', value: 8, fill: '#ef4444' },
];

const propertyTypeData = [
  { type: '2BHK', count: 35 },
  { type: '3BHK', count: 28 },
  { type: 'Villa', count: 15 },
  { type: '1BHK', count: 12 },
  { type: 'Plot', count: 10 },
];

export function Analytics() {
  const kpis = [
    { title: 'Avg. Response Time', value: '2.5 hrs', icon: TrendingUp, color: 'bg-blue-500' },
    { title: 'Conversion Rate', value: '32%', icon: Target, color: 'bg-green-500' },
    { title: 'Active Leads', value: '45', icon: Users, color: 'bg-purple-500' },
    { title: 'Revenue This Month', value: '₹48L', icon: DollarSign, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Analytics</h1>
        <p className="text-muted-foreground">Detailed insights and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.title} className="bg-card rounded-xl border border-border p-6">
              <div className={`${kpi.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-muted-foreground text-sm">{kpi.title}</p>
              <p className="text-3xl mt-1">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="mb-4">Monthly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
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
              <Legend />
              <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={2} name="Total Leads" />
              <Line type="monotone" dataKey="converted" stroke="#10b981" strokeWidth={2} name="Converted" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="mb-4">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}%`}
                outerRadius={100}
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="mb-4">Property Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={propertyTypeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="type" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
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
              <Bar dataKey="revenue" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Revenue (Lakhs)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
