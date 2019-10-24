import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Register {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Range: string;

    @Column()
    linha: string;

    @Column()
    Descricao: string;

    @Column()
    DataInicioPlan: string;

    @Column()
    DataFimPlan: string;

    @Column()
    DataInicioReal: string;

    @Column()
    DataFimReal: string;

    constructor() {
        
    }
}
