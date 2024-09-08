from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from utils.replyformat import ReplyFormat
from utils.database import DB
from utils.brightness import Brightness
import json
import logging
import traceback

logger = logging.getLogger("django")

class ConfigViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            return Response(
                ReplyFormat.status_200(json.dumps(DB.getData())),
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
            if request.data == '':
                return Response(
                    ReplyFormat.status_400('Data is empty.'),
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                DB.saveData(request.data)
                logger.info(f'Successed to register config.')
                return Response(
                    ReplyFormat.status_200(f'Successed to register config.'),
                    status=status.HTTP_200_OK
                )
        except:
            message = traceback.format_exc().splitlines()[-1]
            logger.error(traceback.format_exc())
            return Response(
                ReplyFormat.status_500(message),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class BrightnessConfigViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            return Response(
                ReplyFormat.status_200(Brightness.getBrightness()),
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
            if request.data == '':
                return Response(
                    ReplyFormat.status_400('Data is empty.'),
                    status=status.HTTP_400_BAD_REQUEST
                )
            else:
                Brightness.saveData(request.data)
                logger.info(f'Successed to register brightness.')
                return Response(
                    ReplyFormat.status_200(f'Successed to register brightness.'),
                    status=status.HTTP_200_OK
                )
        except:
            message = traceback.format_exc().splitlines()[-1]
            logger.error(traceback.format_exc())
            return Response(
                ReplyFormat.status_500(message),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )