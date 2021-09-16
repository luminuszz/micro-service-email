declare namespace Env {
  export interface Variables {
    NODE_ENV: string;

    DB_PORT: number;
    DB_USER: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;

    DATABASE_URL: string;

    MQ_URL: string;
    MQ_PASWORD: string;
    MQ_QUEUE: string;

    AWS_REGION: string;
    AWS_ACCESS_KEY: string;
    AWS_SECRET_KEY: string;
    API_VERSION: string;
    AUTH_EMAIL: string;
  }
}
