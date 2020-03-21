from flask import Flask, request, render_template, jsonify
import utils
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
def get_resort_geojson_data():
    data = requests.get("https://corona-map.s3.us-east-2.amazonaws.com/merged.geojson").json()
    return data




if __name__ == "__main__":
    app.run()

