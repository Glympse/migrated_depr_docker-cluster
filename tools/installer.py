import argparse
import requests
import server.utilities

class Installer:

    def do(self):
        try:
            self.init()
            self.find_container()
            self.create_image()
            if self.container_id:
                self.stop_container()
                self.remove_container()
            self.create_container()
            self.start_container()
        except:
            pass

    def init(self):
        try:
            parser = argparse.ArgumentParser()
            parser.add_argument("--env", dest="env", required=False, metavar="E", help="Env vars file", default=None)
            parser.add_argument("--verbose", dest="verbose", nargs='?', required=False, type=bool, const=True, default=False, help="Verbose output")
            self.args = parser.parse_args()

            self.env = server.utilities.Env(self.args.env)
            self.host = self.env.get("DOCKER_HOST")
            self.container_name = self.env.get("CONTAINER_NAME")
        except:
            raise Exception()

    def find_container(self):
        try:
            params = { "all": "true" }
            request = requests.get(self.host + "/containers/json?all=true", params=params)
            self.check(request)
            self.containers = request.json()
            self.container = None
            self.container_id = None
            for container in self.containers:
                for name in container["Names"]:
                    if -1 != name.find(self.container_name):
                        self.container = container
                        self.container_id = self.container["Id"]
                        break
                if self.container:
                    break
        except:
            raise Exception()

    def create_image(self):
        try:
            params = { "fromImage": self.env.get("REGISTRY_IMAGE") }
            headers = { "X-Registry-Auth": self.env.get("REGISTRY_AUTH") }
            request = requests.post(self.host + "/images/create", params=params, headers=headers)
            self.check(request)
        except:
            raise Exception()

    def stop_container(self):
        try:
            request = requests.post(self.host + "/containers/" + self.container_id + "/stop")
            self.check(request)
        except:
            raise Exception()

    def remove_container(self):
        try:
            request = requests.delete(self.host + "/containers/" + self.container_id)
            self.check(request)
        except:
            raise Exception()

    def create_container(self):
        try:
            params = { "name": self.container_name }
            data = server.utilities.File.read_json(self.env.get("CONTAINER_CONFIG"))
            data["Image"] = self.env.get("REGISTRY_IMAGE")
            request = requests.post(self.host + "/containers/create", params=params, json=data)
            self.check(request)
            self.container = request.json()
            self.container_id = self.container["Id"]
        except:
            raise Exception()

    def start_container(self):
        try:
            request = requests.post(self.host + "/containers/" + self.container_id + "/start")
            self.check(request)
        except:
            raise Exception()

    def check(self, request):
        success = ( request.status_code >= 200 and request.status_code < 300 )
        print(( "[OK] " if success else "[FAILED]" ) + request.url)
        if self.args.verbose:
            print(request.text)
        if not success:
            raise Exception()
