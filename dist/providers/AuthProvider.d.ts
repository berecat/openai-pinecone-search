import "firebase/auth";
import { RAFirebaseOptions } from "./RAFirebaseOptions";
export declare function AuthProvider(firebaseConfig: {}, options: RAFirebaseOptions): {
    login: (params: any) => Promise<unknown>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<unknown>;
    checkError: (error: any) => Promise<never>;
    getPermissions: () => Promise<any>;
};
