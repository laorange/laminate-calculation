import json
import traceback

from flask import Flask
from flask import request
from flask_cors import CORS
from laminate import Laminate

app = Flask(__name__)
print("请不要关闭该窗口。请打开网页继续操作")
CORS(app, resources=r'/*')


# flask run
@app.route('/', methods=['GET', 'POST'])
def hello_world():
    if request.method == 'GET':
        return "服务端已就绪"
    try:
        print("request.form:", request.form)
        print("request.data:", request.data)
        data = json.loads(request.data)
        print("data", data)

        laminate = Laminate(**data)

        laminate_json = laminate.to_json()
        print(laminate_json)

        return laminate_json
    except Exception:
        return traceback.format_exc()


if __name__ == '__main__':
    app.run()
