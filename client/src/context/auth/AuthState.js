import React, { useReducer } from 'react'; 
import uuid from 'uuid'; 
import axios from 'axios'; 
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    AUTH_ERROR,
    CLEAR_CONTACTS,
    CLEAR_ERRORS,
    CONTACT_ERROR,
    GET_CONTACTS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REMOVE_ALERT,
    SET_ALERT,
    USER_LOADED
} from '../types';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load user
    const loadUser = () => console.log('Load user');

    // Register user
    const register = async formData => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        } catch (error) {
            
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            });
        }
    }

    // Login user
    const login = () => console.log('Logged in');

    // Logout
    const logoout = () => console.log('Log out');

    // Clear user
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS});

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                user: state.user,
                register,
                loadUser,
                login,
                logoout,
                clearErrors
            }}
        >
            { props.children }
        </AuthContext.Provider>
    );
};

export default AuthState;