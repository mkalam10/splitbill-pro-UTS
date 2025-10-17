
import { User } from '../types';

const API_URL = 'http://localhost:5000/api/auth'; // Ganti jika backend Anda di-deploy di tempat lain
const SESSION_KEY = 'splitbill_pro_session';

interface AuthResponse {
    success: boolean;
    token: string;
    user: User;
    message?: string;
}

const fakeNetworkDelay = () => new Promise(res => setTimeout(res, 500));


export const register = async (name: string, email: string, password: string): Promise<User> => {
    await fakeNetworkDelay();
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    const data: AuthResponse = await response.json();

    if (!data.success) {
        throw new Error(data.message || 'Registration failed');
    }
    
    localStorage.setItem(SESSION_KEY, JSON.stringify({ token: data.token, user: data.user }));
    return data.user;
};

export const login = async (email: string, password: string): Promise<User> => {
    await fakeNetworkDelay();
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    
    const data: AuthResponse = await response.json();

    if (!data.success) {
        throw new Error(data.message || 'Login failed');
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify({ token: data.token, user: data.user }));
    return data.user;
};

export const logout = (): void => {
    localStorage.removeItem(SESSION_KEY);
};

export const getCurrentUser = (): User | null => {
    try {
        const sessionJson = localStorage.getItem(SESSION_KEY);
        if (!sessionJson) return null;
        const session = JSON.parse(sessionJson);
        return session.user || null;
    } catch {
        return null;
    }
};

export const getToken = (): string | null => {
     try {
        const sessionJson = localStorage.getItem(SESSION_KEY);
        if (!sessionJson) return null;
        const session = JSON.parse(sessionJson);
        return session.token || null;
    } catch {
        return null;
    }
}
