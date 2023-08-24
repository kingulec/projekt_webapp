import regex as re


class User:
    def __init__(self, id_czytelnik, login, password, email, phone, birth_date):
        self.id_czytelnik = id_czytelnik
        self.login = login
        self.password = password
        self.email = email
        self.phone = phone
        self.birth_date = birth_date

    def add_user(self, cursor, connection):
        query = "INSERT INTO Czytelnicy (id_czytelnik," \
                " login, haslo, email," \
                " telefon, data_urodzenia) VALUES (?, ?, ?, ?, ?, ?)"
        cursor.execute(query, (self.id_czytelnik, self.login, self.password, self.email, self.phone,self.birth_date))
        connection.commit()

    def change_password(self,new_pass, reply_pass, cursor, connection):
        query = "UPDATE Czytelnicy SET haslo = ? WHERE id_czytelnik = ?"

        valid = self.valid_password(new_pass)
        if not valid:
            return False
        if reply_pass == new_pass:
            cursor.execute(query, (new_pass, self.id_czytelnik))
            self.haslo = new_pass
            connection.commit()
            return True
        print("Hasła się różnią!")
        return False

    @staticmethod
    def valid_password(password):
        if not re.search(r"\W", password) or not re.search(r"\d", password):
            print("Password does not meet the requirements !")
            return False
        if not re.match(r"[a-zA-Z]+", password):
            print("Password should contains letters !")
            return False
        return True

    @staticmethod
    def is_valid_email(email):
        pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        return re.match(pattern, email) is not None

    def change_email(self, new_mail, cursor, connection):
        query = "UPDATE Czytelnicy SET email = ? WHERE id_czytelnik = ?;"
        if self.is_valid_email(new_mail):
            self.email = new_mail
            cursor.execute(query, (new_mail, self.id_czytelnik))
            connection.commit()
            return True
        return False

    @staticmethod
    def is_valid_phone(phone):
        if len(phone) != 9:
            return False
        return True

    def change_phone(self, new_phone, cursor, connection):
        query = "UPDATE Czytelnicy SET telefon = ? WHERE id_czytelnik = ?;"
        if self.is_valid_phone(new_phone):
            self.phone = new_phone
            cursor.execute(query, (new_phone, self.id_czytelnik))
            connection.commit()
            return True
        print("Enter correct phone number")
        return False

    def get_user_data(self, cursor):
        query = "SELECT * FROM Czytelnicy " \
                "WHERE login = ?"
        cursor.execute(query, (self.login,))
        user_data = cursor.fetchone()

        if user_data:
            self.id_czytelnik = user_data.id_czytelnik
            self.email = user_data.email
            self.phone = user_data.telefon
            self.birth_date = user_data.data_urodzenia
            print(user_data)
            return True
        return False

    def forgot_password(self):
        if self.email is not None:
            print("You will receive an email with temporary password.")
        elif self.phone is not None:
            print("You will receive a message with temporary password.")