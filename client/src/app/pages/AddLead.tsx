import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Save, X, Loader2 } from 'lucide-react';
import { Lead } from '../data/mockData';
import { api } from '../lib/api';
import { toast } from 'sonner';

export function AddLead() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '2BHK',
    budget: '',
    location: '',
    source: 'Website',
    status: 'New',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit) {
      fetchLead();
    }
  }, [id]);

  const fetchLead = async () => {
    try {
      const response = await api.leads.getOne(id as string);
      const lead = response.data;
      setFormData({
        name: lead.name,
        phone: lead.phone,
        email: lead.email || '',
        propertyType: lead.propertyType,
        budget: lead.budget,
        location: lead.location,
        source: lead.source,
        status: lead.status,
        notes: lead.notes?.[0]?.text || '', // Assuming notes is an array from backend
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch lead details');
      navigate('/leads');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.budget.trim()) newErrors.budget = 'Budget is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const leadData = {
          ...formData,
          // Transform notes into the array of objects format the backend expects
          notes: formData.notes.trim() ? [{ text: formData.notes.trim() }] : [],
        };

        if (isEdit) {
          // For update, we might not want to overwrite all notes with just one
          // But if this is the "Edit Lead" page, it might be expected.
          // However, the backend model expects notes: [noteSchema]
          await api.leads.update(id as string, leadData);
          toast.success('Lead updated successfully');
        } else {
          await api.leads.create(leadData);
          toast.success('Lead added successfully');
        }
        navigate('/leads');
      } catch (error: any) {
        console.error('Save error:', error);
        toast.error(error.message || 'Failed to save lead');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <button
          onClick={() => navigate('/leads')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </button>
        <h1>{isEdit ? 'Edit Lead' : 'Add New Lead'}</h1>
        <p className="text-muted-foreground">
          {isEdit ? 'Update lead information' : 'Enter details for the new lead'}
        </p>
      </div>

      {fetching ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-muted-foreground italic">Loading lead details...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-input-background rounded-lg border ${
                  errors.name ? 'border-destructive' : 'border-transparent'
                } focus:border-primary focus:outline-none transition-colors`}
                placeholder="Enter full name"
              />
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block mb-2">
                Phone Number <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-input-background rounded-lg border ${
                  errors.phone ? 'border-destructive' : 'border-transparent'
                } focus:border-primary focus:outline-none transition-colors`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-input-background rounded-lg border ${
                  errors.email ? 'border-destructive' : 'border-transparent'
                } focus:border-primary focus:outline-none transition-colors`}
                placeholder="email@example.com"
              />
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block mb-2">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
              >
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">
                Budget <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-input-background rounded-lg border ${
                  errors.budget ? 'border-destructive' : 'border-transparent'
                } focus:border-primary focus:outline-none transition-colors`}
                placeholder="₹50-60 Lakhs"
              />
              {errors.budget && <p className="text-destructive text-sm mt-1">{errors.budget}</p>}
            </div>

            <div>
              <label className="block mb-2">
                Preferred Location <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-input-background rounded-lg border ${
                  errors.location ? 'border-destructive' : 'border-transparent'
                } focus:border-primary focus:outline-none transition-colors`}
                placeholder="HSR Layout, Bangalore"
              />
              {errors.location && <p className="text-destructive text-sm mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block mb-2">Lead Source</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Walk-in">Walk-in</option>
                <option value="Social Media">Social Media</option>
                <option value="Advertisement">Advertisement</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Site Visit">Site Visit</option>
                <option value="Converted">Converted</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 bg-input-background rounded-lg border border-transparent focus:border-primary focus:outline-none transition-colors resize-none"
              placeholder="Add any additional notes or requirements..."
            />
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isEdit ? (loading ? 'Updating...' : 'Update Lead') : (loading ? 'Saving...' : 'Save Lead')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/leads')}
              className="flex items-center gap-2 px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
