from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/bfhl', methods=['GET', 'POST'])
def bfhl():
    if request.method == 'POST':
        data = request.json.get('data', [])
        user_id = request.form.get('user_id')
        email = request.form.get('email')
        roll_number = request.form.get('roll_number')

        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        highest_alphabet = sorted(alphabets, key=str.lower, reverse=True)[:1] if alphabets else []

        response = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": highest_alphabet
        }
        return jsonify(response)
    else:
        return render_template('index.html')

@app.route('/operation_code', methods=['GET'])
def process_get_request():
    return jsonify({"operation_code": 1})

