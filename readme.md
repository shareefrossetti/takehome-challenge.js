# takehome-challenge.js

# Overview
This project contains a JavaScript script (takehome-challenge.js) that processes user and company data from JSON files (user.json and companies.json, respectively) and generates an output.txt file based on specific criteria. The script performs token top-ups for active users belonging to companies with an email status of true.

## How to Run the Script
Ensure you have Node.js installed on your machine.

Place the takehome-challenge.js script, user.json, and companies.json files in the same directory.

Open your terminal or command prompt and navigate to the directory containing the script and data files.

Run the following command to execute the script: `node challenge.js`

The script will process the data and generate the output.txt file in the same directory. The output will also be displayed in the console.

## Data Assumptions
The script assumes that the data in the JSON files (user.json and companies.json) is valid and correctly formatted.
Basic error handling is implemented to check if the files exist and are accessible.
