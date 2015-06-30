import boto.ec2

class Provider:

    def __init__(self, region):
        self.region = region
        self.conn = boto.ec2.connect_to_region(region)

    def find_instances_by_tag(self, key, value):
        reservations = self.conn.get_all_instances( filters={ "tag:" + key: value } )
        instances = [index for reservation in reservations for index in reservation.instances]
        return instances
