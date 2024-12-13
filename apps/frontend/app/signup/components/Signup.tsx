import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import CountryPicker from '@/components/ui/countrypicker';

interface SignupLanding {
  onNext: () => void;
}

const Signup: React.FC<SignupLanding> = ({ onNext }) => {
  return (
    <section className="relative pt-16 md:py-32 bg-coolGray-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-sm mx-auto">
          <div className="mb-6 text-center">
            <h1 className="title-font mb-4 md:text-6xl font-bold">SPORTSBALL</h1>
            <p className="body-font text-lg font-bold">Get ready for kickoff!</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-6">
              <label className="block mb-2 text-coolGray-800 font-medium" htmlFor="name">Name*</label>
              <Input placeholder="Your name" />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-coolGray-800 font-medium" htmlFor="email">Email*</label>
              <Input placeholder="you@example.com" type="email" />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-coolGray-800 font-medium" htmlFor="phone">Phone*</label>
              <CountryPicker />
            </div>
            <div className="flex items-center mb-4">
              <Checkbox className="data-[state=checked]:bg-green-900 border-gray-300"/>
              <label htmlFor="Checkbox" className="ml-2 text-sm font-medium text-gray-900">Remember me</label>
            </div>  
            <Button onClick={onNext} className="w-full py-6 mb-5" >Sign Up</Button>
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
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;