from flask import Flask, request, jsonify, render_template
import json, os
from datetime import datetime

# Creates the Flask application object.
app = Flask(__name__)

# Path to reflections.json
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, "reflections.json")


# Load reflections from JSON file
def load_reflections():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    return []


# Save reflections back into reflections.json
def save_reflections(reflections):
    with open(DATA_FILE, "w") as f:
        json.dump(reflections, f, indent=4)


# ---------------------------
# PAGE ROUTES
# ---------------------------

# Homepage (index.html)
@app.route("/")
def index():
    return render_template("index.html")


# About Page
@app.route("/about")
def about():
    return render_template("about.html")


# Journal Page
@app.route("/journal")
def journal():
    return render_template("journal.html")


# Projects Page
@app.route("/projects")
def projects():
    return render_template("projects.html")


# ---------------------------
# API ROUTES
# ---------------------------

# GET all reflections
@app.route("/api/reflections", methods=["GET"])
def get_reflections():
    reflections = load_reflections()
    return jsonify(reflections)


# POST a new reflection
@app.route("/api/reflections", methods=["POST"])
def add_reflection():
    data = request.get_json()

    new_reflection = {
        "name": data.get("name", "Untitled"),
        "reflection": data.get("reflection", ""),
        "date": datetime.now().strftime("%a %b %d %Y")
    }

    reflections = load_reflections()
    reflections.append(new_reflection)
    save_reflections(reflections)

    return jsonify(new_reflection), 201

#delete individual route
@app.route("/api/reflections/<int:index>", methods=["DELETE"])
def delete_reflection(index):
    reflections = load_reflections()

    if 0 <= index < len(reflections):
        removed = reflections.pop(index)
        save_reflections(reflections)
        return jsonify({"deleted": removed}), 200

    return jsonify({"error": "Index out of range"}), 404

#edit route
@app.route("/api/reflections/<int:index>", methods=["PUT"])
def edit_reflection(index):
    reflections = load_reflections()

    if index < 0 or index >= len(reflections):
        return jsonify({"error": "Invalid index"}), 404

    data = request.get_json()

    reflections[index]["name"] = data.get("name", reflections[index]["name"])
    reflections[index]["reflection"] = data.get("reflection", reflections[index]["reflection"])
    reflections[index]["date"] = datetime.now().strftime("%a %b %d %Y")

    save_reflections(reflections)
    return jsonify(reflections[index]), 200




# ---------------------------
# RUN FLASK
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True)
