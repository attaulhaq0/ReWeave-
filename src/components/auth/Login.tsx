import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Recycle, UploadCloud } from 'lucide-react';

export function Login() {
  const { login, register } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('sadia@recycler.com');
  
  // Registration state
  const [role, setRole] = useState<'BUYER' | 'SUPPLIER'>('BUYER');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [step, setStep] = useState(1); // 1: Basic Info, 2: KYB/Preferences

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      register({
        email: regEmail,
        role,
        fullName,
        companyName,
        kybStatus: role === 'SUPPLIER' ? 'PENDING' : undefined
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-sm">
            <Recycle className="w-8 h-8" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to ReWeave' : 'Create an account'}
        </h2>
        {isLogin && (
          <p className="mt-2 text-center text-sm text-gray-600">
            Demo accounts: <br/>
            <span className="font-mono bg-gray-100 px-1">sadia@recycler.com</span> (Buyer)<br/>
            <span className="font-mono bg-gray-100 px-1">farhan@factory.com</span> (Supplier)<br/>
            <span className="font-mono bg-gray-100 px-1">admin@reweave.ai</span> (Admin)
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent className="py-8 px-4 sm:px-10">
            {isLogin ? (
              <form className="space-y-6" onSubmit={handleLoginSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Button type="submit" className="w-full">
                    Sign in
                  </Button>
                </div>
                
                <div className="text-center mt-4">
                  <button type="button" onClick={() => setIsLogin(false)} className="text-sm text-brand-primary hover:underline">
                    Don't have an account? Register
                  </button>
                </div>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleRegisterSubmit}>
                {step === 1 ? (
                  <>
                    <div className="flex gap-4 mb-6">
                      <button
                        type="button"
                        className={`flex-1 py-2 px-4 rounded-lg border ${role === 'BUYER' ? 'border-brand-primary bg-brand-primary/5 text-brand-primary font-medium' : 'border-gray-200 text-gray-500'}`}
                        onClick={() => setRole('BUYER')}
                      >
                        I'm a Buyer
                      </button>
                      <button
                        type="button"
                        className={`flex-1 py-2 px-4 rounded-lg border ${role === 'SUPPLIER' ? 'border-brand-primary bg-brand-primary/5 text-brand-primary font-medium' : 'border-gray-200 text-gray-500'}`}
                        onClick={() => setRole('SUPPLIER')}
                      >
                        I'm a Supplier
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <Input required value={fullName} onChange={e => setFullName(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company Name</label>
                      <Input required value={companyName} onChange={e => setCompanyName(e.target.value)} className="mt-1" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email address</label>
                      <Input required type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} className="mt-1" />
                    </div>

                    <Button type="submit" className="w-full">Next Step</Button>
                  </>
                ) : (
                  <>
                    {role === 'SUPPLIER' ? (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">KYB Verification</h3>
                        <p className="text-sm text-gray-500">Please upload your NTN certificate and Business Registration documents.</p>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <UploadCloud className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">Click to upload documents</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Material Preferences</h3>
                        <p className="text-sm text-gray-500">What types of waste are you looking to buy?</p>
                        <div className="flex flex-wrap gap-2">
                          {['Cotton', 'Polyester', 'Denim', 'Blends'].map(mat => (
                            <Badge key={mat} variant="outline" className="cursor-pointer hover:bg-gray-50">{mat}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
                      <Button type="submit" className="flex-1">Complete Registration</Button>
                    </div>
                  </>
                )}
                
                {step === 1 && (
                  <div className="text-center mt-4">
                    <button type="button" onClick={() => setIsLogin(true)} className="text-sm text-brand-primary hover:underline">
                      Already have an account? Sign in
                    </button>
                  </div>
                )}
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
