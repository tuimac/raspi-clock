class ReplyFormat:
    @staticmethod
    def status_200(result) -> dict:
        return {
            'status_code': 200,
            'message': 'success',
            'result': str(result)
        }

    @staticmethod
    def status_404(message: str) -> dict:
        return {
            'status_code': 404,
            'message': message
        }

    @staticmethod
    def status_500(message: str) -> dict:
        return {
            'status_code': 500,
            'message': message
        }
