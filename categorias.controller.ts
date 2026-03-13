import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { Categoria } from './categorias.entity';

@Controller('categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) {}

    @Get()
    findAll(): Categoria[] {
        return this.categoriasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Categoria {
        return this.categoriasService.findOne(id);
    }

    @Post()
    create(@Body() categoriaData: Omit<Categoria, 'id'>): Categoria {
        return this.categoriasService.create(categoriaData);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() categoriaData: Partial<Categoria>
    ): Categoria {
        return this.categoriasService.update(id, categoriaData);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): void {
        return this.categoriasService.delete(id);
    }
}