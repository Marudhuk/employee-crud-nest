import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Department{

    @PrimaryGeneratedColumn()
    id:number ;

    @Column()
    name:string ;

    @Column({ default: true })
    isActive: boolean

    @CreateDateColumn()
    createdAt:Date;

    @Column({nullable: false})
    createdBy:number ;

    @UpdateDateColumn()
    updatedAt:Date;

    @Column({nullable: true})
    updatedBy:number ;

    @DeleteDateColumn()
    deletedAt:Date ;

    @Column({nullable: true})
    deletedBy:number ;
    


} 