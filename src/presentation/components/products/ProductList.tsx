import React from 'react'
import { Product } from '../../../domain/entities/product'
import { List, Text } from '@ui-kitten/components';

//interface propiedades lista productos
interface Props {
    products: Product[];
    //TODO: Fetch nextPage
}

export const ProductList = ({ products }: Props) => {
    return (
        <List
            data={products}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
                <Text key={item.id}>{item.title}</Text>
            )} />
    )
}
