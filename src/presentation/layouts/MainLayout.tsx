import { useNavigation } from '@react-navigation/native';
import { Divider, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MyIcon } from '../components/ui/MyIcon';

//interface - propiedades layout
interface Props {
    title: string;
    subtitle: string;
    rightAction?: () => void;
    rightActionIcon?: string;

    //componente hijo
    children: React.ReactNode;  //JSX ELEMENTO REACT
}

export const MainLayout = ({ title, subtitle, rightAction, rightActionIcon, children }: Props) => {
    //Tomar el safe área de la parte superior
    const { top } = useSafeAreaInsets();

    //hook navegación
    const { canGoBack, goBack } = useNavigation();

    //Función para la acción de navegación a la izquierda
    const renderBackAction = () => (
        <TopNavigationAction
            icon={<MyIcon name='arrow-back-outline' />}
            onPress={goBack} />
    );

    //Función para acciones a la derecha
    const RenderRightAction = () => {
        if (rightAction === undefined || rightActionIcon === undefined) return null;
        return (
            <TopNavigationAction
                onPress={rightAction}
                icon={<MyIcon name={rightActionIcon} />} />
        )
    }

    return (
        <Layout style={{ paddingTop: top }}>
            <TopNavigation
                title={title}
                subtitle={subtitle}
                alignment='center'
                accessoryLeft={canGoBack() ? renderBackAction : undefined}
                accessoryRight={() => <RenderRightAction />} />
            <Divider />
            <Layout style={{ height: '100%' }}>
                {children}
            </Layout>
        </Layout>
    )
}
