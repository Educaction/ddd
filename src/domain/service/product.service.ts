import Product from "../entity/product";

export default class ProductService {

    static increasePrice(products: Product[], percetange:number):Product[] {
        products.forEach(product => {
            product.changePrice((product.price * percetange) / 100 + product.price);
        });
        return products;
    }
}