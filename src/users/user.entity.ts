import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import Address from './address.entity';
import Post from 'src/posts/post.entity';
import PublicFile from 'src/files/publicFile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  @Expose()
  email: string;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  posts: Post[];

  @JoinColumn()
  @OneToOne(() => PublicFile, {
    eager: true,
    nullable: true,
  })
  avatar?: PublicFile;
}
