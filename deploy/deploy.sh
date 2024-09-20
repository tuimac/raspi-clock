#!/bin/bash

SCRIPT_DIR=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)

function changeDir() {
    cd $SCRIPT_DIR
    cd ../docker/prod
}

function refreshGit() {
    git branch main
    git pull
}

function deploy() {
    BRANCH=$1 docker compose down --rmi all
    BRANCH=$1 docker compose up -d
    sudo cp ../../src/shutdown/shutdown-server.service /etc/systemd/system/shutdown-server.service
    sudo systemctl daemon-reload
    sudo systemctl stop shutdown-server.service
    sudo systemctl enable shutdown-server.service
    sudo systemctl start shutdown-server.service
}

function main() {
    changeDir
    refreshGit
    deploy $1
}

main $1