# api/message.py
import json
from flask import Flask, request
import requests

app = Flask(__name__)

SECRET_KEY = "LMAOXD_Key768675"

# Dummy Roblox API endpoint examples
# In practice, replace these with actual Roblox HTTP endpoints
def get_all_servers(place_id):
    """
    Returns a list of server IDs for a place.
    Replace this with the real Roblox endpoint for server list.
    """
    # Example dummy data
    return ["server1", "server2", "server3"]

def get_players_in_server(server_id):
    """
    Returns a list of player usernames in the given server.
    Replace with actual Roblox API call.
    """
    # Example dummy data
    dummy_players = {
        "server1": ["Alice", "Bob"],
        "server2": ["Charlie", "Dave"],
        "server3": ["Eve", "Bob"],
    }
    return dummy_players.get(server_id, [])

def execute_script_in_server(script, server_id):
    """
    Sends the script to the Roblox server. Replace this with your
    actual in-game endpoint or remote.
    """
    print(f"[EXEC] Sending script to server {server_id}")
    # Here you would call Roblox server API / RemoteEvent
    # For demo, just print
    return True

@app.route("/api/message", methods=["POST"])
def handle_message():
    data = request.json
    if not data or data.get("LMAOXD_Key768675") != SECRET_KEY:
        return json.dumps({"status":"error","msg":"Invalid key"}), 401

    script = data.get("script")
    target_username = data.get("target_username")
    if not script or not target_username:
        return json.dumps({"status":"error","msg":"Missing script or username"}), 400

    # Example place_id (replace with your game's actual place ID)
    place_id = "1234567890"

    servers = get_all_servers(place_id)
    executed_servers = []

    for server_id in servers:
        players = get_players_in_server(server_id)
        if target_username in players:
            execute_script_in_server(script, server_id)
            executed_servers.append(server_id)

    return json.dumps({
        "status":"success",
        "executed_servers": executed_servers,
        "target_username": target_username
    })

if __name__ == "__main__":
    app.run()
