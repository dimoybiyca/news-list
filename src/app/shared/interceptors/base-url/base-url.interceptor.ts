import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = environment.apiUrl;
  const blackList = ['../assets', 'http', 'https'];

  return blackList.some((url) => req.url.startsWith(url))
    ? next(req)
    : next(req.clone({ url: `${baseUrl}${req.url}` }));
};
