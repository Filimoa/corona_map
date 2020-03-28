from flask import Flask, request, render_template, jsonify
import requests
import os

app = Flask(
    __name__, static_folder=".././templates/build/", template_folder=".././templates/build"
)

@app.route("/")
def index():
    """
    rendering main page
    """
    return render_template("index.html")
 

@app.route("/get-state-geojson", methods=["GET"])
def get_state_geojson_data():
    data = requests.get("https://corona-map.s3.us-east-2.amazonaws.com/merged.geojson").json()
    return data

@app.route("/get-state-quarantines", methods=["GET"])
def get_quarantine_data():
    data = requests.get("https://corona-map.s3.us-east-2.amazonaws.com/quarantine_states.json").json()
    return data

@app.route("/get-quarantines-outlines", methods=["GET"])
def get_quarantine_outlines():
    data = requests.get("https://corona-map.s3.us-east-2.amazonaws.com/quarantine_states.geojson").json()
    return data


if __name__ == "__main__":
    app.run()

