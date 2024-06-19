import { Button, Icon, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { getProductByPage } from '../../../actions/get-product-by-page'
import { useQuery } from '@tanstack/react-query'
import { MainLayout } from '../../layouts/MainLayout'
import { LoadingScreen } from '../loading/LoadingScreen'
import { ProductList } from '../../components/products/ProductList'

export const HomeScreen = () => {
    //Llamar accion http de lista de productos
    const { isLoading, data: products = [] } = useQuery({
        queryKey: ['products', 'infinito'],
        staleTime: 1000 * 60 * 60,
        queryFn: () => getProductByPage(0)
    })

    //Acceder a las propiedades del Store
    const { logout } = useAuthStore();
    return (
        <MainLayout
            title='TesloShop - Products'
            subtitle='Aplicación administrativa'>
                {isLoading
                ? <LoadingScreen/>
                : <ProductList products={products}/>
                }
            
        </MainLayout>
    )

}
