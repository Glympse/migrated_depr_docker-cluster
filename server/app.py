import os
import tornado.web
import server.utilities

import server.api.hosts.list

root = os.path.dirname(os.path.realpath(__file__))

class ConsoleIndexHandler(tornado.web.RequestHandler):
    def get(self):
        self.render(root + "/../client/src/index.html")

app = tornado.web.Application([
    (r'/api/1/hosts/list', server.api.hosts.list.Endpoint),
    (r'/', ConsoleIndexHandler),
    (r'/(.*)', tornado.web.StaticFileHandler, {'path': root + "/../client/src/"})
])

if __name__ == '__main__':    
    server = server.utilities.TornadoServer(app, 8080)
    server.start()
