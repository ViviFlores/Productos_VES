import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout, Text } from '@ui-kitten/components'
import React, { PropsWithChildren, useEffect } from 'react'
import { RootStackParamList } from '../navigation/StackNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {
    //Llamar elementos del Store
    const { checkStatus, status } = useAuthStore();

    //hook navegación
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    //hook useEffect
    useEffect(() => {
        //Verificando el estado
        checkStatus();
    }, []);

    useEffect(() => {
        //Verificar el status
        if (status != 'checking') {
            if (status === 'authenticated') {
                //Redirección home
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }]
                })
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }]
                })
            }
        }

    }, [status]);

    return (
        <>{children}</>
    )
}
