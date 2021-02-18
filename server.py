import tornado.ioloop
import tornado.web
import os
import uuid

from tornado import web

import database
from datetime import datetime


dir_path = os.path.dirname(os.path.realpath(__file__))

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        print(f"{datetime.now()} Sending index to client")
        self.render('index.html')

class DevpageHandler(tornado.web.RequestHandler):
    def get(self):
        print(f"{datetime.now()} Sending devpage to client")
        self.render('newIndex.html')

class UploadPageHandler(tornado.web.RequestHandler):
    def get(self):
        print(f"{datetime.now()} Sending upload page to client")
        self.render('uploadToServer.html')

class UploadHandler(tornado.web.RequestHandler):
    def post(self):
        print(f"{datetime.now()} Client requesting upload")

        print(self.request.files.keys())

        file1 = self.request.files['myfile'][0]
        print(file1.content_type)
        try:
            extension = database.getFileExtension(file1)
            print(extension)
        except:
            print("error failed to get extension")


        file_uuid = database.writeFileToDisk(file1)


        self.finish(f"file is uploaded, you can view it here: <a href='/view_pano/{file_uuid}{extension}'>{file_uuid}</a>")

class PanoViewHandler(tornado.web.RequestHandler):
    def get(self, key):
        print("fetching:", key, "for viewing as a panorama")
        self.render('single360viewer.html', image=f"/view/{key}")

handlers = [
    (r"/", IndexHandler),
    (r"/dev", DevpageHandler),
    (r"/view/(.*)", web.StaticFileHandler, {"path": "./uploaded_files"}),
    (r"/view_pano/(.*)", PanoViewHandler),
    (r"/upload_page", UploadPageHandler),
    (r"/upload", UploadHandler)
]

settings = {
    'debug': True,
    'static_path': os.path.join(dir_path, "static"),
    'media_root': os.path.join(dir_path, "media")
}

def make_app():
    return tornado.web.Application(handlers, **settings)

if __name__ == "__main__":
    print('Server starting on port: 8004')
    app = make_app()
    app.listen(8004)
    tornado.ioloop.IOLoop.current().start()