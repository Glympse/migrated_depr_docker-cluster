import api.rest

class Endpoint(api.rest.JsonRequestHandler):
    def handle(self, args):
        try:
            tag_name = self.manager.env.get("CLUSTER_TAG_NAME")
            tag_value = self.manager.env.get("CLUSTER_TAG_VALUE")
            compute_instances = self.manager.provider.find_instances_by_tag(tag_name, tag_value)

            instances = []
            for compute_instance in compute_instances:
                if "running" != compute_instance.state:
                    continue
                instance = {
                    "_id": compute_instance.id,
                    "name": compute_instance.tags["Name"],
                    "network": {
                        "public_ip": compute_instance.ip_address,
                        "private_ip": compute_instance.private_ip_address
                    },
                    "cloud": {
                        "provider": "aws",
                        "region": compute_instance.region.name,
                        "zone": compute_instance.placement,
                        "instance_type": compute_instance.instance_type
                    },
                    "docker": {
                        "protocol": "http",
                        "port": 2375
                    },
                    "tags": {
                        "cloud": "aws",
                        "region": compute_instance.region.name,
                        "zone": compute_instance.placement
                    }
                }
                instances.append(instance)

            return instances
        except Exception as e:
            raise NameError("failed_to_find")
