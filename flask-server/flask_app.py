import sys
import datetime
from flask import request
import regex as re

from app.connect_to_db import connect_to_db
from app.user import User
from app.books import Book
import configparser
import os

def get_books(cursor):
    query = "SELECT Ksiazki.*, Autorzy.imie AS autor_imie, Autorzy.nazwisko AS " \
            "autor_nazwisko, Kategorie.nazwa AS nazwa_kategorii," \
            " Wydawnictwa.nazwa AS nazwa_wydawnictwa " \
            "FROM Ksiazki " \
            "JOIN Autorzy ON Ksiazki.id_autor = Autorzy.id_autor " \
            "JOIN Kategorie ON Ksiazki.id_kategoria = Kategorie.id_kategoria " \
            "JOIN Wydawnictwa ON Ksiazki.id_wydawnictwo = Wydawnictwa.id_wydawnictwo;"
    cursor.execute(query)
    books = []
    row = cursor.fetchone()
    while row:
        book = Book(row.id_ksiazka, row.isbn,
                    row.tytul, row.opis,
                    row.nazwa_wydawnictwa, row.rok_wydania,
                    row.autor_imie, row.autor_nazwisko,
                    row.nazwa_kategorii)
        books.append(book)
        row = cursor.fetchone()
    return books


def get_user_max_id(cursor):
    query = "SELECT MAX(id_czytelnik) FROM Czytelnicy"
    cursor.execute(query)
    return cursor.fetchone()[0]


def create_account(login, birth_date, cursor, connection, email="None", phone="None"):
    max_id = get_user_max_id(cursor)
    new_id = max_id + 1 if max_id is not None else 1
    user = User(new_id, login, email, phone, birth_date)
    user.add_user(cursor, connection)
    return user


def login(username, password, cursor):
    query = "SELECT * FROM Czytelnicy " \
            "WHERE Czytelnicy.login = ? AND haslo = ?;"
    user_data = cursor.execute(query, (username, password))
    #query_2 = "SELECT * FROM Czytelnicy WHERE Czytelnicy.login = ? AND haslo = ?"
    login = cursor.execute(query, (username, password))
    if (len(login.fetchall()) > 0):
        return True, login
    else:
        return False, ""


def load_user_data(login, cursor):
    query = "SELECT * FROM Czytelnicy LEFT JOIN Wypozyczenia ON" \
            " Czytelnicy.id_czytelnik = Wypozyczenia.id_czytelnik " \
            "LEFT JOIN Ksiazki ON Wypozyczenia.id_ksiazka = Ksiazki.id_ksiazka " \
            "LEFT JOIN Kategorie ON Ksiazki.id_kategoria = Kategorie.id_kategoria " \
            "LEFT JOIN Wydawnictwa ON Ksiazki.id_wydawnictwo = Wydawnictwa.id_wydawnictwo "\
            "WHERE Czytelnicy.login = ? AND haslo = ?;"
    cursor.execute(query, (login,))
    user_data = cursor.fetchone()
    if user_data:
        user = User(user_data.id_czytelnik, user_data.login, user_data.email,
                    user_data.telefon, user_data.data_urodzenia)
        return user
    else:
        return None

def load_books_data():
    pass

def load_author_data():
    pass

def load_config_file(filename):
    filename = "C:/Users/kinga/PycharmProjects/backend/config/" + filename
    if not os.path.exists(filename):
        raise FileNotFoundError(f"File {filename} does not exist.")
    config =configparser.ConfigParser()
    config.read(filename)
    data = {}
    params = config.items("database")
    for param in params:
        data[param[0]] = param[1]
    return data






