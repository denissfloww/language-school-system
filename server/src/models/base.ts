import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export default abstract class Model extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
