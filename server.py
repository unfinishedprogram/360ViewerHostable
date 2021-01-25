import tornado.ioloop
import tornado.web
import os

dir_path = os.path.dirname(os.path.realpath(__file__))

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('index.html')

class OtherPageHandler(tornado.web.RequestHandler):
    def get(self):
        self.render('otherpage.html')


handlers = [
    (r"/", MainHandler),
    (r"/otherpage", OtherPageHandler)
]
settings = {
    'debug': True,
    'static_path': os.path.join(dir_path, "static")
}


def make_app():
    return tornado.web.Application(handlers, **settings)


if __name__ == "__main__":
    print('Server starting on port: 8888')
    app = make_app()
    app.listen(8004)
    tornado.ioloop.IOLoop.current().start()
