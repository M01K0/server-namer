import json
import logging
import tornado
import tornado.web
import tornado.options
import tornado.ioloop
import os
import server_name_generator


def abspath(folder):
	"""Gets abs path to static files"""
	path = os.path.realpath(__file__)
	directory = os.path.dirname(path)
	return "{}/{}".format(directory, folder)


idgen = 0
store = {}


class JsonWriter(tornado.web.RequestHandler):

	def _read_json(self):
		body = self.request.body
		try:
			logger.info("reading body: {}".format(body))
			return tornado.escape.json_decode(body)
		except ValueError:
			return None

	def _write(self, obj):
		obj = {} if not obj else obj
		self.set_header("Content-type", "application/json")
		self.write(json.dumps(obj))


class InMemoryUpdate(JsonWriter):

	def get(self, id=None):

		if id:
			out = self._get(id)
		else:
			out = self._get_all()

		self._write(out)

	def post(self, id=None):
		if id:
			return self.put(id)
		else:
			id = self._next_id()
			obj = self._read_json()
			if not obj:
				raise tornado.web.HTTPError(400, "no valid data provided")

			obj['id'] = id
			self._set(obj, id=id)
			self._write(obj)

	def _next_id(self):
		global idgen
		idgen += 1
		return idgen

	def put(self, id):
		existing = self._get(id)
		if not existing:
			return self._write(None)

		obj = self._read_json()
		if not obj:
			raise tornado.web.HTTPError(400, "no valid data provided")
		try:
			del obj['id']
		except KeyError:
			pass
		obj['id'] = int(id)
		self._write(self._set(obj, id))

	def delete(self, id):
		existing = self._get(id)
		try:
			global store
			del store[int(id)]
		except KeyError:
			pass
		self._write(existing)

	def _get(self, id):
		global store
		logging.info("getting {}".format(id))
		return store.get(int(id))

	def _get_all(self):
		global store
		return store.values()

	def _set(self, obj, id):
		global store
		store[int(id)] = obj
		logging.info("setting {} to {}".format(id, obj))
		return self._get(id)


class ServerName(JsonWriter):
	def get(self):
		self._write(
					{"name": server_name_generator.random_name()})


if __name__ == "__main__":

	app = tornado.web.Application([

		(r'/server-name/?', ServerName),
		(r'/store(?:/(?P<id>\d+))?/?', InMemoryUpdate),
		(r'/css/(.*)', tornado.web.StaticFileHandler, {'path': abspath("css")}),
		(r'/js/(.*)', tornado.web.StaticFileHandler, {'path': abspath("js")}),
		(r'/img/(.*)', tornado.web.StaticFileHandler, {'path': abspath("img")}),
		(r'/(.*)$', tornado.web.StaticFileHandler, {'path': abspath("html"), "default_filename": 'index.html'}),
		], **{
			'debug': True
		})

	app.listen(80, **{
			'xheaders': True,
	})

	tornado.options.parse_command_line()
	logger = logging.getLogger('tornado.application')
	logger.setLevel(logging.INFO)
	logger.addHandler(logging.StreamHandler())

	logger.info("starting tornado")
	tornado.ioloop.IOLoop.instance().start()
