import {LitElement, css, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import { Filter } from "./filter.enum.ts";
import {classMap} from "lit/directives/class-map.js";

@customElement('todo-app')
export class TodoApp extends LitElement {
  @state()
  todoList: any[] = [];

  @property()
  filterState: Filter = Filter.All;

  updateFilteredItems () {
      const filter = window.location.hash.split('#/')[1]
      this.filterState = filter as Filter;

      this.todoList = this.todoList.map((todo) => {
        const filter = window.location.hash.split('#/')[1];

        return {...todo, hidden: filter === Filter.Active && todo.checked || filter === Filter.Completed && !todo.checked};
      });
 }

  render() {
    this.updateFilteredItems();
    return html`
      <div class="c-layout">
        <h1 class="c-header">todos</h1>
        <todo-input @add=${this.addTodo}></todo-input>

        <div class="c-layout__window">
          <ul>
            ${this.todoList.map((todo, index) => html`
                <todo-item .value="${todo.name}" .index="${index}" @delete="${this.deleteTodo}" @edit="${this.editTodo}" class="${classMap({ hidden: todo.hidden })}"></todo-item>
            `)}
          </ul>

          <div class="c-bottom-info">
            <div>
              ${this.todoList.filter((todo) => !todo.checked).length} items left
            </div>
           
            <div>
                ${this.getFilterItem(Filter.All)}
                ${this.getFilterItem(Filter.Active)}
                ${this.getFilterItem(Filter.Completed)}
            </div>
  
            <div>
              <button @click="${this.clearCompleted}">Clear Completed</button>
            </div>
          </div>
        </div>
        <div>
    `;
  }

  clearCompleted() {
    this.todoList = this.todoList.filter((todo) => !todo.checked);
  }

  getFilterItem(filter: Filter) {
      const classes = { selected: this.filterState === filter };
      return html`<a class="${classMap(classes)}" href="#/${filter}" @click="${() =>  this.setFilter(filter)}">${filter}</a>`;
  }

  setFilter(filter: Filter) {
      debugger;
        this.filterState = filter;
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
        if(index === e.detail.index) {
          return { ...todo, checked: e.detail.checked };
        }
        return todo;
      });
    }

    if(e.detail.name) {
        this.todoList = this.todoList.map((todo, index) => {
            if(index === e.detail.index) {
                return {...todo, name: e.detail.name}
            }
            return todo;
        });
    }
  }

  static styles = css`
    :global {
      :focus-visible,:focus {
        box-shadow: inset 0 0 2px 2px #cf7d7d !important;
        outline: 0 !important;
      }
    }
    
      .hidden {
          display: none;
      }
      
      a.selected {
          border: solid 1px #ce4646;
          border-color: #ce4646;
      }
          
      ul {
          margin: 0;
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
