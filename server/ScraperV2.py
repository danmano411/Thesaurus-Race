import requests
from bs4 import BeautifulSoup
import json

def getThesaurusData(term):
    term = term.lower()
    term.replace(" ", "-")

    # URL of the Thesaurus page
    url = "https://www.thesaurus.com/browse/" + term

    # Send a GET request to fetch the webpage content
    response = requests.get(url)

    if response.status_code == 200:
        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.text, "html.parser")

        # Get the Word
        word = soup.find("h1").text

        # Find the script tag with id "preloaded-state"
        data = soup.find("script", {"id": "preloaded-state"})
        data = data.text
        data = json.loads(data[40:])
        
        data = data["lexigraph"]["thesaurusData"]["data"]["slugs"][0]["entries"][len(data["lexigraph"]["thesaurusData"]["data"]["slugs"][0]["entries"])-1]["partOfSpeechGroups"]

        returnData = {}        
        for partOfSpeech in data:
            partOfSpeechDict = {}
            for definition in partOfSpeech["shortDefinitions"]:
                definition["shortDef"] = definition["shortDef"].lower()
                if "as in " in definition["shortDef"]:
                    definition["shortDef"] = definition["shortDef"][6:]
                partOfSpeechDict[definition["shortDef"]] = {}
                partOfSpeechDict[definition["shortDef"]]["Synonyms"] = {}
                for s in definition["synonyms"]:
                    if s["similarity"] == 100:
                        if "1Strongest matches" not in partOfSpeechDict[definition["shortDef"]]["Synonyms"]:
                            partOfSpeechDict[definition["shortDef"]]["Synonyms"]["1Strongest matches"] = []
                        partOfSpeechDict[definition["shortDef"]]["Synonyms"]["1Strongest matches"].append(s["targetWord"])
                    elif s["similarity"] == 50:
                        if "2Strong matches" not in partOfSpeechDict[definition["shortDef"]]["Synonyms"]:
                            partOfSpeechDict[definition["shortDef"]]["Synonyms"]["2Strong matches"] = []
                        partOfSpeechDict[definition["shortDef"]]["Synonyms"]["2Strong matches"].append(s["targetWord"])
                    else:
                        if "3Weak matches" not in partOfSpeechDict[definition["shortDef"]]["Synonyms"]:
                            partOfSpeechDict[definition["shortDef"]]["Synonyms"]["3Weak matches"] = []
                        partOfSpeechDict[definition["shortDef"]]["Synonyms"]["3Weak matches"].append(s["targetWord"])
                if len(partOfSpeechDict[definition["shortDef"]]["Synonyms"]) == 0:
                    partOfSpeechDict[definition["shortDef"]]["Synonyms"] = []

                partOfSpeechDict[definition["shortDef"]]["Antonyms"] = {}
                for a in definition["antonyms"]:
                    if a["similarity"] == -100:
                        if "1Strongest opposites" not in partOfSpeechDict[definition["shortDef"]]["Antonyms"]:
                            partOfSpeechDict[definition["shortDef"]]["Antonyms"]["1Strongest opposites"] = []
                        partOfSpeechDict[definition["shortDef"]]["Antonyms"]["1Strongest opposites"].append(a["targetWord"])
                    elif a["similarity"] == -50:
                        if "2Strong opposites" not in partOfSpeechDict[definition["shortDef"]]["Antonyms"]:
                            partOfSpeechDict[definition["shortDef"]]["Antonyms"]["2Strong opposites"] = []
                        partOfSpeechDict[definition["shortDef"]]["Antonyms"]["2Strong opposites"].append(a["targetWord"])
                    else:
                        if "3Weak opposites" not in partOfSpeechDict[definition["shortDef"]]["Antonyms"]:
                            partOfSpeechDict[definition["shortDef"]]["Antonyms"]["3Weak opposites"] = []
                        partOfSpeechDict[definition["shortDef"]]["Antonyms"]["3Weak opposites"].append(a["targetWord"])
                if len(partOfSpeechDict[definition["shortDef"]]["Antonyms"]) == 0:
                    partOfSpeechDict[definition["shortDef"]]["Antonyms"] = []
            returnData[partOfSpeech["partOfSpeech"]] = partOfSpeechDict
        
        return [word, returnData]
    else:
        print("Failed to fetch the webpage. Status code:", response.status_code)
        return LookupError()
