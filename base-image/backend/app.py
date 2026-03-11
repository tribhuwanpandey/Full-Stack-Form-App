from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains


client = MongoClient("mongodb+srv://tribhuwanpandey733_db_user:fkeEgCHbzTDNWzLI@dummy.g1fulwh.mongodb.net/?appName=dummy")

db = client["formdb"]
collection = db["users"]

@app.route("/submit", methods=["POST"])
def submit():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"status":"error", "message":"No data received"}), 400

        user = {
            "name": data.get("name"),
            "email": data.get("email"),
            "date": data.get("date"),
            "time": data.get("time")
        }

        collection.insert_one(user)

        return jsonify({
            "status": "success",
            "message": "Data submitted successfully"
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == "__main__":

    app.run(host="0.0.0.0", port=5000)
