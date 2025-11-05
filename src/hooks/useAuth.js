import { useMutation } from '@tanstack/react-query';
import mockAuthApi from '../api/authAPI';

export const useLogin = () => {
    return useMutation({
        mutationFn: (credentials) => mockAuthApi.login(credentials),
        onError: (error) => {
            console.error('Login error: ', error);
        }
    })
}

export const useVerify2FA = () => {
    return useMutation({
        mutationFn: (code, email) => mockAuthApi.verify2FA(code, email),
        onError: (error) => {
            console.error('2FA verification error: ', error)
        }
    })
} 