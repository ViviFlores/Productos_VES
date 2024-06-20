import React, { useRef } from 'react'
import { Text, View } from 'react-native'
import { MainLayout } from '../../layouts/MainLayout'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../navigation/StackNavigator'
import { useQuery } from '@tanstack/react-query'
import { getProductById } from '../../../actions/products/get-product-by-id'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, ButtonGroup, Input, Layout, List, useTheme } from '@ui-kitten/components'
import { FadeInImage } from '../../components/ui/FadeInImage'
import { styles } from '../../theme/styles'
import { Gender, Size } from '../../../domain/entities/product'

//Interface de navegación
interface Props extends StackScreenProps<RootStackParamList, 'ProductScreen'> { };

//Arreglos sizes - genders
const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

export const ProductScreen = ({ route }: Props) => {
  //Capturar parametro por navegación
  //const { productId } = route.params;
  const productIdRef = useRef(route.params.productId);

  //Tomar tema del aplicativo
  const theme = useTheme();

  //useQuery
  const { data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current)
  })

  return (
    <MainLayout
      title={product?.title!}
      subtitle={`Precio: $ ${product?.price}`}>
      <ScrollView style={{ flex: 1 }}>

        <Layout>
          <List
            data={product?.images}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <FadeInImage uri={item}
                style={styles.detailImage} />
            )}
          />
        </Layout>

        <Layout style={{ marginHorizontal: 10 }}>
          <Input
            label="Título"
            value={product?.title}
            style={{ marginVertical: 5 }} />
          <Input
            label="Slug"
            value={product?.slug}
            style={{ marginVertical: 5 }} />
          <Input
            label="Descripción"
            value={product?.description}
            multiline
            numberOfLines={5}
            style={{ marginVertical: 5 }} />
        </Layout>

        <Layout style={styles.detailInputs}>
          <Input
            label="Precio"
            value={product?.price.toString()}
            style={{ flex: 1 }} />
          <Input
            label="Inventario"
            value={product?.stock.toString()}
            style={{ flex: 1 }} />
        </Layout>

        <Layout>
          <ButtonGroup
            size='small'
            appearance='outline'
            style={styles.buttonGroup}>
            {
              sizes.map((size) => (
                <Button
                  key={size}
                  style={{
                    flex: 1,
                    backgroundColor: true ? theme['color-primary-200'] : undefined
                  }}>
                  {size}
                </Button>
              ))
            }
          </ButtonGroup>
          <ButtonGroup
            size='small'
            appearance='outline'
            style={styles.buttonGroup}>
            {
              genders.map((gender) => (
                <Button
                  key={gender}
                  style={{
                    flex: 1,
                    backgroundColor: true ? theme['color-primary-200'] : undefined
                  }}>
                  {gender}
                </Button>
              ))
            }
          </ButtonGroup>
        </Layout>

        <Layout style={{ height: 150 }} />

      </ScrollView>
    </MainLayout>
  )
}
