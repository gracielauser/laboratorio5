import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './productos.model';

@Injectable()
export class ProductosService {
    
    private products: Product[] = [
       
    ];
    constructor() {
 
        this.insertProduct('1','Mesas', 'Madera', 120);
        this.insertProduct('2','Sillas', 'Plastico', 100);
      }

  insertProduct(id: string, titulo: string, description: string, precio: number) {
    
    const newProduct = new Product(id, titulo, description, precio);
    this.products.push(newProduct);
    
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(productId: string): Product {
    const product = this.findProduct(productId)[0];
    return { ...product };
  }

  updateProduct(id: string, titulo: string, description: string, precio: number): void {
    const [product, index] = this.findProduct(id);
    const updatedProduct = { ...product };
    if (titulo) {
      updatedProduct.titulo = titulo;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (precio) {
      updatedProduct.precio = precio;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(id: string): void {
    const index = this.findProduct(id)[1];
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('No se pudo encontrar el producto.');
    }
    return [product, productIndex];
  }
       

}
