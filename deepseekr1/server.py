from flask import Flask, request, Response, stream_with_context
from flask_cors import CORS
import ollama 
import json

app = Flask(__name__, static_folder='public', static_url_path='')
CORS(app)

#initialize the ollama client
client = ollama.Client(host='http://localhost:11434')


@app.route('/')
def serve_index():
    return app.send_static_file('index.html')



if __name__ == '__main__':
    app.run(host='localhost',debug=False, port=8080)

