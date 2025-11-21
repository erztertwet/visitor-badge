import redis from "../../src/redis.js";
import {makeBadge} from "badge-maker";

export default async function handler(req, res) {
    const { key, style="flat", color="blue", labelColor="grey" } = req.query;

    let svg;
    if(!key){
        svg = makeBadge({
            label: "error",
            message: "no key provided",
            color: "red",
            labelColor,
            style
        });
        res.setHeader("Content-Type", "image/svg+xml");
        res.status(400).send(svg);
        return;
    }

    try {
        const counter = await redis.incr(`counter:${key}`);
        svg = makeBadge({
            label: "visitors",
            message: counter.toString(),
            color,
            labelColor,
            style,
            logoBase64: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMTAgNTAgUTUwIDEwIDkwIDUwIFE1MCA5MCAxMCA1MCBaIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNSIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjEyIiBmaWxsPSIjZmZmZmZmIi8+PC9zdmc+`,
        });

        res.setHeader("Content-Type", "image/svg+xml");
        res.status(200).send(svg);
    } catch (error) {
        svg = makeBadge({
            label: "error",
            message: "internal error",
            color: "red",
            labelColor,
            style
        });
        res.setHeader("Content-Type", "image/svg+xml");
        res.status(500).send(svg);
    }
}