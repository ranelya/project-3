import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from '../../store/Slices/userSlice';

export function useAuth() {
    const { email, token, id } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken && !token) {
            dispatch(setUser({ token: storedToken }));
        }
    }, [token, dispatch]);

    return {
        isAuth: email,
        email,
        token,
        id
    };
}
