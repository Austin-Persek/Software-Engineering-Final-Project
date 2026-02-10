from fastapi import FastAPI
import json
import os
import sys

script_dir = os.path.dirname(os.path.abspath(__file__))
target_dir = os.path.join(script_dir, "..", "../Calcs")
sys.path.append(target_dir)

from definitions import JSON_ROOT


def get_json_file_data(filename: str) -> dict:
    if not os.path.isfile(filename):
        return json.load({})
    with open(filename, "r") as f:
        return json.load(f)


app = FastAPI()


@app.get("/test")
def get_test():
    return {"message": "Working!"}


# AIRPLANEs
@app.get("/v1/airports")
async def get_airports():
    """
    Returns all airports with a bunch of extra data...
    """
    get_json_file_data(f"{JSON_ROOT}/airports.json")


@app.get("/v1/airplanes")
async def get_airplanes():
    """
    Returns all airports with a bunch of extra data...
    """
    return get_json_file_data(f"{JSON_ROOT}/airplanes.json")


@app.post("/")
def post_root():
    return {"message": "hello-world"}


@app.post("/")
def get_root():
    return {"message": "check /docs for info about api"}
