import { HttpException, HttpStatus } from '@nestjs/common';

export function CustomError(
  message: string,
  status: HttpStatus = HttpStatus.BAD_REQUEST,
): never {
  throw new HttpException(message, status);
}
