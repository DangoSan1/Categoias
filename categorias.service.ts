import { Injectable, NotFoundException } from '@nestjs/common';
import { Categoria } from './categorias.entity';

@Injectable()
export class CategoriasService {
    private categorias: Categoria[] = [];
    private idCounter = 1;

    findAll(): Categoria[] {
        return this.categorias;
    }

    findOne(id: number): Categoria {
        const categoria = this.categorias.find(c => c.id === id);
        if (!categoria) {
            throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
        }
        return categoria;
    }


    create(categoriaData: Omit<Categoria, 'id'>): Categoria {
        const nuevaCategoria = {
            id: this.idCounter++,
            ...categoriaData,
            fecha_creacion: new Date(categoriaData.fecha_creacion)
        };
        this.categorias.push(nuevaCategoria);
        return nuevaCategoria;
    }

    update(id: number, categoriaData: Partial<Categoria>): Categoria {
        const categoria = this.findOne(id);
        
        if (categoriaData.nombre) categoria.nombre = categoriaData.nombre;
        if (categoriaData.descripcion) categoria.descripcion = categoriaData.descripcion;
        if (categoriaData.fecha_creacion) categoria.fecha_creacion = new Date(categoriaData.fecha_creacion);
        
        return categoria;
    }

    delete(id: number): void {
        const index = this.categorias.findIndex(c => c.id === id);
        if (index === -1) {
            throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
        }
        this.categorias.splice(index, 1);
    }
}