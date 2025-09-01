import React, { useState } from 'react'
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import axiosConfig from '../util/AxiosConfig';
import toast from 'react-hot-toast';
import { API_ENDPONT } from '../util/apiEnpoint';
import { LoaderCircle } from 'lucide-react';
import ProfilePhotoSelector from '../components/ProfilePhotoSelector';
import uploadProfileImage from '../util/uploadProfileImage';

const Signup = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Kiểm tra Full Name
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Full Name must be at least 2 characters';
    }

    // Kiểm tra Email
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    // Kiểm tra Password
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let profileImageUrl = "";

    // Ngăn reload trang khi đang loading
    if (isLoading) {
      return;
    }
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setError('Please fix all errors before submitting');
      return;
    }

    // Clear errors if validation passes
    setErrors({});
    setError(null);
    
    // Bắt đầu loading
    setIsLoading(true);
    
    // Add signup logic here
    try {

      if(image){
        const imageUrl= await uploadProfileImage(image);
        profileImageUrl = imageUrl || "";
      }

      const response = await axiosConfig.post(API_ENDPONT.REGISTER, { fullName, email, password, profileImageUrl });
      if (response.status === 201) {
        console.log('Signup successful:', response.data);
        toast.success('Signup successful!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      toast.error('Signup failed. Please try again.');
      setError('Signup failed. Please try again.');
    } finally {
      // Kết thúc loading
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{ margin: 0, padding: 0 }}>
      {/* Background Image */}
      <img
        src={assets.login_bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm pointer-events-none select-none"
        style={{ objectFit: 'cover' }}
      />
      <div class="flex items-center justify-center backdrop-blur-sm w-[500px]">
        <div class="w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg">
          <h1 class="text-2xl font-bold text-center text-gray-800">Create An Account</h1>
          <p class="mt-2 text-center text-gray-600">Start tracking your spendings by joining with us.</p>
          
          {/* Display general error */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <ProfilePhotoSelector image={image} setImage={setImage} />

          <form onSubmit={handleSubmit} class="mt-8 space-y-6">
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700">Full Name</label>
              <input 
                onChange={(e) => setFullName(e.target.value)} 
                value={fullName} 
                type="text" 
                id="fullName" 
                placeholder="Jhon Doe" 
                class={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                required 
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                type="email" 
                id="email" 
                placeholder="name@example.com" 
                class={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                required 
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                type="password" 
                id="password" 
                placeholder="********" 
                class={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                required 
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              class={`w-full py-3 px-4 text-white text-sm font-bold uppercase rounded-md shadow focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-800 hover:to-purple-600'
              }`}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin h-5 w-5 text-white" />
                  SIGNING UP...
                </>
              ) : 'SIGN UP'}
            </button>
          </form>
          <p class="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <Link to="/login" class="font-medium text-purple-600 hover:text-purple-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>

    </div>
  )
}

export default Signup