const AuthLoadingScreen = ({ message }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="size-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">
            {message || "Checking your session..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLoadingScreen;
