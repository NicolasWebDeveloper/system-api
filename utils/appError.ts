export default class AppError extends Error {
  public status: 'fail' | 'internal server error';
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.status = String(this.statusCode).startsWith('5') ? 'internal server error' : 'fail';
  }
}
