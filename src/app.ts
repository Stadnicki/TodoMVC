import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('todo-app')
export class TodoApp extends LitElement {
  @state()
  todoList: any[] = [];

  render() {
    return html`
      <div class="c-layout">
        <h1 class="c-header">todos</h1>
        <todo-input @add=${this.addTodo}></todo-input>

        <div>
        ${this.todoList.length}
          <ul>
            ${this.todoList.map((todo, index) => html`
              <todo-item .value="${todo}" .index="${index}" @delete="${this.deleteTodo}"></todo-item>
            `)}
          </ul>
          </div>
        <div>
          <div class="c-bottom-info">
            
          </div>
    `;
  }

  addTodo(e: CustomEvent) {
    this.todoList = [...this.todoList, e.detail.name];
  }

  deleteTodo(e: CustomEvent) {
    this.todoList = [...this.todoList.filter((_, index) => index !== e.detail.index)];
  }

  static styles = css`
    :host {
      width: 100%;
    }

    .c-header {
      font-size: 80px;
      font-weight: 200;
      color: #b83f45;
      margin-top: 0;
      line-height: 60px;
    }
    
    .c-layout {
      max-width: 400px;
      padding: 2rem;
      margin: auto;
      text-align: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-app': TodoApp;
  }
}
