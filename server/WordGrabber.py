import csv
import random

def getWords():
    wordList = []
    index = 0

    with open('merged.txt', newline='') as csvfile:
        data = csv.reader(csvfile, delimiter=',')
        for row in data:
            if (index != 0):
                wordList.append(row[1])
            index+= 1
            
    size = len(wordList)

    rand1 = random.randint(0, size-1)
    rand2 = random.randint(0, size-1)
    while (rand1 == rand2):
        rand2 = random.randint(0, size-1)

    return[wordList[rand1],wordList[rand2]]