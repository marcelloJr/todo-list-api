import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { genSalt, hash } from 'bcrypt';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @CreateDateColumn({
    name: 'CREATED_AT',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'UPDATED_AT',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'FULLNAME', type: 'varchar', nullable: false })
  fullName: string;

  @Column({ name: 'EMAIL', type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ name: 'PASSWORD', type: 'varchar', nullable: false })
  password: string;

  @BeforeInsert()
  async encryptPassword() {
    const salt = await genSalt(8);
    this.password = await hash(this.password, salt);
  }
}
