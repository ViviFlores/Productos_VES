import { Button, Icon, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { useAuthStore } from '../../store/auth/useAuthStore'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { MainLayout } from '../../layouts/MainLayout'
import { LoadingScreen } from '../loading/LoadingScreen'
import { ProductList } from '../../components/products/ProductList'
import { getProductByPage } from '../../../actions/products/get-product-by-page'

export const HomeScreen = () => {
    //Llamar accion http de lista de productos
    //TanStack Query
    /*const { isLoading, data: products = [] } = useQuery({
        queryKey: ['products', 'infinito'],
        staleTime: 1000 * 60 * 60,
        queryFn: () => getProductByPage(0)
    })*/

    //pages=[[page1=20], [page2=20]]
    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['products', 'infinito'],
        staleTime: 1000 * 60 * 60,
        initialPageParam: 0,
        queryFn: async (params) => {
            console.log(params);
            return await getProductByPage(params.pageParam);
        },
        getNextPageParam: (lastPage, allPages) => allPages.length,
    })

    //Acceder a las propiedades del Store
    const { logout } = useAuthStore();
    return (
        <MainLayout
            title='TesloShop - Products'
            subtitle='Aplicación administrativa'>
            {isLoading
                ? <LoadingScreen />
                : <ProductList
                    products={data?.pages.flat() ?? []}
                    fetchNextPage={fetchNextPage} />
            }
        </MainLayout>
    )

}
