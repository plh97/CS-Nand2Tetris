FROM python

COPY . /root/app

WORKDIR /root/app

ADD requirements.txt /



CMD [ "python ctypes.py" ]