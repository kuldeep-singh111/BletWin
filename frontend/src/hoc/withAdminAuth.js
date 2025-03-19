'use client'
import { useUser } from "../context/AuthContext";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAdminAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const { user, loading } = useUser();
        const router = useRouter();

        useEffect(() => {
            if (!loading && (!user || user.role !== 'admin')) {
                router.push('/unauthorized'); // Redirect non-admins
            }
        }, [user, loading, router]);

        if (loading || !user) {
            return <p>Loading...</p>;
        }

        return <WrappedComponent {...props} />;
    };

    // *Set display name*
    AuthComponent.displayName = `withAdminAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return AuthComponent;
};

export default withAdminAuth;