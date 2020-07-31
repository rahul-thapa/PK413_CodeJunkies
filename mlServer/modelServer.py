from flask import Flask, request
from model import example
from lr import LR

app = Flask(__name__)


@app.route('/')
def index():
    return example()


@app.route('/post', methods=['GET', 'POST'])
def postEx():
    return request.form["username"]


@app.route('/py/data', methods=['GET', 'POST'])
def getModelData():
    return LR('Assam', 'Rabi')


@app.route('/model', methods=['GET', 'POST'])
def say_hello():
    return 'Hello from Server'


app.run(port=5050)
