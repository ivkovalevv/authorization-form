const mockAuthAPI = {
    login: async (credentials) => {
        await new Promise(res => setTimeout(res, 1_000));

        if(credentials.email !== import.meta.env.VITE_VALID_EMAIL || 
            credentials.password !== import.meta.env.VITE_VALID_PASSWORD){
            const error = new Error('Invalid credentials');
            error.status = 401;
            throw error;
        }

        return {
            success: true,
            message: 'Login successful',
            requires2FA: true,
            token: 'mock-jwt-token-123',
        }
    },
    verify2FA: async ({code, email}) => {
        await new Promise(res => setTimeout(res, 2_000));

        if(code !== import.meta.env.VITE_VALID_CODE){
            const error = new Error('Invalid verification code');
            error.status = 400;
            throw error;
        }

        return {
            success: true,
            message: '2FA verification successful',
            user: {
                id: 1,
                email: email,
                name: 'Examiner',
            },
            accessToken: 'mock-access-token-456',
            refreshToken: 'mock-refresh-token-789',
        }
    }
}

export default mockAuthAPI;