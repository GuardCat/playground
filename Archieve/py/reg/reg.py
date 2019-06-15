import re

file = open("sms.json")
sms  = file.read( )
file.close( )

print( len(sms) )

#print( re.search('{', sms, 'G') )