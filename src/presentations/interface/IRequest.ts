export interface IRequest {
    body?: any;
    files?: any;
    query?: any;
    params?: any;
    headers?: any;
    cookies?: any;
    args?: any;
    pagination?: {
      page: number;
      limit: number;
      offset?: number;
    };
    user?: any;
  }
  
  