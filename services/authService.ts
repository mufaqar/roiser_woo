import { Customer, LoginResponse } from '@/types/woocommerce';
import api from '@/lib/woocommerce';

interface RegisterData {
  email: string;
  username: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

export const authService = {
  // Customer Registration
  async register(customerData: RegisterData): Promise<Customer> {
    try {
      const response = await api.post('customers', customerData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Customer Login
  async login(username: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/jwt-auth/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  },

  // Validate Token
  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/jwt-auth/v1/token/validate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  // Get current customer
  async getCurrentCustomer(token: string): Promise<Customer> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wc/v3/customers/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch customer data');
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  // Update customer profile
  async updateCustomer(customerId: number, customerData: Partial<Customer>, token: string): Promise<Customer> {
    try {
      const response = await api.put(`customers/${customerId}`, customerData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Update failed');
    }
  },
};