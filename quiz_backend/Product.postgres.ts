import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 타입스크립트의 타입
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  _id!: string;

  @Column({ type: "text" })
  seller!: string;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "text" })
  detail!: string;

  @Column({ type: "text" })
  price!: number;

  @Column({ type: "timestamp", nullable: true })
  deletedAt!: Date;

  // @Column({ type: "timestamp", defult: new Date(), nullable: true })
  // deletedAt!: Date;
}
