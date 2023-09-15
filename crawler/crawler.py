import requests
import json
from bs4 import BeautifulSoup
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/price", methods=["GET", "POST"])
def get_product_price():
    data = request.get_json()
    product_url = data.get("url")

    if product_url:
        price = scrape_product_price(product_url)
        return jsonify({"price": price})
    else:
        return jsonify({"error": "Invalid request"}), 400


def scrape_product_price(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    # Find the div with id "detail-container"
    detail_container = soup.find("div", id="detail-container")

    # Extract the price from the data-googleproduct attribute
    google_product_data = detail_container.get("data-googleproduct", {})
    product_price = ""
    if google_product_data:
        product_data = json.loads(google_product_data)
        product_price = product_data.get("price", "")

    return product_price


if __name__ == "__main__":
    app.run()