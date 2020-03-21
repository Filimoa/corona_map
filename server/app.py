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


@app.route("/get-routing-info", methods=["POST"])
def return_routing_info():
    """
    API to get driving distance and duration information
    """
    
    user_location = request.json["userLocation"]
    resort_location = request.json["resortLocation"]
    routing_info = utils.create_routing_info(
        origin=user_location, destination=resort_location
    )
    print('Routing info ', routing_info)
    return jsonify(routing_info)


@app.route("/get-snow-geojson", methods=["POST"])
def get_snow_geojson():
    '''
    Function to return snow geojson for given N days out  
    '''
    days_out = int(request.json["forecastTimeframe"])

    filename = utils.get_dissolved_snow_filename(days_out=days_out)
    print(filename)
    try:
        data = requests.get(filename).json()
        return data
    except:
        return { "type": "Point", "coordinates": []}

    


@app.route("/get-resort-geojson", methods=["GET"])
def get_resort_geojson_data():
    data = requests.get("https://powdamap-assets.s3.us-east-2.amazonaws.com/resorts.geojson").json()
    return data


@app.route("/get-starting-resort", methods=["GET"])
def get_starting_resort():
    data = requests.get("https://powdamap-assets.s3.us-east-2.amazonaws.com/initial_resort").json()
    return data


@app.route("/geocode-address", methods=["POST"])
def geocode_address():
    KEY = "sjgMzSaKB6mu16pMMDDb0FP0aaiyyhQP"
    print('Request came in with ' , request.json)
    user_location = request.json["userLocation"]
    url = "http://www.mapquestapi.com/geocoding/v1/address?key={}&location={}&maxResults=1".format(
        KEY, user_location)
    
    data = requests.get(url).json()
    
    cords = data['results'][0]['locations'][0]['displayLatLng']
    
    return jsonify(cords)



if __name__ == "__main__":
    app.run()

