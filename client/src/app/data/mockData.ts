export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyType: '1BHK' | '2BHK' | '3BHK' | 'Villa' | 'Plot';
  budget: string;
  location: string;
  source: 'Website' | 'Referral' | 'Walk-in' | 'Social Media' | 'Advertisement';
  status: 'New' | 'Contacted' | 'Site Visit' | 'Converted' | 'Lost';
  notes: string;
  createdAt: string;
  lastContact?: string;
  followUpDate?: string;
}

export interface Activity {
  id: string;
  type: 'new_lead' | 'site_visit' | 'status_change' | 'note_added';
  leadName: string;
  description: string;
  timestamp: string;
}

export const mockLeads: Lead[] = [];

export const mockActivities: Activity[] = [];

export const dashboardStats = {
  totalLeads: 45,
  newLeads: 8,
  siteVisits: 6,
  converted: 12,
  leadsThisMonth: [
    { month: 'Oct', count: 12 },
    { month: 'Nov', count: 18 },
    { month: 'Dec', count: 15 },
    { month: 'Jan', count: 22 },
    { month: 'Feb', count: 19 },
    { month: 'Mar', count: 25 },
  ],
  conversionRate: [
    { name: 'Converted', value: 30, fill: '#10b981' },
    { name: 'In Progress', value: 45, fill: '#3b82f6' },
    { name: 'Lost', value: 25, fill: '#ef4444' },
  ],
};
