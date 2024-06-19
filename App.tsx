import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { StackNavigator } from './src/presentation/navigation/StackNavigator';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthProvider } from './src/presentation/providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


// Create a client
const queryClient = new QueryClient();

const App = () => {

  // hook permite tomar el tema del dospositivo
  const colorScheme = useColorScheme();
  //Definimos el estilo de acuerdo al tema del dipositivo
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;

  return (
    <QueryClientProvider client={queryClient} >
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme} >
        <NavigationContainer>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider >
  )
}

export default App;

