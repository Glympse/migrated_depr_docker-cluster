import os
import tornado.web
import utilities

import api.hosts.list

root = os.path.dirname(os.path.realpath(__file__))

class ConsoleIndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render(root + "/../client/src/index.html")

app = tornado.web.Application([
    (r'/api/1/hosts/list', api.hosts.list.Endpoint),
    (r'/', ConsoleIndexHandler),
    (r'/(.*)', tornado.web.StaticFileHandler, {'path': root + "/../client/src/"})
])

if __name__ == '__main__':    
    server = utilities.TornadoServer(app, 8080)
    server.start()
