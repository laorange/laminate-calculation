import json
import traceback
from typing import List, Dict

from flask import Flask
from flask import request, render_template
from flask_cors import CORS
from laminate import Laminate, LayerInfo

app = Flask(__name__)
print("请不要关闭该窗口。请打开网页继续操作")
CORS(app, resources=r'/*')


# flask run
@app.route('/', methods=['GET', 'POST'])
def hello_world():
    if request.method == 'GET':
        return render_template('index.html')
    try:
        print("request.form:", request.form.to_dict())
        print("request.data:", request.data)
        print("request.get_data:", request.get_data())
        print("request.get_json:", request.get_json())
        try:
            strLayerInfoList = request.form.get('layerInfoList')
            rawLayerInfoList: List[Dict] = json.loads(strLayerInfoList)
        except Exception as e:
            rawLayerInfoList: List[Dict] = json.loads(request.get_json().get('layerInfoList'))
        print("rawLayerInfoList", rawLayerInfoList)
        laminate = Laminate([LayerInfo(**rawLayerInfo) for rawLayerInfo in rawLayerInfoList])
        laminate_json = laminate.to_json()

        return laminate_json
    except Exception as e:
        print(traceback.format_exc())
        print(e)
        return f'Traceback: {e}'


if __name__ == '__main__':
    app.run(port=8000)
    # app.run(host="0.0.0.0", port=80)
