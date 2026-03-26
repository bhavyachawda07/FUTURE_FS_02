import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, Save, X } from 'lucide-react';
import { mockLeads } from '../data/mockData';

export function AddLead() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const existingLead = isEdit ? mockLeads.find((l) => l.id === id) : null;

  const [formData, setFormData] = useState({
    name: existingLead?.name || '',
    phone: existingLead?.phone || '',
    email: existingLead?.email || '',
    propertyType: existingLead?.propertyType || '2BHK',
    budget: existingLead?.budget || '',
    location: existingLead?.location || '',
    source: existingLead?.source || 'Website',
    status: existingLead?.status || 'New',
    notes: existingLead?.notes || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.budget.trim()) newErrors.budget = 'Budget is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      navigate('/leads');
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
              Email Address <span className="text-destructive">*</span>
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
            className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            <Save className="w-5 h-5" />
            {isEdit ? 'Update Lead' : 'Save Lead'}
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
    </div>
  );
}
