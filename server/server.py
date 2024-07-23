from flask import Flask, request, jsonify
from ScraperV2 import getThesaurusData
from WordGrabber import getWords

app = Flask(__name__)

@app.route('/api/thesaurus', methods=['GET'])
def get_thesaurus_data():
    term = request.args.get('term')
    data = getThesaurusData(term)
    return jsonify(data)

@app.route('/api/words', methods=['GET'])
def get_words():
    return getWords()

if __name__ == '__main__':
    app.run(debug=True)
