import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/passwordinput';
import CountryDialInput from '@/components/ui/countrydialinput';
import SignupLayout from './SignupLayout';

interface SignupLanding {
  onNext: () => void;
}

const Signup: React.FC<SignupLanding> = ({ onNext }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const isFormValid = 
    formData.name.trim() !== '' && 
    formData.email.trim() !== '' && 
    formData.password.trim() !== '' && 
    formData.phone.trim() !== '';

  console.log('Form data:', formData); // Add this for debugging

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const header = (
    <>
      <h1 className="title-font mb-4 md:text-6xl font-bold">SPORTSBALL</h1>
      <p className="body-font text-lg font-bold">Get ready for kickoff!</p>
    </>
  );

  return (
    <SignupLayout header={header}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-6">
          <label className="block mb-2 text-coolGray-800 font-medium" htmlFor="name">Name*</label>
          <Input 
            placeholder="Your name" 
            value={formData.name}
            onChange={handleInputChange('name')}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-coolGray-800 font-medium" htmlFor="email">Email*</label>
          <Input 
            placeholder="you@example.com" 
            type="email" 
            value={formData.email}
            onChange={handleInputChange('email')}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-coolGray-800 font-medium" htmlFor="password">Password*</label>
          <PasswordInput 
            placeholder="Password" 
            value={formData.password}
            onChange={handleInputChange('password')}
          />
        </div>
        <div className="transition-all duration-300 ease-in-out">
          <div className="mb-4">
            <label className="block mb-2 text-coolGray-800 font-medium" htmlFor="phone">Phone*</label>
            <CountryDialInput 
              onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
            />
          </div>
          <div className="flex items-center mb-4">
            <Checkbox className="data-[state=checked]:bg-green-900 border-gray-300"/>
            <label htmlFor="Checkbox" className="ml-2 text-sm font-medium text-gray-900">Remember me</label>
          </div>  
          <Button 
            onClick={onNext} 
            className="w-full py-6 mb-5"
            disabled={!isFormValid}
          >
            Sign Up
          </Button>
          <button 
            type="button"
            className="inline-flex items-center justify-center py-3 px-7 mb-6 w-full text-base text-gray-600 font-medium text-center leading-6 bg-white border border-coolGray-100 hover:border-coolGray-200 rounded-md shadow-sm"
          >
            <img className="mr-2 h-5 w-5" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
            <span>Continue with Google</span>
          </button>
          <p className="text-center">
            <span className="text-xs font-medium">Already have an account?</span>
            <a className="inline-block text-xs font-medium text-green-500 hover:text-green-600 hover:underline ml-2" href="#">Sign In</a>
          </p>
        </div>
      </form>
    </SignupLayout>
  );
};

export default Signup;