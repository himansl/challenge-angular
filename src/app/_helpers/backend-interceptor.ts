import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
  HttpClient
} from '@angular/common/http';
import { of, throwError, Observable } from 'rxjs';
@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient) {}
  candidateObj = {
    candidates: [
      {
        id: 1,
        candidateId: 1,
        name: 'Himan',
        email: 'himan@abc.xyz',
        phone: 911234567890,
        experience: 4.5,
        photo: './assets/profile_pic_default.png',
        github: 'https://www.github.com/him123'
      }
    ]
  };

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // wrap in delayed observable to simulate server api call
    return this.handleRoute(request, next);
  }
  handleRoute(request, next) {
    const { url, method, headers, body } = request;
    switch (true) {
      case url.endsWith('/candidates') && method === 'GET':
        return this.getAllCandidates();
      // case url.endsWith('/candidates/:id') && method === 'Get':
      //   return getCandidateWithId();

      default:
        return next.handle(request);
    }
  }
  getAllCandidates() {
    let data = localStorage.getItem('candidatesData');
    if (data) return this.ok(data);
    else this.ok([]);
  }
  getCandidateWithId() {}

  ok(body?) {
    return of(new HttpResponse({ status: 200, body }));
  }

  error(message) {
    return throwError({ error: { message } });
  }
}
