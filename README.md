# Introduction

#Internet enabled Raspberry Pi fishing boat

Raspberry Pi in boat, which controls GPS, camera and the motors. Boat is steered and controlled from web ui.

## Boat software consists of three projects:
 - **BOAT**:  python program which handles steering, gps, camera and other stuff. https://github.com/ilkkaparssinen/raspifisherboat
 - **WEB UI**: Angular 2 based web client. This project contains the web client.
 - **SERVER**: node.js server gets boat information via websockets and passess them forward to clients. Websocket connection is used also to pass information from client to boat (steering & speed). node.js is in separate project https://github.com/ilkkaparssinen/fisherboat-server

## Full description of project:
  
  Look from: https://github.com/ilkkaparssinen/raspifisherboat
 
## Web client features:
 - Speed and direction control of the boat
 - Multiple simultanous drivers (server acts as a publish & subscribe server, so everybody is in sync)
 - Real time video
 - Click the video screen and request for full res photo from boat
 - Set up different fishing programs / turn music on / off
 - Real time chat with other drivers and show notifications from the boat
 - Google maps - show location, direction and speed of the boat
 - Implemented with Angular 2 beta (things have changed in Angular 2 since that, and this was a learning project for me for Angular 2 - the software is ..uh.. not very stylish).
 
## Project structure
  - This project is based on angular seed project: https://github.com/mgechev/angular2-seed. It is definitely a overkill for project of this size, but I needed to learn it, so there is a lot of unnecessary stuff.
  - I don't recommend the use of this project directly - Angular 2 has taken leaps since the creation of this project.


