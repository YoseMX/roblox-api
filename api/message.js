let message = "none";

export default function handler(req, res) {
    if (req.method === "POST") {
        message = req.body.message || "no message";
        return res.status(200).json({ status: "ok" });
    }

    if (req.method === "GET") {
        return res.status(200).json({ message });
    }
}
