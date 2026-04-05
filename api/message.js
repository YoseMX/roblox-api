let script = "--none";

export default function handler(req, res) {
    if (req.method === "POST") {
        script = req.body.script || "--none";
        return res.status(200).json({ status: "stored" });
    }

    if (req.method === "GET") {
        const temp = script;
        script = "--none"; // reset after fetch
        return res.status(200).send(temp);
    }
}
