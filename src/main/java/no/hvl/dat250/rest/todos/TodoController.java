package no.hvl.dat250.rest.todos;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.*;

/**
 * Rest-Endpoint for todos.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {

  public static final String TODO_WITH_THE_ID_X_NOT_FOUND = "Todo with the id %s not found!";
  private final AtomicLong idCounter = new AtomicLong();
  private List<Todo> todos = new ArrayList<>();


  @PostMapping("/todos")
  public Todo createTodo(@RequestBody Todo newTodo) {
    Todo todo = new Todo();
    Long generatedId = idCounter.incrementAndGet();
    todo.setDescription(newTodo.getDescription());
    todo.setSummary(newTodo.getSummary());
    todo.setId(generatedId);
    todos.add(todo);
    return todo;
  }

  @GetMapping("/todos/{id}")
  public Todo getTodoById(@PathVariable Long id) {
    for (Todo todo : todos) {
      if (todo.getId().equals(id)) {
        return todo;
      }
    }
    throw new NoSuchElementException(String.format(TODO_WITH_THE_ID_X_NOT_FOUND, id));
  }

  @GetMapping("/todos")
  public List<Todo> getTodos() {
    return todos;
  }

  @PutMapping("/todos/{id}")
  public Todo updateTodoById(@PathVariable Long id, @RequestBody Todo newTodo) {
    for (Todo todo : todos) {
      if (todo.getId().equals(id)) {
        todo.setDescription(newTodo.getDescription());
        todo.setSummary(newTodo.getSummary());
        return todo;
      }
    }
    throw new NoSuchElementException(String.format(TODO_WITH_THE_ID_X_NOT_FOUND, id));
  }

  @DeleteMapping("/todos/{id}")
  public Todo deleteTodoById(@PathVariable Long id) {
    for (Todo todo : todos) {
      if (todo.getId().equals(id)) {
        todos.remove(todo);
        return todo;
      }
    }
    throw new NoSuchElementException(String.format(TODO_WITH_THE_ID_X_NOT_FOUND, id));
  }

}
