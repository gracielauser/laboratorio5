// src/products/products.controller.ts
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';

@Controller('products')
export class ProductosController {
  constructor(private readonly productsService: ProductosService) {}

  @Post()
  addProduct(
    @Body('id') prodId: string,
    @Body('titulo') prodTitle: string,
    @Body('descripcion') prodDesc: string,
    @Body('precio') prodPrecio: number,
  ): any {

    return this.productsService.insertProduct(prodId, prodTitle, prodDesc, prodPrecio);
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('titulo') prodTitle: string,
    @Body('descripcion') prodDesc: string,
    @Body('precio') prodPrecio: number,
  ) {
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrecio);
    return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.productsService.deleteProduct(prodId);
    return null;
  }
}

