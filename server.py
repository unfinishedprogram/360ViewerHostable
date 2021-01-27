import tornado.ioloop
import tornado.web
import os

from datetime import datetime


dir_path = os.path.dirname(os.path.realpath(__file__))

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        print(f"{datetime.now()} Sending index to client")
        self.render('index.html')

class DevpageHandler(tornado.web.RequestHandler):

    def get(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        print(f"{datetime.now()} Sending devpage to client")
        self.render('newIndex.html')

handlers = [
    (r"/", MainHandler),
    (r"/dev", DevpageHandler)
]
settings = {
    'debug': True,
    'static_path': os.path.join(dir_path, "static")
}


def make_app():

    return tornado.web.Application(handlers, **settings)


if __name__ == "__main__":
    print('Server starting on port: 8004')
    app = make_app()
    app.listen(8004)
    tornado.ioloop.IOLoop.current().start()
