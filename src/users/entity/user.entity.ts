import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('app_users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lasName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  // Authiorization
  @Column()
  roles: string;
}
