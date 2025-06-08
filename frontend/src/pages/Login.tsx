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
import API from '@/api/axios';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post('/api/token/', formData); // JWT login
      const { access, refresh } = response.data;

      // Store tokens in localStorage
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('❌ Invalid username or password. Please try again.');
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
                Login using your <b>username</b> and the password sent to your email.
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
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

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
        </div>
      </div>
    </div>
  );
};

export default Login;