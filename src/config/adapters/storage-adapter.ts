//Definir adaptadores storage

import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageAdapter {

    //Métodos pára trabajar con el storage
    static async getItem(key: string): Promise<string | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (ex) {
            console.log(ex);
            return null;
        }

    }

    static async setItem(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (ex) {
            console.log(ex);
            //Disparar la excepción
            throw new Error(`Error setting item ${key} - ${value}`)

        }
    }

    static async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (ex) {
            console.log(ex);
            //Disparar la excepción
            throw new Error(`Error remove item ${key}`)

        }
    }


}