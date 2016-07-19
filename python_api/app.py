import MySQLdb
import simplejson as json
from flask import Flask
from flask import g
from flask import request
from handler import DBMaster
from flask import current_app as app
from flask import jsonify
import logging

app=Flask(__name__)

@app.before_request
def db_connect():
    g.dbHandler=DBMaster()

@app.after_request
def db_disconnect(response):
     if hasattr(g,'dbHandler'):
            g.dbHandler.closeConnection()
     return response

@app.route('/search',methods=['POST'])
def search():
    req_json=request.get_json()
    result=g.dbHandler.search(req_json)
    return jsonify({"places":result})

@app.route('/post',methods=['POST'])
def post_details():
    req_json=request.get_json()
    result=g.dbHandler.postDetails(req_json)
    return jsonify({"post":result})

@app.route('/filter/list',methods=['POST'])
def filters():
    req_json=request.get_json()
    result=g.dbHandler.filters(req_json)
    return jsonify({"filter":result})

@app.route('/filter/results',methods=['POST'])
def filterResults():
    req_json=request.get_json()
    result=g.dbHandler.filterResults(req_json)
    return jsonify({"filter":result})

@app.route('/post/comment',methods=['POST'])
def postComment():
    req_json=request.get_json()
    result=g.dbHandler.postComment(req_json)
    return jsonify({"comment":result})

@app.route('/post/rating',methods=['POST'])
def postRating():
    req_json=request.get_json()
    result=g.dbHandler.postRating(req_json)
    return jsonify({"rating":result})

@app.route('/post/like_dislike',methods=['POST'])
def postLikeDislike():
    req_json=request.get_json()
    result=g.dbHandler.postLikeDislike(req_json)
    return jsonify({"like_dislike":result})

@app.route('/create/user',methods=['POST'])
def createUser():
    req_json=request.get_json()
    result=g.dbHandler.createUser(req_json)
    return jsonify({"user":result})

@app.route('/user/search',methods=['POST'])
def searchUser():
    req_json=request.get_json()
    result=g.dbHandler.searchUser(req_json)
    return jsonify({"user":result})

handler = logging.FileHandler('bh-api.log')
handler.setLevel(logging.WARNING)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
app.logger.addHandler(handler)


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True)
