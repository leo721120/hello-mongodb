import { MongoClient } from 'mongodb'

describe('mqtt', function () {
    let connection: MongoClient;

    beforeAll(async function () {
        connection = await MongoClient.connect('mongodb://root:example@localhost:27017', {
            useUnifiedTopology: true,
        });
    });
    afterAll(async function () {
        await connection.close();
    });
    it('put/get', async function () {
        const db = connection.db('mydb');
        await db.dropCollection('user');
        const user = await db.collection('user');
        const res = await user.insertMany([
            { name: 'a' },
            { name: 'b' },
            { name: 'c' },
        ]);
        expect(res.result.n).toBe(3);
        const list = await user.find().toArray();
        expect(list).toHaveLength(3);
        expect(list[0]).toHaveProperty('name', 'a');
        expect(list[1]).toHaveProperty('name', 'b');
        expect(list[2]).toHaveProperty('name', 'c');
    });
});