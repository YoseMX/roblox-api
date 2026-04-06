// api/message.js
let scriptStore = { script: "--none", server_id: null };

// Your secret key
const SECRET_KEY = "LMAOXD_Key768675";

export default async function handler(req, res) {
    const body = req.body || {};
    const key = body.LMAOXD_Key768675 || req.query.LMAOXD_Key768675;

    if (key !== SECRET_KEY) {
        return res.status(401).json({ error: "Unauthorized: AntiSkid flagged you" });
    }

    // POST: store script + server ID
    if (req.method === "POST") {
        scriptStore.script = body.script || "--none";
        scriptStore.server_id = body.server_id || null; // optional
        return res.status(200).json({ status: "stored", server_id: scriptStore.server_id });
    }

    // GET: return script only if server_id matches query (optional)
    if (req.method === "GET") {
        const requestedServer = req.query.server_id || null;
        if (!requestedServer || requestedServer === scriptStore.server_id) {
            const temp = scriptStore.script;
            scriptStore.script = "--none"; // reset after fetch
            scriptStore.server_id = null;  // reset
            return res.status(200).send(temp);
        } else {
            return res.status(200).send("--none"); // script is not for this server
        }
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
