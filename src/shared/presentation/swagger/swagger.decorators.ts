import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export const SwaggerOperation = (
  summary: string,
  description: string | null = null,
) => {
  return description
    ? ApiOperation({ summary: summary, description: description })
    : ApiOperation({ summary: summary });
};

export const SwaggerUnprocessableEntity = (message: string) => {
  return ApiUnprocessableEntityResponse({
    schema: {
      example: {
        message: message,
        error: 'Unprocessable Entity',
        statusCode: 422,
      },
    },
  });
};

export const SwaggerInternalServerError = () => {
  return ApiInternalServerErrorResponse({
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  });
};
