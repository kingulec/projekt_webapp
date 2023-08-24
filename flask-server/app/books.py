import datetime


class Book:
    def __init__(self, id_ksiazka, isbn, tytul, opis,
                 nazwa_wydawnictwa, rok_wydania,
                 autor_imie, autor_nazwisko,
                 nazwa_kategorii):
        self.id_ksiazka = id_ksiazka
        self.isbn = isbn
        self.nazwa_wydawnictwa = nazwa_wydawnictwa
        self.tytul = tytul
        self.opis = opis
        self.autor_imie = autor_imie
        self.autor_nazwisko = autor_nazwisko
        self.rok_wydania = rok_wydania
        self.nazwa_kategorii = nazwa_kategorii

    def display_book(self):
        return {
            "ID książki": self.id_ksiazka,
            "ISBN": self.isbn,
            "Kategoria": self.nazwa_kategorii,
            "Tytuł": self.tytul,
            "Opis": self.opis,
            "Autor nazwisko": self.autor_nazwisko,
            "Autor imie": self.autor_imie,
            "Wydawnictwo": self.nazwa_wydawnictwa,
            "Rok wydania": self.rok_wydania
        }

    def borrow(self, user_id, cursor, connection):
        current_date = datetime.datetime.now().strftime("%Y-%m-%d")
        query = "INSERT INTO Wypozyczenia (id_czytelnik, id_ksiazka, data_wypozyczenia) VALUES (?, ?, ?)"
        cursor.execute(query, (user_id, self.id_ksiazka, current_date))
        connection.commit()

    def return_book(self, user_id, cursor, connection):
        current_date = datetime.datetime.now().strftime("%Y-%m-%d")
        query = "UPDATE Wypozyczenia SET data_oddania = ? WHERE id_czytelnik = ? AND id_ksiazka = ?"
        cursor.execute(query, (current_date, user_id, self.id_ksiazka))
        connection.commit()

    def get_author(self):
        return f"{self.autor_imie} {self.autor_nazwisko}"

    def get_publication_info(self):
        return f"Wydawnictwo: {self.nazwa_wydawnictwa}, Rok wydania: {self.rok_wydania}"

    def is_available(self, cursor):
        query = "SELECT COUNT(*) FROM Wypozyczenia WHERE id_ksiazka = ? AND data_oddania IS NULL"
        cursor.execute(query, (self.id_ksiazka,))
        result = cursor.fetchone()[0]
        return result == 0

    def is_borrowed(self, cursor):
        query = "SELECT COUNT(*) FROM Wypozyczenia WHERE id_ksiazka = ? AND data_oddania IS NULL"
        cursor.execute(query, (self.id_ksiazka,))
        result = cursor.fetchone()[0]
        return result > 0

    def get_description(self):
        return self.opis

    def get_category(self):
        return self.nazwa_kategorii

    def get_isbn(self):
        return self.isbn