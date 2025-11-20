import redis from "../../src/redis.js";

export default async function handler(req, res) {
    const key = req.query.key;

    if(!key){
        return res.status(400).json({
            schemaVersion: 1,
            label: "visitors",
            message: "invalid key",
            color: "red"
        });
    }

    try {
        const counter = await redis.incr(`counter:${key}`);

        res.status(200).json({
            schemaVersion: 1,
            label: "visitors",
            message: counter.toString(),
            color: "blue"
        });
    } catch (error) {
        res.status(500).json({
            schemaVersion: 1,
            label: "visitors",
            message: "error",
            color: "red"
        });
    }
}