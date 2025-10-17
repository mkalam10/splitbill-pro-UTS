
import { Bill } from '../types';
import { getToken } from './authService';

const API_URL = 'http://localhost:5000/api/bills';

export const getBills = async (): Promise<Bill[]> => {
    const token = getToken();
    if (!token) return [];

    try {
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (data.success) {
            return data.data as Bill[];
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch bills from server", error);
        return [];
    }
};

export const saveBill = async (bill: Bill): Promise<Bill> => {
    const token = getToken();
    if (!token) throw new Error("Not authenticated");

    // Backend uses '_id', frontend uses 'id'. If 'id' exists and looks like a mongo id, it's an update.
    const isUpdate = bill.id && bill.id.length === 24; 
    const url = isUpdate ? `${API_URL}/${bill.id}` : API_URL;
    const method = isUpdate ? 'PUT' : 'POST';
    
    // Create a clean payload without frontend-only properties if any
    const billPayload = { ...bill };
    // The backend will generate the ID on creation
    if (!isUpdate) {
        delete (billPayload as any).id;
    }


    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(billPayload)
        });

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message || 'Failed to save bill');
        }
        return data.data as Bill;
    } catch (error) {
        console.error("Failed to save bill to server", error);
        throw error;
    }
};
