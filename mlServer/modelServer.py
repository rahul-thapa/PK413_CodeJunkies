from flask import Flask, request
from model import example
# from lr import LR
from productionPredict import predictProduction
from flask_cors import CORS
from returns_crop_names import *
from newLr import *
from cropNames import *

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return example()


@app.route('/py/post', methods=['POST'])
def postEx():
    print(request.json)
    return request.json


@app.route('/py/recommendation', methods=['POST'])
def getRecommendation():
    state = request.json["state"]
    season = request.json["season"]
    Prod_per_area(state, season)
    Prod_per_fert(state, season)
    output = getting_optimum(slope_values1, slope_values2)
    print(output)
    print(request.json)
    return output


@app.route('/py/recommendationnew', methods=['POST'])
def getRecommendationNew():
    district = request.json["district"]
    season = request.json["season"]
    fert = request.json["fert"]
    output = recommendation(district, season, fert)
    print(output)
    print(request.json)
    return output


@app.route('/py/production', methods=['GET', 'POST'])
def getModelData():
    payload = predictProduction(
        str(request.json["state"]), str(request.json["season"]), str(request.json["crop"]), float(request.json["area"]))
    #payload = predictProduction('Assam', 'Kharif', 'Rice', 10)
    return payload


@app.route('/py/productionnew', methods=['GET', 'POST'])
def getnewModelData():
    payload = productionPredict(str(request.json["area"]))
    #payload = predictProduction('Assam', 'Kharif', 'Rice', 10)
    return payload


@app.route('/model', methods=['GET', 'POST'])
def say_hello():
    return 'Hello from Server'


app.run(port=5050)
