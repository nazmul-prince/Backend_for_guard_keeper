import React, { useReducer } from 'react'; 
import uuid from 'uuid'; 
import axios from 'axios'; 
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    CLEAR_ERRORS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    AUTH_ERROR
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
    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('api/auth');

            dispatch({
                type: USER_LOADED, 
                payload: res.data
            });
        } catch (error) {
            dispatch({ type: AUTH_ERROR});
        }
    };

    // Register user
    const register = async formData => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        try {
            console.log("formdata: " + JSON.stringify(formData));
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (error) {
            
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            });
        }
    }

    // Login user
    const login =async formData => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };

        try {
            console.log("formdata: " + JSON.stringify(formData));
            const res = await axios.post('/api/auth', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            loadUser();
        } catch (error) {
            
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg
            });
        }
    };

    // Logout
    const logout = () => dispatch({ type: LOGOUT });

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
                logout,
                clearErrors
            }}
        >
            { props.children }
        </AuthContext.Provider>
    );
};

export default AuthState;