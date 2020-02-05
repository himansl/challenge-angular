import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Candidate } from '../models/candidate';

export class Backend implements HttpInterceptor {
  candidates = [];

  intercept(request: HttpRequest<any>, handler: HttpHandler) {
    if (request.url.endsWith('candidates') && request.method === 'GET') {
      //Get all candidates
      return this.getAllCandidates();
    } else if (request.url.includes('candidate') && request.method === 'GET') {
      //Get single candidate
      const id = request.url.substring(request.url.lastIndexOf('/') + 1);
      return this.getCandidate(id);
    } else if (request.url.endsWith('candidate') && request.method == 'POST') {
      //Add a candidate
      return this.addCandidate(request.body);
    } else if (request.url.includes('candidate') && request.method === 'PUT') {
      //Update a candidate
      const id = request.url.substring(request.url.lastIndexOf('/') + 1);
      return this.updateCandidate(id, request.body);
    } else if (request.url.includes('candidate') && request.method === 'DELETE') {
      //Delete a candidate
      const id = request.url.substring(request.url.lastIndexOf('/') + 1);
      return this.deleteCandidate(id);
    } else {
      return throwError(
        new HttpErrorResponse({
          status: 400,
          error: 'Bad Request'
        })
      );
    }
  }

  addCandidate(data) {
    let id = 0;
    if (this.candidates.length > 0) id = this.candidates[this.candidates.length - 1].id + 1;
    this.candidates.push({ id: id, ...data });
    return of(
      new HttpResponse({
        status: 200,
        body: this.candidates[this.candidates.length - 1]
      })
    );
  }

  deleteCandidate(id) {
    const index = this.candidates.findIndex(x => id == x.id.toString());
    if (index == -1) {
      return throwError(
        new HttpErrorResponse({
          status: 401,
          error: 'The given resoource was not found'
        })
      );
    }
    this.candidates.splice(index, 1);
    return of(
      new HttpResponse({
        status: 200,
        body: id
      })
    );
  }

  updateCandidate(id, data) {
    const result = this.candidates.find(x => id == x.id.toString());
    if (!result)
      return throwError(
        new HttpErrorResponse({
          status: 404,
          error: {
            msg: 'Not Found'
          }
        })
      );

    const index = this.candidates.findIndex(x => id == x.id.toString());
    this.candidates.splice(index, 1);

    this.candidates.push({ id: id, ...data });
    return of(
      new HttpResponse({
        status: 200,
        body: { id: id, ...data }
      })
    );
  }

  getCandidate(id) {
    const result = this.candidates.find(x => id == x.id.toString());
    if (!result)
      return throwError(
        new HttpErrorResponse({
          status: 404,
          error: {
            msg: 'Not Found'
          }
        })
      );
    return of(
      new HttpResponse({
        status: 200,
        body: result
      })
    );
  }

  getAllCandidates() {
    return of(
      new HttpResponse({
        status: 200,
        body: this.candidates
      })
    );
  }
}
