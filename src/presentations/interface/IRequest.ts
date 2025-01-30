export interface IRequest {
    body?: any;
    files?: any;
    query?: any;
    params?: any;
    headers?: any;
    cookies?: any;
    args?: any;
    ip?: any
    userAgent?: any;
    pagination?: {
      page: number;
      limit: number;
      pageSize: number;
      offset?: number;
    };
    user?: any;
  }
  
  