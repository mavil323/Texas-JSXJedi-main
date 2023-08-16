import logging
import azure.functions as func
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import bcrypt
import pymssql
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Database configuration using environment variables
app.config["DB_HOST"] = os.getenv("DB_HOST")
app.config["DB_USER"] = os.getenv("DB_USER")
app.config["DB_PASSWORD"] = os.getenv("DB_PASSWORD")
app.config["DB_NAME"] = os.getenv("DB_NAME")
CORS(app, origins=["*"], supports_credentials = True)

def main(req: func.HttpRequest, context: func.Context) -> func.HttpResponse:
    return func.WsgiMiddleware(app.wsgi_app).handle(req, context)
                  
conn = pymssql.connect(
    server=app.config["DB_HOST"],
    user=app.config["DB_USER"],
    password=app.config["DB_PASSWORD"],
    database=app.config["DB_NAME"]
)

def verify_password(stored_password,provided_password):
    return bcrypt.checkpw(provided_password.encode("utf-8"),stored_password.encode("utf-8"))

tickets= []

# Service catalog
@app.route("/services",methods=["GET"])
def get_services():
    cursor = conn.cursor()
    try:
        cursor.execute("select * from services")
        columns = [column[0] for column in cursor.description]
        service = []

        for record in cursor.fetchall():
            service.append(dict(zip(columns,record)))
        return jsonify({"services":service})
    except Exception as e:
        return jsonify({"error":str(e)}),500
    finally:
        cursor.close()

#userprofile signup
@app.route("/signup", methods=["POST"])
def signup():
    cursor = conn.cursor()
    data = request.get_json()
    print("Request data:")
    print(data)
    username = data["username"]
    first_name= data["first_name"]
    middle_name= data["middle_name"]
    last_name= data["last_name"]
    security_question_1 = data["security_question_1"]
    security_answer_1 = data["security_answer_1"]
    confirm_answer_1 = data["confirm_answer_1"]
    security_question_2 = data["security_question_2"]
    security_answer_2 = data["security_answer_2"]
    confirm_answer_2 = data["confirm_answer_2"]
    email = data["email"]
    password = data["password"]
  
    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())

    try: 
        # Check if the username already exists
        cursor.execute("SELECT COUNT(*) FROM userProfile WHERE username = %s", (username,))
        if cursor.fetchone()[0] > 0:
            return jsonify({"message": "Username already exists"}), 400
        # check if email exists already
        cursor.execute("SELECT COUNT(*) FROM userProfile WHERE email = %s", (email,))
        if cursor.fetchone()[0] > 0:
            return jsonify({"message": "email already exists"}), 400
      

        # Insert the user information into the userProfile table
        cursor.execute("INSERT INTO UserProfile (username,email, password,first_name,middle_name,last_name,security_question_1,security_answer_1,confirm_answer_1,security_question_2,security_answer_2,confirm_answer_2)VALUES (%s, %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", (username,email,hashed_password,first_name,middle_name,last_name,security_question_1,security_answer_1,confirm_answer_1,security_question_2,security_answer_2,confirm_answer_2))
        conn.commit()

        return jsonify({"message": "User signup successful"}), 201

    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "An error occurred during signup"}), 500
    
#new user account
@app.route("/register",methods=["POST"])
def register():
    cursor = conn.cursor()
    data = request.get_json()

    username = data["user_name"]
    first_name= data["first_name"]
    last_name= data["last_name"]
    email = data["email"]
    password = data["password"]
    confirm_password = data["confirm_password"]
  
    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode('utf8')
    print(cursor.execute("SELECT * FROM users"))

    try: 
        # Check if the username already exists
        cursor.execute("SELECT COUNT(*) FROM users WHERE user_name = %s", (username,))
       
        if cursor.fetchone()[0] > 0:
            return jsonify({"message": "Username already exists"}), 400
        # check if email exists already
        cursor.execute("SELECT COUNT(*) FROM users WHERE email = %s", (email,))
        if cursor.fetchone()[0] > 0:
            return jsonify({"message": "email already exists"}), 400
      

        # Insert the user information into the userProfile table
        cursor.execute("INSERT INTO users (first_name,last_name,email,user_name,password,confirm_password)VALUES (%s, %s,%s,%s,%s,%s)", (first_name,last_name,email,username,hashed_password,hashed_password))
        conn.commit()
        return jsonify({"message": "User signup successful"}), 201
    

    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "An error occurred during signup"}), 500



    #userprofile login
@app.route("/login", methods=["POST"])
def login():
    cursor = conn.cursor()
    data = request.get_json()

    if not data:
        return jsonify({"message":"Invalid request"}),400
    print(data)
    username = data["user_name"]
    password = data["password"]

    try:
        cursor.execute("SELECT user_name, password, concat(first_name, ' ', last_name) as name FROM users Where user_name = %s",(username))
        user_data = cursor.fetchone()
        if not user_data or not verify_password(user_data[1],password):
            return jsonify({"message":"Invalid credentials"}),401
        
        return jsonify({"message":"Sign-in successfull","user_name":user_data[0], "name": user_data[2]}),200
    except Exception as e:
        print("Error:",e)
        return jsonify({"message":"An error occured during sign-in"}),500


#Ticket submission
@app.route("/tickets", methods=["POST"])
def submit_ticket():
    data = request.get_json()
    user = data["user"]
    service = data["service"]
    description = data["description"]
    ticket = {"user":user,"service":service,"description":description,}
    tickets.append(ticket)
    return jsonify({"message":"Ticket submitted successfully!"})

if __name__ == "__main__":
    app.run()