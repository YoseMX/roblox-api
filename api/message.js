// api/message.js
let scriptStore = { script: "--none", targetUser: null };
const SECRET_KEY = "LMAOXD_Key768675";

export default async function handler(req, res) {
    const body = req.body || {};
    const key = body.LMAOXD_Key768675 || req.query.LMAOXD_Key768675;

    if (key !== SECRET_KEY) {
        return res.status(401).json({ error: "Unauthorized: Invalid Key" });
    }

    // POST: store script + target username
    if (req.method === "POST") {
        scriptStore.script = body.script || "--none";
        scriptStore.targetUser = body.targetUser || null; // optional
        return res.status(200).json({ status: "stored", targetUser: scriptStore.targetUser });
    }

    // GET: return script only if server has that user
    // server provides ?username=<playername>
    if (req.method === "GET") {
        const requestingServerUsername = req.query.username || null;

        // Only return script if username matches
        if (requestingServerUsername && requestingServerUsername === scriptStore.targetUser) {
            const temp = scriptStore.script;
            scriptStore.script = "--none";     // reset after fetch
            scriptStore.targetUser = null;     // reset
            return res.status(200).send(temp);
        } else {
            return res.status(200).send("--none");
        }
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
