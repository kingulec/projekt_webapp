import pyodbc
import sys
def connect_to_db(server, database, driver ):
    try:
        connection = pyodbc.connect('Driver={SQL Server};'
                                    'Server=DESKTOP-673Q88D;'
                                    'Database=BIBLIOTEKA;'
                                    'Trusted_Connection=yes;')
        cursor = connection.cursor()
        return cursor, connection
    except pyodbc.DatabaseError as exception:
        print(exception)
        sys.exit(2)
