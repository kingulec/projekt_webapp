from flask import Flask, request, jsonify, make_response, request, redirect, url_for, render_template
from flask_cors import CORS
import flask_app
from app.connect_to_db import connect_to_db
from app.sercher import Searcher
from app.user import User
app = Flask(__name__)
CORS(app)

data = flask_app.load_config_file("db_config.ini")
cursor, connection = connect_to_db(data["server"], data["database"], data["driver"])

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    user, login = flask_app.login(username, password, cursor)

    if user:
        return make_response(jsonify({"message": f"Login successful {login}"}), 200)
    else:
        return make_response(jsonify({"message": "Invalid credentials"}), 401)

@app.route("/search", methods=["POST"])
def search():
    data = request.json
    search_type = data.get("search_type")
    search_query = data.get("search_query")

    books = flask_app.get_books(cursor)  # Tutaj umieść dane książek (może być lista obiektów Book)
    
    searcher = Searcher()
    if search_type == "tytul":
        results = searcher.search_by_title(books, search_query)
    elif search_type == "autor":
        results = searcher.search_by_authors(books, search_query)
    elif search_type == "wydawca":
        results = searcher.search_by_publisher(books, search_query)
    else:
        results = []

    return jsonify({"results": results})

@app.route("/login/create_account", methods=["POST"])
def create_account():
    cursor.execute("SELECT MAX(id_czytelnik) FROM Czytelnicy;")
    max_id = cursor.fetchone()[0]  
    new_id = max_id + 1
    if max_id is None:
        new_id = 1

    data = request.json
    id_czytelnik = new_id  
    login = data.get("login")
    password = data.get("password")
    email = data.get("email")
    phone = data.get("phone")
    birth_date = data.get("birth_date")

    new_user = User(id_czytelnik, login,password, email, phone, birth_date)
    new_user.add_user(cursor, connection)
    
    return make_response(jsonify({"message": "Account created successfully"}), 201)

if __name__ == '__main__':
    app.run(debug=True)
