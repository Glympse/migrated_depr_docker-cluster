# Installation

Docker Cluster can be installed via image available at Docker Hub.

## Host Discovery

Docker Cluster detects hosts via EC2 instance lookup. Instances with specified tag are added to the list.

## Environment Variables

The following environment variables are currently supported:

| Variable              | Presence | Description                   
| --------------------- | -------- | -----------------------------
| AWS_REGION            | required | AWS Region (e.g. "us-east-1")
| AWS_ACCESS_KEY_ID     | optional | AWS Access Key ID
| AWS_SECRET_ACCESS_KEY | optional | AWS Secret Access Key
| CLUSTER_TAG_NAME      | required | Cluster tag name
| CLUSTER_TAG_VALUE     | required | Cluster tag value

Either AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY or instance IAM role is required in order for the backend service
to be able to list EC2 instances.

CLUSTER_TAG_NAME amd CLUSTER_TAG_VALUE are used to filter instances based on a tag.

## Command Line

Docker Cluster can be launched locally or on remote machine using this command:

```bash
docker run -d \
  -p 8080:8080 \
  -e AWS_REGION=us-east-1 \
  -e AWS_ACCESS_KEY_ID=... \
  -e AWS_SECRET_ACCESS_KEY=... \
  -e CLUSTER_TAG_NAME=... \
  -e CLUSTER_TAG_VALUE=... \
  --name docker-cluster \
  glympse/docker-cluster:latest
```

## Docker Remote API

This installation method assumes that you already have a host with Docker API exposed:

```
curl --data ' \
{ \
  "Image": "glympse/docker-cluster:latest", \
  "Env": [ \
    "AWS_REGION=us-east-1", \
    "AWS_ACCESS_KEY_ID=...", \
    "AWS_SECRET_ACCESS_KEY=...", \
    "CLUSTER_TAG_NAME=...", \
    "CLUSTER_TAG_VALUE=..." \
  ], \
  "HostConfig": { \
    "PortBindings": { \
      "8080/tcp": [ \
        { \
          "HostPort": "8080" \
        } \
      ] \
    }, \
    "RestartPolicy": { \
      "Name": "always" \
    } \
  } \
}' http://$DOCKER_HOST/containers/create?name=docker-cluster
```

## Worker Node Setup

Docker Remote API endpoint must be exposed by the daemon in order for Docker Cluster to be able to interact with the host.

### Amazon Linux

The following script can be used to install and configure Docker daemon:

```bash
#!/bin/bash -ex

# Install updates
yum -y clean all
yum -y update

# Install docker
yum install docker -y
yum update docker -y
chkconfig docker on

# Configure docker deamon
echo OPTIONS=\"-H tcp://0.0.0.0:2375 -H unix:///var/run/docker.sock --api-cors-header=*\" > /etc/sysconfig/docker

# Start docker deamon
service docker start
```
