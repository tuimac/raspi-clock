#!/bin/bash

GITHUB_REPO_NAME='raspi-clock'
RUNNER_SCRIPT_DIR='/opt/github-runners/'${GITHUB_REPO_NAME}
SERVICE_NAME='github-runner_'${GITHUB_REPO_NAME}'.service'

[[ $USER != 'root' ]] && { echo 'Must be root!!'; exit 1; }

cat << EOF >> /etc/systemd/system/${SERVICE_NAME}
[Unit]
Description=Github Ruuner for $GITHUB_REPO_NAME
After=network.target

[Service]
Type=simple
ExecStart=$RUNNER_SCRIPT_DIR/run.sh
KillMode=process
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable $SERVICE_NAME
systemctl start $SERVICE_NAME