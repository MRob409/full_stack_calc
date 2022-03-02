from flask import Flask
from flask_restful import Resource, Api, reqparse
import json

app = Flask(__name__)
api = Api(app)


# /equation will be endpoint for equation
class Equation(Resource):

    def get(self):
        # reads json file
        with open('data/equation.json', 'r') as f:
            data = json.load(f)

        return data

    def post(self):
        # sets arguments that can be parsed
        parser = reqparse.RequestParser()
        parser.add_argument('equation', required=True, type=list)
        args = parser.parse_args()

        # reads json file
        with open('data/equation.json', 'r') as f:
            data = json.load(f)

        if args['equation'] == data['equation']:
            # if equation is identical
            return {
                'message': f"{args['equation']} equation is identical"
            }, 409
        else:
            # adds new equation
            with open('data/equation.json', 'r+') as f:
                data = json.load(f)
                data['equation'] = args['equation']
                f.seek(0)
                json.dump(data, f)
                f.truncate()
            return data

# maps Equation class to location /equation
api.add_resource(Equation, '/equation')


if __name__ == '__main__':
    app.run(debug=True)