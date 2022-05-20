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
    try:
        app.run(port=8000)
        # app.run(host="0.0.0.0", port=80)
    except UnicodeDecodeError:
        print("非常抱歉，您的电脑名中包含ASCII码不能解析的字符(例如中文字符)，请在“控制面板-系统-关于”中修改电脑名为纯英文后重试。因为需要在本机开启后台，为您带来的不便，还请谅解！")
    except:
        import traceback
        print(traceback.format_exc())