import { tesloApi } from "../config/api/tesloApi";
import { Product } from "../domain/entities/product";
import { ProductResponse } from "../infrastructure/interfaces/products.response";
import { ProductMapper } from "../infrastructure/mappers/product.mappers";

//acciones http
//acción lista de productos
export const getProductByPage = async (page: number, limit: number = 20): Promise<Product[]> => {
    console.log(page, limit);

    try {
        const { data } = await tesloApi.get<ProductResponse[]>(`/products?offset=${page * 10}&limit=${limit}`);
        const products = data.map(product => ProductMapper.productToEntity(product));
        //console.log(products);
        return products;
    } catch (ex) {
        console.log(ex);
        throw new Error('Error getting products');
    }


} 