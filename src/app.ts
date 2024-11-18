import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('todo-app')
export class TodoApp extends LitElement {
  @state()
  todoList: any[] = [];

  render() {
    return html`
      <div class="c-layout">
        <h1>TODOS</h1>
        <todo-input @add=${this.addTodo}></todo-input>

        <div>
        ${this.todoList.length}
          <ul>
            ${this.todoList.map((todo) => html`<todo-item">A</todo-item> <br>`)}
          </ul>
          </div>
        <div>
    `;
  }

  addTodo(e: CustomEvent) {
    this.todoList = [...this.todoList, e.detail.name];
  }

  static styles = css`
    :host {
      width: 100%;
    }

    .c-layout {
      max-width: 300px;
      padding: 2rem;
      margin: auto;
      text-align: center;
      background: lightgrey;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-app': TodoApp;
  }
}
