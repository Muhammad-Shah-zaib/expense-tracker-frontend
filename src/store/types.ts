/*
 * this interface should be implemented
 * in all the response dtos, since it is
 * base in the api response DTO
 */
export interface IResponse {
  statusCode: number;
  message: string;
  errors: string[];
}
