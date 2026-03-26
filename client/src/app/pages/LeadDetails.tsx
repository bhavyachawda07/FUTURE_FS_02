import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Edit, Trash2, DollarSign, Home } from 'lucide-react';
import { mockLeads } from '../data/mockData';

const statusColors = {
  New: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  Contacted: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
  'Site Visit': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  Converted: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  Lost: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

export function LeadDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const lead = mockLeads.find((l) => l.id === id);

  if (!lead) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Lead not found</p>
        <button
          onClick={() => navigate('/leads')}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
        >
          Back to Leads
        </button>
      </div>
    );
  }

  const timeline = [
    { date: lead.createdAt, status: 'New', description: 'Lead created' },
    ...(lead.lastContact ? [{ date: lead.lastContact, status: 'Contacted', description: 'Last contacted' }] : []),
    ...(lead.followUpDate ? [{ date: lead.followUpDate, status: 'Follow-up', description: 'Follow-up scheduled' }] : []),
  ];

  return (
    <div className="max-w-6xl">
      <button
        onClick={() => navigate('/leads')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Leads
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="mb-2">{lead.name}</h1>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${statusColors[lead.status]}`}>
                  {lead.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/edit-lead/${lead.id}`)}
                  className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3>Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p>{lead.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="break-all">{lead.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p>{lead.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3>Property Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                      <Home className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p>{lead.propertyType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p>{lead.budget}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lead Source</p>
                      <p>{lead.source}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="mb-4">Status Timeline</h3>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    {index !== timeline.length - 1 && (
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-border"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p className="font-medium">{item.status}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="mb-4">Notes</h3>
            <div className="space-y-4">
              <div className="p-4 bg-accent rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">System Note</span>
                  <span className="text-xs text-muted-foreground">{lead.createdAt}</span>
                </div>
                <p className="text-sm">{lead.notes}</p>
              </div>
            </div>
            <div className="mt-4">
              <textarea
                placeholder="Add a new note..."
                rows={3}
                className="w-full px-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors resize-none"
              />
              <button className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Add Note
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call Lead
              </button>
              <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Send Email
              </button>
              <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Visit
              </button>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="mb-4">Follow-up Reminder</h3>
            <div className="space-y-3">
              <input
                type="date"
                defaultValue={lead.followUpDate}
                className="w-full px-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
              <input
                type="time"
                defaultValue="10:00"
                className="w-full px-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Set Reminder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
