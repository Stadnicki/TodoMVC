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

        <div class="c-layout__window">
<!--          To powinno byc listą-->
          <div>
            ${this.todoList.map((todo, index) => html`
                <todo-item .value="${todo.name}" .index="${index}" @delete="${this.deleteTodo}" @edit="${this.editTodo}"></todo-item>
            `)}
          </div>

          <div class="c-bottom-info">
            <div>
              ${this.todoList.filter((todo) => !todo.checked).length} items left
            </div>
           
            <div>
              <button>All</button>
              <button>Active</button>
              <button>Completed</button>
            </div>
  
            <div>
              <button>Clear Completed</button>
            </div>
          </div>
        </div>
        <div>
    `;
  }

  addTodo(e: CustomEvent) {
    this.todoList = [...this.todoList, e.detail];
  }

  deleteTodo(e: CustomEvent) {
    this.todoList = [...this.todoList.filter((_, index) => index !== e.detail.index)];
  }

  editTodo(e: CustomEvent) {
    if(e.detail.checked) {
      this.todoList = this.todoList.map((todo, index) => {
        debugger;
        if(index === e.detail.index) {
          return { ...todo, checked: e.detail.checked };
        }
        return todo;
      });

      debugger;
    }

    if(e.detail.name) {
        this.todoList = this.todoList.map((todo, index) => {
            if(index === e.detail.index) {
                return e.detail.name;
            }
            return todo;
        });
    }
    debugger;
  }

  static styles = css`
    :global {
      :focus-visible,:focus {
        box-shadow: inset 0 0 2px 2px #cf7d7d !important;
        outline: 0 !important;
      }
    }
    
    :host {
      width: 100%;
    }

    :focus-visible,:focus {
      box-shadow: inset 0 0 2px 2px #cf7d7d !important;
      outline: 0 !important;
    }

    ul {
      list-style-type: none;
      padding-inline-start: 0;
    }
    
    .c-header {
      font-size: 80px;
      font-weight: 200;
      color: #b83f45;
      margin-top: 0;
      margin-bottom: 36px;
      line-height: 60px;
    }
    
    .c-layout {
      min-width: 230px;
      max-width: 550px;
      padding: 2rem;
      margin: auto;
      text-align: center;
    }
    
    .c-bottom-info {
      display: flex;
      height: 20px;
      padding: 10px 15px;
      justify-content: space-between;
      background: white;
      
      box-shadow: 
          rgba(0, 0, 0, 0.2) 0 1px 1px, white 0 8px 0 -3px,
          rgba(0, 0, 0, 0.2) 0 9px 1px -3px, white 0 16px 0 -6px,
          rgba(0, 0, 0, 0.2) 0 17px 2px -6px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-app': TodoApp;
  }
}
