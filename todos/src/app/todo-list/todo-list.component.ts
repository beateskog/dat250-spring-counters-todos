import { Component, OnInit } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos!: Todo[];

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
      this.loadTodos();
  }

  loadTodos() {
    this.todoService.findAll().subscribe(data => {
        this.todos = data;
    });
}

  deleteTodo(id: number) {
      this.todoService.delete(id).subscribe(data => {
          console.log(data);
          this.todoService.findAll().subscribe(data => {
              this.todos = data;
          });
      });
  }

  refreshTodos() {
    this.loadTodos(); // Reload todos when the "Refresh" button is clicked
}

}
