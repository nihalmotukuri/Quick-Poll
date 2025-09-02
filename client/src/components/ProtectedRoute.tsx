import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Ring } from 'ldrs/react';
import 'ldrs/react/Ring.css';

const ProtectedRoute = () => {
    const { userData, userLoading } = useSelector((store) => store.user);
    const location = useLocation()

    if (userLoading) {
        return (
            <div className='h-screen w-screen bg-neutral-900 flex justify-center items-center backdrop-blur-sm'>
                <Ring
                    size="50"
                    stroke="6"
                    bgOpacity="0"
                    speed="2"
                    color="#eaaa4aff"
                />
            </div>
        );
    }

    if (location.pathname === '/') return <Navigate to='/' replace />
    
    return userData ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
