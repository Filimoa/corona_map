import requests
import datetime
import pytz
import os

def create_routing_info(origin, destination):  
    os.environ['GOOGLE_MAPS_API_KEY'] = 'AIzaSyB768NFTC4U5hM2Q3saktEBgotjjo5XzcY'
    GOOGLE_MAPS_API_KEY = os.environ['GOOGLE_MAPS_API_KEY']

    api_url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial"
    params_url = "&origins={}&destinations={}&key={}"

    api_call = api_url + params_url.format(origin, destination, GOOGLE_MAPS_API_KEY)

    try:
        res = requests.get(api_call).json()
        distance = res["rows"][0]["elements"][0]["distance"]["text"]
        duration = res["rows"][0]["elements"][0]["duration"]["text"]
    except:
        distance = "Not found"
        duration = " Not found"

    routing_info = {"distance": distance, "duration": duration}
    return routing_info


def get_dissolved_snow_filename(state='co', days_out=0):
    '''
    Function to get the name of the a dissolved snow file.
    
    days_out -> number of days from today, (today being 0)
    '''
    aws_base_url = "http://powdamap-assets.s3.us-east-2.amazonaws.com"

    filename = '{}/dissolved-snow-{}-{}'.format(aws_base_url, state,
                                                      days_out)

    return filename

def fetch_darksky_weather(latitude, longitude):
    """
    Function that retrieves a given a historical forecast
    Returns:
    data -> dictionary with all the components of the forecast for that
    day
    """

    # Create URL template
    url_template = (
        "https://api.darksky.net/forecast/{}/{},{}?exclude=currently,hourly, minutely"
    )

    DARKSKY_API_KEY = "a1baeac461ea6f8a25e1d0b0beda77d9"  # sergey key

    # Create request URL
    request_url = url_template.format(DARKSKY_API_KEY, latitude, longitude)

    # Get historical weather data as JSON
    response = requests.get(request_url)

    # Handle unsuccessful response code
    if not response.ok:
        print(response.json())

    # Get JSON response
    json_data = response.json()

    try:
        return json_data

    except:
        print("Failed", unix_date, latitude, longitude)
        return None


def fetch_week_of_forecast(latitude,
                           longitude,
                           attribute="precipAccumulation"):
    """
    Fetches the upcoming forecast for a given attribute (7 days out)
    Attribute can be anything that DarkSky returns in API

    Example:
    Daily snowfall ("precipAccumulation") in Denver over the next week

    Returns:
    {'2019-11-27': 1.66, '2019-11-28': 3.16 , ...}
    """
    response = fetch_darksky_weather(latitude=latitude, longitude=longitude)

    forecast = {}

    for daily_forecast in response["daily"]["data"]:
        daily_total = 0
        if attribute in daily_forecast:
            daily_total = float(daily_forecast[attribute])

        unix_time = daily_forecast["time"]
        time = datetime.datetime.utcfromtimestamp(unix_time).strftime(
            "%Y-%m-%d")

        forecast[time] = daily_total
    return forecast


def get_forecast_text(latitude, longitude , days_out,  forecast_type = 'acc'):
  '''
  Get forecast text

  days_out -> how many days out is forecast
  forecast_type -> 'acc' total snow accumulation or 
                    'one_day' forecast for a specific day
  '''

  forecast = fetch_week_of_forecast(latitude, longitude)

  date = datetime.datetime.now(pytz.timezone('America/Denver'))

    #not used yet
  if forecast_type == 'one_day':
    days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
    date += datetime.timedelta(days=days_out)

    formatted_date = "{}-{}-{}".format(date.year, date.month, date.day)
    snow =  forecast.get(formatted_date)
    human_date = '{}, {}/{}'.format( days[date.weekday()] , date.month, date.day)
    
    text = '{}" on {}'.format(int(snow), human_date)
    return text


  else:
    max_date = date + datetime.timedelta(days=days_out)
    total_snow = 0

    while date <= max_date:
      formatted_date = "{}-{}-{}".format(date.year, date.month, date.day)
      total_snow += forecast.get(formatted_date)
      date += datetime.timedelta(days=1)
    
    text = '{}" IN NEXT {} DAYS'.format(int(total_snow), days_out) 

    if days_out == 0:
        text = '{}" TODAY'.format(int(total_snow))

    return text






