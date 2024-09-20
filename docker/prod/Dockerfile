FROM alpine:latest

WORKDIR /root

EXPOSE 80

ADD nginx.conf /etc/nginx/nginx.conf
ADD gunicorn.conf.py /etc/gunicorn/gunicorn.conf.py
ADD entrypoint.sh /root/entrypoint.sh
ADD frontend/ /root/frontend
ADD backend/ /root/backend

RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash icu-dev ncurses icu-libs python3 python3-dev py3-pip nginx tzdata sudo && \
    apk add --no-cache py3-django py3-django-rest-framework py3-django-filter py3-django-cors-headers py3-setuptools py3-gunicorn py3-requests py3-flask-cors py3-flask && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone && \
    apk del tzdata && \
    mkdir /var/log/gunicorn && \
    touch /var/log/gunicorn/access.log && \
    touch /var/log/gunicorn/error.log && \
    mkdir /var/log/raspi-clock && \
    touch /var/log/raspi-clock/main.log && \
    mkdir /opt/raspi_clock && \
	touch /opt/raspi_clock/data.json && \
    echo -en '\n\
echo -en "\e[1m\e[34m" \n\
cat << "EOF" \n\
\n\
    ____  ___   _____ ____  ____     ________    ____  ________ __\n\
   / __ \/   | / ___// __ \/  _/    / ____/ /   / __ \/ ____/ //_/\n\
  / /_/ / /| | \__ \/ /_/ // /_____/ /   / /   / / / / /   / ,<   \n\
 / _, _/ ___ |___/ / ____// /_____/ /___/ /___/ /_/ / /___/ /| |  \n\
/_/ |_/_/  |_/____/_/   /___/     \____/_____/\____/\____/_/ |_|  \n\
                                                                  
  \n\
EOF' >> /root/.bashrc

ENTRYPOINT /root/entrypoint.sh
