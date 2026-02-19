import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
