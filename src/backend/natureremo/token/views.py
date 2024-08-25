from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from utils.replyformat import ReplyFormat
from utils.database import DB
import logging
import traceback

logger = logging.getLogger("django")

class GetTokenViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            data = DB.getData()
            return Response(
                ReplyFormat.status_200(data['natureremo']['token']),
                status=status.HTTP_200_OK
            )
        except KeyError:
            return Response(
                ReplyFormat.status_200(''),
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
            if request.data == '':
                raise Exception('Nature Remo token is empty.')
            data['natureremo']['token'] = request.data['data']
            DB.saveData(data)
            logger.info('Successed to register Nature Remo token.')
            return Response(
                ReplyFormat.status_200('Successed to register Nature Remo token.'),
                status=status.HTTP_200_OK
            )
        except:
            message = traceback.format_exc().splitlines()[-1]
            logger.error(traceback.format_exc())
            return Response(
                ReplyFormat.status_500(message),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
