import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";
import { ProductResponse } from "../../infrastructure/interfaces/products.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mappers";

//acciones http
//acción para recuperar un producto por id
export const getProductById = async (id: string): Promise<Product> => {
    try {
        const { data } = await tesloApi.get<ProductResponse>(`/products/${id}`);
        const product = ProductMapper.productToEntity(data);
        return product;
    } catch (ex) {
        console.log(ex);
        throw new Error('Error getting product by id');

    }

}