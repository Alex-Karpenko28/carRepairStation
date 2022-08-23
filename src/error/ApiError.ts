
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly name: string;
  public readonly message: string;
  constructor(name: string, statusCode: number, message?: string) {
      super(message);
      this.name = name;
      this.statusCode = statusCode;
      this.message = message;
  }
}