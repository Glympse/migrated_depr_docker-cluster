import server.api.rest

class Endpoint(server.api.rest.JsonRequestHandler):
    def handle(self, args):
        return [
            {
                "_id": "1",
                "name": "p-worker-c01",
                "network": {
                    "public_dns": "ec2-52-7-30-35.compute-1.amazonaws.com",
                    "public_ip": "52.7.30.35"
                },
                "cloud": {
                    "provider": "aws",
                    "region": "us-east-1",
                    "zone": "c",
                    "instance_type": "t2.micro",
                    "instance_id": "i-6d83e0bb"
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
                    "public_dns": "ec2-52-7-137-138.compute-1.amazonaws.com",
                    "public_ip": "52.7.137.138"
                },
                "cloud": {
                    "provider": "aws",
                    "region": "us-east-1",
                    "zone": "c",
                    "instance_type": "t2.micro",
                    "instance_id": "i-84debc52"
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
                "_id": "3",
                "name": "p-worker-c03",
                "network": {
                    "public_dns": "ec2-52-7-48-222.compute-1.amazonaws.com",
                    "public_ip": "52.7.48.222"
                },
                "cloud": {
                    "provider": "aws",
                    "region": "us-east-1",
                    "zone": "c",
                    "instance_type": "t2.micro",
                    "instance_id": "i-ffd8b029"
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
