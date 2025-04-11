import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  message: string;

  @Column({ nullable: true })
  imageURI: string;
}
