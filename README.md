# ppp-game
Adobe Animate - Cordova - webpack  - es6 - createjs project (Flash nostalgia project)

## How to run app
 -  install Cordova globally (https://cordova.apache.org/docs/en/10.x/guide/cli/index.html) ```npm install -g cordova```
 -  To run android builds you have to setup all the necessary according to the following instructions https://cordova.apache.org/docs/en/10.x/guide/platforms/android/index.html (Installing the Requirements section)
 -  ```yarn install``` in the project root
 -  Add necessary platforms ```cordova platform add android``` ```cordova platform add browser```
 -  In www/game execute ```yarn install```
 -  In www/game execute ```yarn start```
 -  When you change code you also need to publish ```index.fla``` (ctrl + enter in Adobe Animate)
 - To build apk run ```cordova build``` in the root project

