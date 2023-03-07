const {
  DB_DEV,
  DB_HOST_DEV,
  DB_PORT_DEV,
  DB_USERNAME_DEV,
  DB_PASSWORD_DEV,
  PASS_SWAGGER,
  NODE_ENV,
  AWS_ACCESS,
  AWS_SECRET,
  AWS_NAMESPACE,
  EMAIL_SEND,
  PASS_SEND,
  JWT_SECRET,
  BUCKET_NAME,
  BUCKET_URI
} = process.env;

export default () => ({
    DB_DEV,
    DB_HOST_DEV,
    DB_PORT_DEV,
    DB_USERNAME_DEV,
    DB_PASSWORD_DEV,
    PASS_SWAGGER,
    NODE_ENV,
    AWS_ACCESS,
    AWS_SECRET,
    AWS_NAMESPACE,
    EMAIL_SEND,
    PASS_SEND,
    JWT_SECRET,
    BUCKET_NAME,
    BUCKET_URI
})