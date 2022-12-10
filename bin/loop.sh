#!/bin/bash

node ./bot/game.js
# if the exit code is 1, restart the game

while [ $? -ne 0 ] ; do
    node ./bot/game.js
done
