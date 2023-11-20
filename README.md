# KCF-ASSIGNMENT

# About Project
Here we will able to see the two folder's

1. Client - Having all frontend codes

2. Server - Having all Backend codes

# How to run the App



First we will run the frontend, below are the commands to run React-Native App

```bash

cd Client

npm install

npx react-native 

npx react-native run-android

```
Once you run the frontend code, below are the commands to run the backend server

```bash

adb reverse tcp:8080 tcp:8080  

cd server

npm install

node index.js

```