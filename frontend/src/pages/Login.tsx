import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter
} from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import axios from '@/api/axios';


const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // <-- Success message state
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(""); // <-- Popup message state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setPopup(""); // Clear previous popup
    try {
      const response = await axios.post("/api/login/", {
        email: formData.email,
        password: formData.password,
      });

      // Store token and user info
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('role', response.data.user.role);
      localStorage.setItem('is_staff', response.data.user.is_staff.toString());
      localStorage.setItem('is_superuser', response.data.user.is_superuser.toString());

      // Redirect based on user role
      if (response.data.redirect_to) {
        navigate(response.data.redirect_to);
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      if (err.response && err.response.status === 403) {
        setPopup("Your account is pending approval.");
      } else {
        setError('❌ Invalid email or password. Please try again.');
        
      }
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
              <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
              <CardDescription className="text-center">
                Login using your <b>email</b> and the password sent to your email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                {success && <p className="text-green-600 text-sm text-center">{success}</p>}
                {popup && <div className="popup text-center">{popup}</div>}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Log In'}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-sm text-gray-600">
                Not registered?{' '}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Create an account
                </Link>
              </p>
            </CardFooter>
          </Card>
          <div style={{ marginTop: "1em" }}>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;