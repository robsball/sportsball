import React from 'react';

interface SignupLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

const SignupLayout: React.FC<SignupLayoutProps> = ({ header, children }) => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-coolGray-50">
      <div className="container px-4 py-8">
        <div className="max-w-sm mx-auto">
          <div className="mb-6 text-center">
            {header}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default SignupLayout; 