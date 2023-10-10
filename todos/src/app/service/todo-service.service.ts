import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../model/todo';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class TodoService {

  private todosUrl: string;

  constructor(private http: HttpClient) {
    this.todosUrl = 'http://localhost:8080/todos';
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public findAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl)
      .pipe(
        catchError((error: any) => {
          console.error('HTTP Error:', error);
          throw error; // Rethrow the error
        })
      );
  }

  public save(todo: Todo) {
    return this.http.post<Todo>(this.todosUrl, todo);
  }
}