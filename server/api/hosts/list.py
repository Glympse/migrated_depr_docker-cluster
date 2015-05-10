import server.api.rest

class Endpoint(server.api.rest.JsonRequestHandler):
    def handle(self, args):
        return [
            {
                "_id": "123",
                "name": "p-worker-c01",
                "network": {
                    "public_dns": "ec2-52-7-21-20.compute-1.amazonaws.com",
                    "public_ip": "52.7.21.20"
                },
                "cloud": {
                    "provider": "aws",
                    "region": "us-east-1",
                    "zone": "c",
                    "instance_type": "t2.micro",
                    "instance_id": "i-fc43d72a"
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
                "_id": "124",
                "name": "p-worker-c02",
                "network": {
                    "public_dns": "ec2-52-7-120-24.compute-1.amazonaws.com",
                    "public_ip": "52.7.120.24"
                },
                "cloud": {
                    "provider": "aws",
                    "region": "us-east-1",
                    "zone": "c",
                    "instance_type": "t2.micro",
                    "instance_id": "i-f34cd825"
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
