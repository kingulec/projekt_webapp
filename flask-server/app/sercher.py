import regex as re


class Searcher:
    def __init__(self):
        self.finds = []

    def search_by_title(self, books, reg):
        reg = re.compile(r'.*{}.*'.format(reg))
        for book in books:
            find = reg.search(book.tytul)
            if find:
                self.finds.append(f"{book.tytul}, {book.autor_imie} {book.autor_nazwisko}")
        return self.finds

    def search_by_authors(self, books, reg):
        reg = re.compile(r'.*{}.*'.format(reg))
        for book in books:
            find = reg.search(book.autor_imie)
            if find:
                self.finds.append(f"{book.tytul}, {book.autor_imie} {book.autor_nazwisko}")
            find_a = reg.search(book.autor_nazwisko)
            if find_a:
                self.finds.append(f"{book.tytul}, {book.autor_imie} {book.autor_nazwisko}")
        return self.finds

    def search_by_publisher(self, books, reg):
        reg = re.compile(r'.*{}.*'.format(reg))
        for book in books:
            find = reg.search(book.nazwa_wydawnictwa)
            if find:
                self.finds.append(f"{book.tytul}, {book.autor_imie} {book.autor_nazwisko}")
        return self.finds

