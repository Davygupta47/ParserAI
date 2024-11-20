import os
import sys
from flask import Flask, request, render_template
from pypdf import PdfReader  # Or PyPDF2, if you meant that
import json
from resumeparser import ats_extractor


sys.path.insert(0, os.path.abspath(os.getcwd()))  # Use os.getcwd() instead of os.get.cwd()

UPLOAD_PATH = r"__DATA__"

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/result', methods=['POST'])
def ats():
    doc = request.files['pdf_doc']
    doc.save(os.path.join(UPLOAD_PATH, "file.pdf"))  # Corrected save path
    doc_path = os.path.join(UPLOAD_PATH, "file.pdf")  # Corrected file path
    data = _read_file_from_path(doc_path)
    data = ats_extractor(data)

    return render_template('index.html', data=json.loads(data))

def _read_file_from_path(path):
    reader = PdfReader(path)
    data = ""

    for page_no in range(len(reader.pages)):
        page = reader.pages[page_no]
        text = page.extract_text()
        data += text

    return data  # Return after the loop

if __name__ == "__main__":
    app.run(port=5501, debug=True)  # Corrected 'TRUE' to 'True'
