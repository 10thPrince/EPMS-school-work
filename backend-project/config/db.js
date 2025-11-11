import mysql from 'mysql2';
import colors from '@colors/colors';
import dotenv from 'dotenv';

dotenv.config();

let db;

export const connectDB = () => {


    db =  mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    db.connect((err) => {
        if (err) {
            console.log(colors.red('❌ Database connection Failed'));
            console.log(err)
            process.exit(1);
        } else {
            console.log(colors.green('✅ Database connection Successful!'));
        }
    });

}

export const getDB = () => db;