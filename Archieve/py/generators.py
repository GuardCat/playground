#!/data/data/com.termux/files/usr/bin/python

a = "русский текст с с, english smile"

print( {letter: ord(letter) for letter in a} );
print( {letter for letter in a} )#множество хранит уникальные значения