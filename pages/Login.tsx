import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const signUp = useAuthStore((s) => s.signUp);
  const signIn = useAuthStore((s) => s.signIn);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/assessment', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (isSignUp) {
      if (!name.trim()) {
        setError('Name is required.');
        setLoading(false);
        return;
      }
      const { error: err } = await signUp(email, password, name.trim());
      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
    } else {
      const { error: err } = await signIn(email, password);
      if (err) {
        setError(err.message);
        setLoading(false);
        return;
      }
    }
    setLoading(false);
    navigate('/assessment', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pt-24">
      <div className="w-full max-w-md">
        <div className="bg-surface rounded-3xl border border-borderSubtle shadow-soft-card p-8">
          <h1 className="text-2xl font-bold text-primary mb-2">
            {isSignUp ? 'Create account' : 'Log in'}
          </h1>
          <p className="text-secondary text-sm mb-6">
            {isSignUp ? 'Enter your details to get started.' : 'Enter your email and password.'}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-primary mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-borderSubtle bg-background text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-borderSubtle bg-background text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl border border-borderSubtle bg-background text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="••••••••"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
              />
              {isSignUp && (
                <p className="text-xs text-secondary mt-1">At least 6 characters</p>
              )}
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-accent text-white font-bold hover:opacity-95 disabled:opacity-70 transition-opacity"
            >
              {loading ? 'Please wait…' : isSignUp ? 'Create account' : 'Log in'}
            </button>
          </form>
          <p className="text-center text-secondary text-sm mt-6">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              className="text-accent font-medium hover:underline"
            >
              {isSignUp ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>
        <p className="text-center text-secondary text-xs mt-6">
          Your data is encrypted and secure.
        </p>
      </div>
    </div>
  );
}
