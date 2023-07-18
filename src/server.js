import express from 'express';
const app = express();

import pgPromise from 'pg-promise';
const pgp = pgPromise();
const connectionString = 'postgres://user:postgres@db:5432/postgres';
const db = pgp(connectionString);

app.use(express.json());

app.post('/users', async (req, res) => {
    try {
        const body = req.body;
        console.log(req.body)
        const query = 'INSERT INTO users(id, name) VALUES ($1, $2)';
        const data = await db.none(query, [body.id, body.name]);
       
       res.send('successfully inserted')
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data');
    }

});

app.listen(3000, () => {
    console.log(`listening on port 3000`)
})




// import express from 'express';
// const app = express();

// import pgPromise from 'pg-promise';
// const pgp = pgPromise();
// const connectionString = 'postgres://user:postgres@db:5432/postgres';
// const db = pgp(connectionString);

// app.use(express.json());

// app.post('/users', async (req, res) => {
//     try {
//         const body = req.body;
//         // const query = 'INSERT INTO users(id, name) VALUES ($1, $2)';
//         // const data = await db.none(query, [body.id, body.name]);
//        const data = await db.query(`INSERT INTO users(id, name) VALUES (body.id, body.name)`);
//        res.send('successfully inserted')
//     } catch (err) {
//         console.error('Error inserting data:', err);
//         res.status(500).send('Error inserting data');
//     }

// });

// app.listen(3000, () => {
//     console.log(`listening on port 3000`)
// })
