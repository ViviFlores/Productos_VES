import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Alert, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { styles } from '../../theme/styles'
import { MyIcon } from '../../components/ui/MyIcon'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/StackNavigator'
import { API_URL, API_URL_ANDROID, STAGE } from '@env'
import { useAuthStore } from '../../store/auth/useAuthStore'


//interface de props de navegación
interface Props extends StackScreenProps<RootStackParamList, 'LoginScreen'> { };

//interface formulario login
interface FormLogin {
    email: string;
    password: string;
}

export const LoginScreen = ({ navigation }: Props) => {
    //Llamar método del Store
    const { login } = useAuthStore();

    //hook dimensión: tomar automaticamente la dimension de mi dispositivo
    const { height } = useWindowDimensions();

    //hook useState: manipular el formulario de login
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email: '',
        password: ''
    });

    //hook useState: verificar si se hizo un posting
    const [isPosting, setIsPosting] = useState<boolean>(false);
    //Función cambiar los valores del formulario
    const handleSetValues = (key: string, value: string) => {
        setFormLogin({ ...formLogin, [key]: value })
    }

    //Función para la acción de iniciar sessión
    const handleOnLogin = async () => {
        //console.log(formLogin);
        setIsPosting(true);
        if (!formLogin.email || !formLogin.password) {
            return;
        }

        //Emplear el método login para iniciar sesión
        const wasSuccessful = await login(formLogin.email, formLogin.password);
        setIsPosting(false);
        //Inicio de sesión exitoso
        if (wasSuccessful) return;
        //No se inició sesión
        Alert.alert("Error", "Usuario o contraseña incorrecta"!)
    }

    //Prueba de las variables de entorno
    //console.log({apiUrl: API_URL_ANDROID, stage: STAGE});

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView style={{ marginHorizontal: 40 }}>

                <Layout style={{ paddingTop: height * 0.35 }}>
                    <Text category='h1'>Ingresar</Text>
                    <Text category='p2'>Por favor, ingresa para continuar</Text>
                </Layout>

                <Layout style={{ marginTop: 20 }}>
                    <Input
                        placeholder='Correo electrónico'
                        accessoryLeft={<MyIcon name='email-outline' />}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        value={formLogin.email}
                        onChangeText={(value) => handleSetValues('email', value)}
                        style={{ marginBottom: 10 }}
                    />
                    <Input
                        placeholder='Contraseña'
                        accessoryLeft={<MyIcon name='lock-outline' />}
                        autoCapitalize='none'
                        secureTextEntry
                        value={formLogin.password}
                        onChangeText={(value) => handleSetValues('password', value)}
                        style={{ marginBottom: 10 }}
                    />
                </Layout>

                <Layout style={{ marginTop: 10 }}>
                    <Button
                        disabled={isPosting}
                        accessoryRight={<MyIcon name='arrow-forward-outline' isWhite={true} />}
                        onPress={handleOnLogin}>Ingresar</Button>
                </Layout>

                <Layout style={styles.textRedirect}>
                    <Text>¿No tienes cuenta?</Text>
                    <Text
                        status='primary'
                        category='s1'
                        onPress={() => navigation.navigate('RegisterScreen')}> Crea una </Text>
                </Layout>

            </ScrollView>
        </Layout>

    )
}
