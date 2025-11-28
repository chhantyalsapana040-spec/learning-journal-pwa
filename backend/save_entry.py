import json
from datetime import datetime

FILE_PATH = "reflections.json"

# Ask the user for input
name = input("Enter your Week Title: ")
reflection_text = input("Enter your reflection: ")

# Create entry
entry = {
    "week": name,
    "reflection": reflection_text,
    "date": datetime.now().strftime("%Y-%m-%d %H:%M")
}

# Load existing JSON data
try:
    with open(FILE_PATH, "r") as file:
        data = json.load(file)
except:
    data = []

# Add new entry
data.append(entry)

# Save updated JSON file
with open(FILE_PATH, "w") as file:
    json.dump(data, file, indent=4)

print("Reflection saved!")
