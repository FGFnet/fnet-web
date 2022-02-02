#!/bin/sh

APP=/app
DATA=/data

mkdir -p $DATA/log $DATA/config $DATA/public/website

if [ ! -f "$DATA/config/secret.key" ]; then
    echo $(cat /dev/urandom | head -1 | md5sum | head -c 32) > "$DATA/config/secret.key"
fi

if [ ! -f "$DATA/public/website/favicon.ico" ]; then
    cp data/public/website/favicon.ico $DATA/public/website
fi

cd $APP

n=0
while [ $n -lt 2 ]
do
    python manage.py migrate --noinput &&
    python manage.py createsuperuser --noinput && 
    break
    n=$(($n+1))
    echo "Failed to migrate, going to retry..."
    sleep 3
done

exec supervisord -c /app/deploy/supervisord.conf
