import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { PUBLIC_ROUTES } from '@/routes';
import { LanguageSwitcher } from '@/components/Layout/LanguageSwitcher';

export const ForgotPassword: React.FC = () => {
  const { loading, errors, forgotPassword } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    const success = await forgotPassword(email);
    if(success) {
      setSuccessMessage(t('auth.forgotPasswordSuccess') || 'If the email exists, a reset link has been sent.');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-enterprise-gray-50 to-enterprise-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-enterprise-gray-900 mb-2">
            {t('gen.mainHeading')}
          </h1>
          <p className="text-enterprise-gray-600">
            {t('auth.heading')}
          </p>
        </div>
        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-semibold">
                {t('auth.forgotPasswordHeading')}
              </CardTitle>
              <LanguageSwitcher />
            </div>
            {successMessage && (
              <Alert variant="success" className="mt-2">
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  placeholder={'john@example.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <Alert variant="destructive" className='py-1 px-2'>
                  <AlertDescription>{errors.email.join(', ')}</AlertDescription>
                </Alert>
              )}
              <Button 
                type="submit" 
                className="w-full bg-enterprise-primary hover:bg-enterprise-primary-dark"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('auth.signingIn')}
                  </>
                ) : (
                  t('auth.loginButton')
                )}
              </Button>
              <NavLink to={PUBLIC_ROUTES.LOGIN} className="text-sm text-enterprise-primary hover:underline mt-2 block text-center">
                {t('auth.backToLogin')}
              </NavLink>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};