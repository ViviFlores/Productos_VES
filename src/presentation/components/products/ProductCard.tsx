import React from 'react'
import { Product } from '../../../domain/entities/product'
import { Card, Text } from '@ui-kitten/components';
import { Image } from 'react-native';
import { styles } from '../../theme/styles';
import { FadeInImage } from '../ui/FadeInImage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/StackNavigator';

//interface Props
interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    //hook navegación
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <Card style={styles.card}
            onPress={() => navigation.navigate('ProductScreen', { productId: product.id })}>
            {
                (product.images.length === 0)
                    ? (
                        <Image
                            source={require('../../../assets/no-product-image.png')}
                            style={styles.noImage} />
                    )
                    : (
                        <FadeInImage
                            uri={product.images[0]}
                            style={styles.image} />

                    )
            }
            <Text
                numberOfLines={2}
                style={{ textAlign: 'center' }}>
                {product.title}
            </Text>

        </Card>
    )
}
