import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../service/todo-service.service'; // Update the service import
import { Todo } from '../model/todo'; // Update the model import

@Component({
  selector: 'app-todo-form', // Update the selector
  templateUrl: './todo-form.component.html', // Update the template URL
  styleUrls: ['./todo-form.component.css'] // Update the style URL
})
export class TodoFormComponent { // Update the class name

  todo: Todo; // Update the variable name

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private todoService: TodoService) { // Update the service name
    this.todo = new Todo(); // Update the model name
  }

  onSubmit() {
    this.todoService.save(this.todo).subscribe(result => this.gotoTodoList()); // Update the service name
  }

  gotoTodoList() {
    this.router.navigate(['/todos']); // Update the route
  }
}
