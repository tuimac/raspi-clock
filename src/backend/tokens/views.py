from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from utils.replyformat import ReplyFormat
from utils.database import DB
import logging
import traceback

logger = logging.getLogger("django")

class TokenManagerViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            data = DB.getData()
            if self.kwargs.get('path') == 'natureremo' or 'yahoo':
                token = data['token'][self.kwargs.get('path')]
                return Response(
                    ReplyFormat.status_200(token),
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    ReplyFormat.status_400('Invalid path.'),
                    status=status.HTTP_400_BAD_REQUEST
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
            if self.kwargs.get('path') == 'natureremo' or 'yahoo':
                if request.data == '':
                    return Response(
                        ReplyFormat.status_400('Data is empty.'),
                        status=status.HTTP_400_BAD_REQUEST
                    )
                else:
                    if not 'token' in data: data['token'] = {}
                    data['token'][self.kwargs.get('path')] = request.data['data']
                    DB.saveData(data)
                    logger.info(f'Successed to register {self.kwargs.get('path')} token.')
                    return Response(
                        ReplyFormat.status_200(f'Successed to register {self.kwargs.get('path')} token.'),
                        status=status.HTTP_200_OK
                    )
            else:
                return Response(
                    ReplyFormat.status_400('Invalid path.'),
                    status=status.HTTP_400_BAD_REQUEST
                )
        except:
            message = traceback.format_exc().splitlines()[-1]
            logger.error(traceback.format_exc())
            return Response(
                ReplyFormat.status_500(message),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
