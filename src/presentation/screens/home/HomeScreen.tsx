import { Button, Icon, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { useAuthStore } from '../../store/auth/useAuthStore'

export const HomeScreen = () => {
    //Acceder a las propiedades del Store
    const { logout } = useAuthStore();
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home</Text>
            <Button
                accessoryLeft={<Icon name='log-out-outline' />}
                onPress={logout}>Cerrar Sesión</Button>
        </Layout>
    )
}
