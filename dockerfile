FROM alpine:3.11
LABEL maintainer="Flavio Malvestiti Junior <flavio.malvestiti@outlook.com>"
RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN apk add --update nodejs nodejs-npm