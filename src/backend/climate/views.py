from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from utils.replyformat import ReplyFormat
from utils.database import DB
import logging
import traceback
import urllib3

logger = logging.getLogger("django")

class ClimateAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            data = DB.getData()
            http = urllib3.PoolManager()
            url = f'https://map.yahooapis.jp/weather/V1/place?coordinates={data['climate']['longitude']},{data['climate']['latitude']}&appid={data['token']['yahoo']}&output=json'
            result = http.request('GET', url)
            return Response(
                ReplyFormat.status_200(result.data.decode()),
                status=status.HTTP_200_OK
            )
        except:
            message = traceback.format_exc().splitlines()[-1]
            logger.error(traceback.format_exc())
            return Response(
                ReplyFormat.status_500(message),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ClimateConfigViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            data = DB.getData()
            coordinate = data['climate']['coordinate']
            return Response(
                ReplyFormat.status_200(coordinate),
                status=status.HTTP_200_OK
            )
        except KeyError:
            return Response(
                ReplyFormat.status_200({
                    'latitude': '',
                    'longitude': ''
                }),
                status=status.HTTP_200_OK
            )
        except:
            message = traceback.format_exc().splitlines()[-1]
            logger.error(traceback.format_exc())
            return Response(
                ReplyFormat.status_500(message),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request, *args, **kwargs):
        try:
            data = DB.getData()
            logger.info(request.data)
            if request.data == '':
                return Response(
                    ReplyFormat.status_400('Data is empty.'),
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                if 'coordinate' in data: data['climate']['coordinate'] = {}
                data['climate']['coordinate'] = {
                    'latitude': request.data['latitude'],
                    'longitude': request.data['longitude']
                }
                logger.info('Successed to register coordinate.')
                return Response(
                    ReplyFormat.status_200('Successed to register coordinate.'),
                    status=status.HTTP_200_OK
                )
        except:
            message = traceback.format_exc().splitlines()[-1]
            logger.error(traceback.format_exc())
            return Response(
                ReplyFormat.status_500(message),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
