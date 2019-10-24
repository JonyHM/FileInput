import 'reflect-metadata';
import {createConnection} from 'typeorm';
import * as Papa from 'papaparse';
import * as fs from 'fs';
// var fs = require('fs');

import { Register } from './entity/Register';

const parse = (file) => {

    Papa.parse(file, {
        complete: results => {
            let int = 0;

            let list: Array<Register> = [];

            results.data.some(reg => {

                let register = new Register();

                register.Range = reg[0];
                register.linha = reg[1];
                register.Descricao = reg[2];
                register.DataInicioPlan = reg[3];
                register.DataFimPlan = reg[4];
                register.DataInicioReal = reg[5];
                register.DataFimReal = reg[6];

                if(int > 0) {
                    list.push(register);
                }

                int++;
            });

            store(list)
        }
    });
}

const store = (register: Array<Register>) => {

    createConnection({
        "type": "sqlite",
        "database": "database.sqlite",
        "migrationsRun": true,
        "synchronize": true,
        "logging": false,
        "entities": [
            "src/entity/**/*.ts"
        ],
        "migrations": [
            "src/migration/**/*.ts"
        ],
        "subscribers": [
            "src/subscriber/**/*.ts"
        ]
    }).then(async connection => {

        const registerRepository = connection.getRepository(Register);
        await register.forEach( reg =>
            registerRepository.save(reg)
        );

        console.log('Registers has been saved');
    }).catch(error => console.log(error));
}



try {
    var data = fs.readFileSync('./datas.csv', 'utf8');
    parse(data);    
} catch(e) {
    console.log('Error:', e.stack);
}