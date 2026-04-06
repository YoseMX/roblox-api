let script = "--none";
let currentServer = null; // server ID allowed to execute

const SECRET_KEY = "LMAOXD_Key768675";

export default async function handler(req, res) {
    const body = req.body || {};
    const key = body.LMAOXD_Key768675 || req.query.LMAOXD_Key768675;
    const serverID = body.server_id || req.query.server_id;

    if (key !== SECRET_KEY) return res.status(401).json({ error: "Unauthorized" });

    // POST: store script and assign a server to execute it
    if (req.method === "POST") {
        script = body.script || "--none";
        currentServer = serverID || null;
        return res.status(200).json({ status: "stored", server: currentServer });
    }

    // GET: only allow the current server to fetch
    if (req.method === "GET") {
        if (serverID && serverID === currentServer) {
            const temp = script;
            script = "--none";      // reset after fetch
            currentServer = null;   // reset lock
            return res.status(200).send(temp);
        } else {
            return res.status(200).send("--none");
        }
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
