from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session


# Configure application
app = Flask(__name__)


# Homepage - instructions for how to play
@app.route("/")
def index():
    return render_template("instructions.html")


# Two player game mode
@app.route("/pvp")
def pvp():
    return render_template("pvpgame.html")


# Single player game mode
@app.route("/pve")
def pve():
    return render_template("pvegame.html")


# About section
@app.route("/about")
def about():
    return render_template("about.html")
