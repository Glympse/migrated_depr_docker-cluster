#!/bin/sh

# App name
IMAGE_NAME=glympse/docker-cluster
LATEST_IMAGE=$IMAGE_NAME:latest

# Build the image
docker build -t $IMAGE_NAME .

# Mark image with registry URL and tag
docker tag -f $IMAGE_NAME $LATEST_IMAGE

# Push image to repote registry
docker push $LATEST_IMAGE
