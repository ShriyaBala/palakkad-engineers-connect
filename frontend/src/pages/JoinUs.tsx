import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import API from '@/api/axios';

const JoinUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    aadhaar: '',
    residentialAddress: '',
    officeAddress: '',
    postOffice: '',
    pin: '',
    licenseNo: '',
    licenseDate: '',
    renewalDate: '',
    qualification: '',
    additionalQualification: '',
    skills: '',
    bloodGroup: '',
    unit: '',
    panchayath: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
    if (message) setMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/api/join-us/', formData);
      setMessage('✅ Membership application submitted!');
      setTimeout(() => navigate('/login'), 4000);
    } catch (err) {
      setError('❌ Submission failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-16">
        <div className="w-full max-w-2xl mx-auto">
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">LENSFED Membership Application</CardTitle>
              <CardDescription className="text-center">
                Fill out this form to apply for membership in LENSFED.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Basic Fields */}
                <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                <InputField label="Email" name="email" value={formData.email} type="email" onChange={handleChange} />
                <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                <InputField label="Area" name="area" value={formData.area} onChange={handleChange} />
                
                {/* Extra Fields */}
                <InputField label="Date of Birth" name="dob" value={formData.dob} type="date" onChange={handleChange} />
                <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female']} />
                <SelectField label="Marital Status" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} options={['Married', 'Unmarried']} />
                <InputField label="Aadhaar No" name="aadhaar" value={formData.aadhaar} onChange={handleChange} />
                <InputField label="Residential Address" name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} />
                <InputField label="Office Address" name="officeAddress" value={formData.officeAddress} onChange={handleChange} />
                <InputField label="Post Office" name="postOffice" value={formData.postOffice} onChange={handleChange} />
                <InputField label="PIN Code" name="pin" value={formData.pin} onChange={handleChange} />
                <InputField label="License No" name="licenseNo" value={formData.licenseNo} onChange={handleChange} />
                <InputField label="Date of Issue" name="licenseDate" value={formData.licenseDate} type="date" onChange={handleChange} />
                <InputField label="Next Renewal Date" name="renewalDate" value={formData.renewalDate} type="date" onChange={handleChange} />
                <InputField label="Academic Qualification" name="qualification" value={formData.qualification} onChange={handleChange} />
                <InputField label="Additional Qualification" name="additionalQualification" value={formData.additionalQualification} onChange={handleChange} />
                <InputField label="Skills" name="skills" value={formData.skills} onChange={handleChange} />
                <InputField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} />
                <InputField label="Panchayath/Municipality" name="panchayath" value={formData.panchayath} onChange={handleChange} />
                <InputField label="Unit" name="unit" value={formData.unit} onChange={handleChange} />

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                {message && <p className="text-green-600 text-sm text-center">{message}</p>}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Submitting...' : 'Apply for Membership'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-sm text-gray-600">
                Already a member?{' '}
                <a href="/login" className="text-blue-600 hover:underline">Login here</a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Reusable Field Components
const InputField = ({ label, name, value, type = 'text', onChange }) => (
  <div className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    <Input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="w-full"
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, options }) => (
  <div className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border rounded px-3 py-2"
      required
    >
      <option value="">Select {label}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default JoinUs;