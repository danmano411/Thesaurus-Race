# Thesaurus Race

## About

This project is based on the hit game Wiki race, where players try to go from one word to another using only synonyms and antonyms. 
In the future, this project will contain capabilities such as multiplayer mode, account logins, a best path finder, and proper difficulty adjustment.
This projects current state is functional but nowhere near finished. Feel free to run the code and try out the preliminary capabilities.
The words and definitions are scraped from [https://www.thesaurus.com/](thesaurus.com).

## Setup
Navigate to the `app` directory and run the command:
### `npm start` 

Then, navigate to the `server` directory and run:
### `python server.py`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

With that both the frontend environment and server should be running.

## Controls
Navigation from word to word is as simple as clicking the word you would like to navigate to.
The left panel will show different definitions of a word that you can click and jump to that definition.
**Be sure you know what word you are going to by opening the path window (Right ALT)**

Left CTRL - Toggles between synonyms and antonyms

Right ALT - Shows the "path" aka the goal word you must reach (must be exact word)

Right CTRL - Resets the game with two different words (try resetting until you get an achievable word)

When you win, a win screen will pop up with your start and end words, your path, your time, and the difficulty (default normal).

The Search bar is for testing only, but feel free to use it to search for any word.

## Project Stack

### Frontend 
React js, Tailwind CSS

### Middleware and Backend
Flask

### Upcoming
Material UI
.NET
Azure SQL Database
