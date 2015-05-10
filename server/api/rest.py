import json
import tornado
import tornado.web

"""
Implements JSON encoding and JSONP on top of tornado.web.RequestHandler.
"""
class JsonRequestHandler(tornado.web.RequestHandler):

    @tornado.web.asynchronous
    def get(self, **args):
        self.process(args)

    @tornado.web.asynchronous
    def post(self, **args):
        self.process(args)

    @tornado.web.asynchronous
    def options(self, **args):
        self.set_header("Access-Control-Allow-Methods",
            self.request.headers.get("Access-Control-Request-Methods", default="*"))
        self.set_header("Access-Control-Allow-Headers",
            self.request.headers.get("Access-Control-Request-Headers", default="*"))
        self.set_header("Content-Type", "text/html; charset=utf-8")
        self.finish()

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def process(self, args):
        # Handle the call
        try:
            # Handle authentication
            self.handle_auth()

            # Propagate to business logic
            response = { "result": "ok", "body": self.handle(args) }
        except NameError as e:
            response = { "result": "failure", "error": e.message }
        except:
            response = { "result": "failure" }

        # Serialize response to JSON.
        try:
            output = json.dumps(response)
        except:
            output = '{ "result": "failure", "error": "serialization" }'

        # See if JSONP response is expected by the caller.
        callback = self.get_argument("callback", None)
        if callback:
            self.set_header("Content-Type", "application/javascript")
            output = callback + "(" + output + ")"
        else:
            self.set_header("Content-Type", "application/json")

        # Send the response.
        self.write(output)
        self.finish()

    def handle_auth(self):
        pass

    def handle(self, args):
        pass

"""
Provides skeleton of authenticated endpoint.
"""
class ApiHandler(JsonRequestHandler):

    def initialize(self, manager):
        self.manager = manager

    def handle_auth(self):
        try:
            if self.manager.env.get("API_IMPORT_SECRET") != self.get_argument("secret"):
                raise()
        except:
            raise NameError("invalid_token")

"""
Provided to prevent dyno from sleeping.
"""
class AwakeEndpoint(JsonRequestHandler):

    def handle(self, args):
        return {}
