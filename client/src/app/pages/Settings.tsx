import { User, Bell, Shield, Database } from 'lucide-react';

export function Settings() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1>Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3>Profile Settings</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              defaultValue="john@realestate.com"
              className="w-full px-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block mb-2">Phone</label>
            <input
              type="tel"
              defaultValue="+91 98765 43210"
              className="w-full px-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block mb-2">Role</label>
            <select className="w-full px-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors">
              <option>Sales Agent</option>
              <option>Team Leader</option>
              <option>Manager</option>
            </select>
          </div>
        </div>
        <button className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
          Save Changes
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h3>Notification Preferences</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span>Email notifications for new leads</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span>SMS alerts for site visits</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span>Push notifications for follow-ups</span>
            <input type="checkbox" className="rounded" />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span>Weekly performance summary</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </label>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <h3>Security</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full px-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>
        <button className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
          Update Password
        </button>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h3>Data Management</h3>
        </div>
        <div className="space-y-3">
          <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity text-left">
            Export All Leads (CSV)
          </button>
          <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity text-left">
            Download Activity Report
          </button>
          <button className="w-full px-4 py-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors text-left">
            Delete All Data
          </button>
        </div>
      </div>
    </div>
  );
}
