"use client"

import { useEffect } from "react";
import { useUser } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const { user, loading } = useUser();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !user) {
                router.push("/login"); // Redirect if not logged in
            }
        }, [user, loading, router]);

        if (loading) return <p>Loading...</p>;

        return user ? <WrappedComponent {...props} /> : null;
    };

    // **Set display name**
    AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return AuthComponent;
};

export default withAuth;
