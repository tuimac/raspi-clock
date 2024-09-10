from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from utils.replyformat import ReplyFormat
import subprocess
import logging
import traceback

logger = logging.getLogger("django")

class CommandsViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def post(self, request, *args, **kwargs):
        try:
            if request.data == '':
                return Response(
                    ReplyFormat.status_400('Data is empty.'),
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                process = subprocess.run(request.data['commands'].split(' ') ,stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                if process.returncode == 0:
                    logger.info(process.stdout.decode())
                    return Response(
                        ReplyFormat.status_200(process.stdout.decode()),
                        status=status.HTTP_200_OK
                        )
                else:
                    logger.error(process.stderr.decode())
                    return Response(
                        ReplyFormat.status_500(process.stderr.decode()),
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
        except:
            message = traceback.format_exc().splitlines()[-1]
            logger.error(traceback.format_exc())
            return Response(
                ReplyFormat.status_500(message),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
