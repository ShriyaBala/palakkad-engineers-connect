import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter
} from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import API from '@/api/axios';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    location: '',
    district: '',
    area: '',
    unit: '',
    customArea: '',
    customUnit: ''
  });
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [units, setUnits] = useState([]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const areaUnits = {
    "Palakkad Town": ["Olavakkode", "Kunnathurmedu", "Vadakkanthara", "Other"],
    "Ottapalam": ["Vaniyamkulam", "Ambalapara", "Anakkara", "Other"],
    "Chittur": ["Nallepilly", "Ayiloor", "Thekkedesom", "Other"],
    "Alathur": ["Alathur Town", "Kizhakkenchery", "Kuthannur", "Other"],
    "Mannarkkad": ["Mannarkkad Town", "Kanjirappuzha", "Alanallur", "Other"],
    "Shoranur": ["Shoranur Town", "Kulappully", "Vadanamkurussi", "Other"],
    "Pattambi": ["Pattambi Town", "Koppam", "Muthuthala", "Other"],
    "Cherpulassery": ["Cherpulassery Town", "Karalmanna", "Kappur", "Other"],
    "Kollengode": ["Kollengode Town", "Koduvayur", "Puthunagaram", "Other"],
    "Nemmara": ["Nemmara Town", "Vellangallur", "Elavanchery", "Other"],
    "Parli": ["Parli Town", "Pallassana", "Kottayi", "Other"],
    "Kongad": ["Kongad Town", "Mannur", "Kottayi", "Other"],
    "Kozhinjampara": ["Kozhinjampara Town", "Meenakshipuram", "Eruthempathy", "Other"],
    "Muthalamada": ["Muthalamada Town", "Elavanchery", "Parambikulam", "Other"],
    "Other": ["Other"]
  };

  const allAreas = Object.keys(areaUnits);

  useEffect(() => {
    const fetchDistricts = async () => {
      const res = await API.get('/api/districts/');
      setDistricts(res.data);
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    if (formData.district) {
      API.get(`/api/areas/?district_id=${formData.district}`)
        .then(res => setAreas(res.data));
    }
    setFormData(prev => ({ ...prev, area: '', unit: '' }));
    setUnits([]);
  }, [formData.district]);

  useEffect(() => {
    if (formData.area) {
      API.get(`/api/units/?area_id=${formData.area}`)
        .then(res => setUnits(res.data));
    }
    setFormData(prev => ({ ...prev, unit: '' }));
  }, [formData.area]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Use customArea if area is "Other", else use selected area
      // Use customUnit if unit is "Other", else use selected unit
      const area = formData.area === "Other" ? formData.customArea : formData.area;
      const unit = formData.unit === "Other" ? formData.customUnit : formData.unit;

      await API.post('/api/register/', { ...formData, area, unit });
      setSuccess('Registration successful! Please check your email for your default password.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Registration failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Registration</CardTitle>
              <CardDescription className="text-center">
                Create your account .<br />
                <span className="font-semibold text-green-700">
                  After registration, a default password will be sent to your email.
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Area Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="area">Area</Label>
                  <select
                    name="area"
                    id="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select Area</option>
                    {allAreas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
                {/* If "Other" area, show input */}
                {formData.area === "Other" && (
                  <div className="space-y-2">
                    <Label htmlFor="customArea">Custom Area</Label>
                    <Input
                      id="customArea"
                      name="customArea"
                      type="text"
                      placeholder="Enter your area"
                      value={formData.customArea}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}

                {/* Unit Dropdown */}
                {formData.area && (
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <select
                      name="unit"
                      id="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      required
                      className="w-full border p-2 rounded"
                    >
                      <option value="">Select Unit</option>
                      {(areaUnits[formData.area] || []).map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                )}
                {/* If "Other" unit, show input */}
                {formData.unit === "Other" && (
                  <div className="space-y-2">
                    <Label htmlFor="customUnit">Custom Unit</Label>
                    <Input
                      id="customUnit"
                      name="customUnit"
                      type="text"
                      placeholder="Enter your unit"
                      value={formData.customUnit}
                      onChange={handleChange}
                      required
                    />
                  </div>
                )}
                {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                {success && <p className="text-green-600 text-sm text-center">{success}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Login here
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;