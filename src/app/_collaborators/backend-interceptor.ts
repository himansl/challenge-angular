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
      case url.endsWith('/candidate') && method === 'POST':
        return this.getCandidateWithId(body);
      case url.endsWith('/new-candidate') && method === 'POST':
        return this.addNewCandidate(body);
      default:
        return next.handle(request);
    }
  }

  getAllCandidates() {
    let data = JSON.parse(localStorage.getItem('candidatesData'));
    if (data) return this.ok(data);
    else {
      localStorage.setItem(
        'candidatesData',
        JSON.stringify(this.candidateObj['candidates'])
      );
      this.getAllCandidates();
    }
  }

  getCandidateWithId({ id }) {
    let output;
    let data = JSON.parse(localStorage.getItem('candidatesData'));
    data.forEach(el => {
      if (el['id'] == id) {
        output = el;
      }
    });
    if (output) return this.ok(output);
    else return this.error('Error occured');
  }

  ok(body?) {
    return of(new HttpResponse({ status: 200, body }));
  }

  error(message) {
    return throwError({ error: { message } });
  }

  addNewCandidate({ value }) {
    if (value) {
      let data = JSON.parse(localStorage.getItem('candidatesData'));
      data.push(this.getModifiedObj(value, data.length + 1));
      localStorage.setItem('candidatesData', JSON.stringify(data));
      return this.ok(data);
    } else return this.error('Invalid request');
  }

  getModifiedObj(value, id) {
    return {
      id: id,
      candidateId: id,
      name: value['name'],
      email: value['email'],
      code: value['code'],
      phone: value['phone'],
      experience: value['experience'],
      photo: value['photo'],
      github: value['github']
    };
  }
}
