FROM alpine:latest

ENV WORK_DIR=/root
ENV PJT_NAME=raspi-clock
ENV BRANCH=develop

WORKDIR $WORK_DIR

EXPOSE 80

ADD nginx.conf.template /etc/nginx/conf.d/nginx.conf.template
ADD gunicorn.conf.py /etc/gunicorn/gunicorn.conf.py
ADD entrypoint.sh /root/entrypoint.sh

RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash git icu-dev ncurses icu-libs python3 python3-dev py3-pip nodejs npm curl tree nginx tzdata jq envsubst sudo openrc && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone && \
    apk del tzdata && \
    mkdir -p /etc/vim/backup && \
    mkdir -p /etc/vim/undo && \
    apk add --no-cache py3-django py3-django-rest-framework py3-django-filter py3-django-cors-headers py3-setuptools py3-gunicorn py3-requests && \
    curl -L https://raw.githubusercontent.com/tuimac/tools/master/vim/vimrc -o /etc/vim/vimrc && \
    curl -L https://raw.githubusercontent.com/tuimac/tools/master/linux/bashrc/.bashrc_node_docker -o /root/.bashrc && \
    curl -L https://raw.githubusercontent.com/tuimac/tools/master/git/setup.sh -o setup.sh && \
    chmod +x setup.sh && \
    mkdir -p /var/log/gunicorn && \
    touch /var/log/gunicorn/access.log && \
    touch /var/log/gunicorn/error.log && \
    mkdir -p /var/log/raspi-clock && \
    git clone -b ${BRANCH} https://github.com/tuimac/${PJT_NAME} && \
    cd ${WORK_DIR}/${PJT_NAME}/src/frontend && \
    npm ci

SHELL ["/bin/bash", "-c"]
ENTRYPOINT /root/entrypoint.sh ${WORK_DIR} ${PJT_NAME}
