let script = "--none";

// Your secret key
const SECRET_KEY = "LMAOXD_Key768675";

export default async function handler(req, res) {
    const body = req.body || {};
    const key = body.LMAOXD_Key768675 || req.query.LMAOXD_Key768675;

    // --- Auth check for all requests ---
    if (key !== SECRET_KEY) {
        return res.status(401).json({ error: "Unauthorized: Invalid Key" });
    }

    // --- Store script on POST ---
    if (req.method === "POST") {
        script = body.script || "--none";
        return res.status(200).json({ status: "stored" });
    }

    // --- Get script on GET ---
    if (req.method === "GET") {
        const temp = script;
        script = "--none"; // reset after fetch
        return res.status(200).send(temp);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
