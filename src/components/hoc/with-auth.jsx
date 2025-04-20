import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "../common/loader";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/auth/log-in");
      } else {
        setIsAuthenticated(true);
      }

      setLoading(false);
    }, [router]);

    if (loading) {
      return (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
