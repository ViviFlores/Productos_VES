import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authCheckStatus, authLogin } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";

// interface - estado global de autenticación
export interface AuthState {
    status: AuthStatus;
    user?: User;
    token?: string;
    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
}

// Definimos cambio y obtención del estado global
export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    user: undefined,
    token: undefined,
    login: async (email: string, password: string) => {
        const resp = await authLogin(email, password);
        if (!resp) { //No hay respuesta de login
            set({ status: 'unauthenticated', token: undefined, user: undefined })
            return false;
        }
        //TODO: Save token in storage
        //console.log(resp);
        await StorageAdapter.setItem('token', resp.token);

        //Prueba token storage
        //const storageToken= await StorageAdapter.getItem('token');
        //console.log(storageToken);

        //Si hay respuesta login
        set({ status: 'authenticated', token: resp.token, user: resp.user })
        return true;
    },
    checkStatus: async () => {
        const resp = await authCheckStatus();
        if (!resp) { //No hay respuesta de login
            set({ status: 'unauthenticated', token: undefined, user: undefined })
            return;
        }

        //Guardar nuevo token en storage
        await StorageAdapter.setItem('token', resp.token);
        set({ status: 'authenticated', token: resp.token, user: resp.user })
    },
    logout: async () => {
        await StorageAdapter.removeItem('token');
        set({ status: 'unauthenticated', token: undefined, user: undefined })
    }

}));