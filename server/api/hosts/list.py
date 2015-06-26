import api.rest

class Endpoint(api.rest.JsonRequestHandler):
    def handle(self, args):
        return [
            {
                "_id": "1",
                "name": "p-worker-c01",
                "network": {
                    "public_ip": "52.7.30.35",
                    "private_ip": "172.31.41.223"
                },
                "cloud": {
                    "provider": "aws",
                    "region": "us-east-1",
                    "zone": "c",
                    "instance_type": "t2.micro"
                },
                "docker": {
                    "protocol": "http",
                    "port": 2375
                },
                "tags": {
                    "cloud": "aws",
                    "region": "us-east-1",
                    "zone": "us-east-1c"
                }
            },
            {
                "_id": "2",
                "name": "p-worker-c02",
                "network": {
                    "public_ip": "52.7.137.138",
                    "private_ip": "172.31.35.242"
                },
                "cloud": {
                    "provider": "aws",
                    "region": "us-east-1",
                    "zone": "c",
                    "instance_type": "t2.micro"
                },
                "docker": {
                    "protocol": "http",
                    "port": 2375
                },
                "tags": {
                    "cloud": "aws",
                    "region": "us-east-1",
                    "zone": "us-east-1c"
                }
            },
            {
                "_id": "4",
                "name": "p-worker-c04",
                "network": {
                    "public_ip": "52.6.126.27",
                    "private_ip": "172.31.44.123"
                },
                "cloud": {
                    "provider": "aws",
                    "region": "us-east-1",
                    "zone": "c",
                    "instance_type": "t2.micro"
                },
                "docker": {
                    "protocol": "http",
                    "port": 2375
                },
                "tags": {
                    "cloud": "aws",
                    "region": "us-east-1",
                    "zone": "us-east-1c"
                }
            },
            {
                "_id": "5",
                "name": "p-worker-c05",
                "network": {
                    "public_ip": "52.7.88.227",
                    "private_ip": "172.31.36.9"
                },
                "cloud": {
                    "provider": "aws",
                    "region": "us-east-1",
                    "zone": "c",
                    "instance_type": "t2.micro"
                },
                "docker": {
                    "protocol": "http",
                    "port": 2375
                },
                "tags": {
                    "cloud": "aws",
                    "region": "us-east-1",
                    "zone": "us-east-1c"
                }
            },
            {
                "_id": "6",
                "name": "p-worker-c06",
                "network": {
                    "public_ip": "54.164.191.132",
                    "private_ip": "172.31.46.33"
                },
                "cloud": {
                    "provider": "aws",
                    "region": "us-east-1",
                    "zone": "c",
                    "instance_type": "t2.micro"
                },
                "docker": {
                    "protocol": "http",
                    "port": 2375
                },
                "tags": {
                    "cloud": "aws",
                    "region": "us-east-1",
                    "zone": "us-east-1c"
                }
            }
        ]
