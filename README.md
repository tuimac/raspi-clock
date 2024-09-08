# Clock application on Raspberry Pi

Just simple web application for Raspberry Pi 4 clock project.

## Introduction
The reason to make this is simple, broken my clock on my table. Of course, I can buy another one but it's the chance to reuse my Raspberry Pi 4 on my toolbox...(Don't ask why)

## Installation
This is simple web application on Docker container. So you should bring those stuff below and do some installation and configuration below.

- **Buy these tools**
    - Raspberry Pi 4 (I bought 2core CPU, 2GB RAM)
    - SD(Secure Digital) card (Carefull speed class. Don't pick slow one...)
    - Smarticase SmartiPi Touch 2 (Little expensive...I thought)

- **Installation**
    - Write Ubuntu 24.04 LTS to your SD card
    - Install Docker and docker-compose to Ubuntu after booting Ubuntu 24.04 on your Raspberry Pi
    - Clone this project and do `docker-compose up -d -f docker/prod/docker-compose.yml`

## Authors

* **Kento Kashiwagi** - [tuimac](https://github.com/tuimac)

If you have some opinions and find bugs, please post [here](https://github.com/tuimac/raspi-clock/issues).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.