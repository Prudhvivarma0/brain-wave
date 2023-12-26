const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div
        className="h-full flex items-center justify-center"
        style={{ backgroundColor: '#A020F0' }}
      >
        {children}
      </div>
    );
  };
  
  export default AuthLayout;