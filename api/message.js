let message = null;
let command = null;

export default function handler(req, res) {
    if (req.method === "POST") {
        if (req.body.message) message = req.body.message;
        if (req.body.command) command = req.body.command;
        return res.status(200).json({ status: "ok" });
    }

    if (req.method === "GET") {
        // Return current message & command
        const data = { message, command };
        // Clear them after reading
        message = null;
        command = null;
        return res.status(200).json(data);
    }
}
