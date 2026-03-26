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

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@email.com',
    propertyType: '3BHK',
    budget: '₹85-95 Lakhs',
    location: 'Whitefield, Bangalore',
    source: 'Website',
    status: 'Site Visit',
    notes: 'Looking for properties near tech parks',
    createdAt: '2026-03-20',
    lastContact: '2026-03-23',
    followUpDate: '2026-03-27',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    phone: '+91 98765 43211',
    email: 'priya.sharma@email.com',
    propertyType: '2BHK',
    budget: '₹50-60 Lakhs',
    location: 'HSR Layout, Bangalore',
    source: 'Referral',
    status: 'Contacted',
    notes: 'First-time buyer, needs guidance',
    createdAt: '2026-03-22',
    lastContact: '2026-03-24',
    followUpDate: '2026-03-26',
  },
  {
    id: '3',
    name: 'Amit Patel',
    phone: '+91 98765 43212',
    email: 'amit.patel@email.com',
    propertyType: 'Villa',
    budget: '₹1.5-2 Crores',
    location: 'Sarjapur Road, Bangalore',
    source: 'Walk-in',
    status: 'New',
    notes: 'Interested in luxury villas with pool',
    createdAt: '2026-03-25',
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    phone: '+91 98765 43213',
    email: 'sneha.reddy@email.com',
    propertyType: 'Plot',
    budget: '₹30-40 Lakhs',
    location: 'Electronic City, Bangalore',
    source: 'Social Media',
    status: 'Contacted',
    notes: 'Planning to build custom home',
    createdAt: '2026-03-21',
    lastContact: '2026-03-25',
  },
  {
    id: '5',
    name: 'Vikram Singh',
    phone: '+91 98765 43214',
    email: 'vikram.singh@email.com',
    propertyType: '2BHK',
    budget: '₹55-65 Lakhs',
    location: 'Indiranagar, Bangalore',
    source: 'Advertisement',
    status: 'Converted',
    notes: 'Deal closed, property booked',
    createdAt: '2026-03-10',
    lastContact: '2026-03-20',
  },
  {
    id: '6',
    name: 'Neha Gupta',
    phone: '+91 98765 43215',
    email: 'neha.gupta@email.com',
    propertyType: '1BHK',
    budget: '₹30-35 Lakhs',
    location: 'Marathahalli, Bangalore',
    source: 'Website',
    status: 'Lost',
    notes: 'Budget constraints, looking for cheaper options',
    createdAt: '2026-03-15',
    lastContact: '2026-03-22',
  },
  {
    id: '7',
    name: 'Arjun Mehta',
    phone: '+91 98765 43216',
    email: 'arjun.mehta@email.com',
    propertyType: '3BHK',
    budget: '₹90 Lakhs - 1 Crore',
    location: 'Koramangala, Bangalore',
    source: 'Referral',
    status: 'Site Visit',
    notes: 'Interested in ready-to-move properties',
    createdAt: '2026-03-18',
    lastContact: '2026-03-24',
    followUpDate: '2026-03-28',
  },
  {
    id: '8',
    name: 'Divya Iyer',
    phone: '+91 98765 43217',
    email: 'divya.iyer@email.com',
    propertyType: '2BHK',
    budget: '₹60-70 Lakhs',
    location: 'JP Nagar, Bangalore',
    source: 'Website',
    status: 'New',
    notes: 'Looking for properties with good amenities',
    createdAt: '2026-03-25',
  },
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'new_lead',
    leadName: 'Divya Iyer',
    description: 'New lead from website contact form',
    timestamp: '2026-03-25T10:30:00',
  },
  {
    id: '2',
    type: 'site_visit',
    leadName: 'Rajesh Kumar',
    description: 'Site visit scheduled for tomorrow at 11 AM',
    timestamp: '2026-03-25T09:15:00',
  },
  {
    id: '3',
    type: 'status_change',
    leadName: 'Priya Sharma',
    description: 'Status changed from New to Contacted',
    timestamp: '2026-03-24T16:45:00',
  },
  {
    id: '4',
    type: 'note_added',
    leadName: 'Amit Patel',
    description: 'Added note: Interested in luxury villas',
    timestamp: '2026-03-25T08:00:00',
  },
  {
    id: '5',
    type: 'new_lead',
    leadName: 'Amit Patel',
    description: 'New walk-in lead registered',
    timestamp: '2026-03-25T07:30:00',
  },
];

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
