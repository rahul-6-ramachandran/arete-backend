import { PrismaService } from '../../prisma/prisma.service';

export class BaseService<T> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly model: any,
  ) {}

  async create(data: T) {
    return this.model.create({
      data,
    });
  }

  async findAll() {
    return this.model.findMany();
  }

  async findById(id: string) {
    return this.model.findUnique({
      where: { id },
    });
  }

  async update(id: string, data:Partial<T>){
    return this.model.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.model.delete({
      where: { id },
    });
  }
}