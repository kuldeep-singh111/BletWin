import { useEffect } from "react";
import { useUser } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const redirectIfAuth = (WrappedComponent) => {
    const RedirectComponent = (props) => {
        const { user, loading } = useUser();
        const router = useRouter();

        useEffect(() => {
            if (!loading && user) {
                router.push("/profile"); // Redirect logged-in users
            }
        }, [user, loading, router]);

        if (loading) return <p>Loading...</p>;

        return !user ? <WrappedComponent {...props} /> : null;
    };

    // **Set display name**
    RedirectComponent.displayName = `redirectIfAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return RedirectComponent;
};

export default redirectIfAuth;
