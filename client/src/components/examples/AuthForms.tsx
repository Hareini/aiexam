import AuthForms from '../AuthForms';

export default function AuthFormsExample() {
  //todo: remove mock functionality
  const handleLogin = (email: string, password: string) => {
    console.log('Login:', { email, password });
  };

  const handleSignup = (name: string, email: string, password: string) => {
    console.log('Signup:', { name, email, password });
  };

  const handleGoogleAuth = () => {
    console.log('Google auth triggered');
  };

  return (
    <div className="p-6 flex justify-center">
      <AuthForms
        onLogin={handleLogin}
        onSignup={handleSignup}
        onGoogleAuth={handleGoogleAuth}
        isLoading={false}
      />
    </div>
  );
}