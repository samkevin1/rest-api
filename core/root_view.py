from rest_framework.response import Response


def success(self, message, data, total):
    return {
        success: True,
        self.__message: message,
        self.__data: data,
        self.__total: total
    }


def not_found(self, message, data):
    return {
        success: False,
        self.__message: message,
        self.__data: []
    }


def already_exists(self, message, data):
    return {
        success: False,
        self.__message: message,
        self.__data: []
    }


def exception_has_occurred(self, message):
    # será necessário criar um lógica aqui para armazenar a variável text em uma tabela para log de erros.
    message = 'Ocorreu um erro no servidor, contate o administrador.'
    return message