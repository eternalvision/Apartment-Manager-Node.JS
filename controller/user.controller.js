const db = require("../db");
const data = require("../data.json");

class RecordController {
    async createRecord(req, res) {
        for (const item of data) {
            const { description, addressLease, sum, imageUrl, url } = item;
            try {
                const newRecord = await db.query(
                    " INSERT INTO apartmentSale (description, addressLease, sum, imageUrl, url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                    [description, addressLease, sum, imageUrl, url]
                );
                console.log("Inserted record:", newRecord.rows[0]);
            } catch (error) {
                res.json(error);
            }
        }
    }

    async getRecords(req, res) {
        try {
            const resords = await db.query(`SELECT * FROM apartmentSale`);
            res.json(resords.rows);
        } catch (error) {
            res.json(error);
        }
    }

    async getOneRecord(req, res) {
        try {
            const id = req.params.id;
            const record = await db.query(
                `SELECT * FROM apartmentSale where id = $1`,
                [id]
            );
            res.json(record.rows);
        } catch (error) {
            res.json(error);
        }
    }

    async updateRecord(req, res) {
        try {
            const { description, addressLease, sum, imageUrl, url, id } =
                req.body;
            const record = await db.query(
                "UPDATE apartmentSale set description = $1, addressLease = $2, sum = $3, imageUrl = $4, url = $5 where id = $6 RETURNING *",
                [description, addressLease, sum, imageUrl, url, id]
            );
            res.json(record.rows);
        } catch (error) {
            res.json(error);
        }
    }

    async deleteRecord(req, res) {
        try {
            const id = req.params.id;
            const record = await db.query(
                `DELETE FROM apartmentSale where id = $1`,
                [id]
            );
            res.json(record.rows);
        } catch (error) {
            res.json(error);
        }
    }
}

module.exports = new RecordController();
