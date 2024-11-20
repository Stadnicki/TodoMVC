import {LitElement, css, html} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {Filter} from "./filter.enum.ts";
import {classMap} from "lit/directives/class-map.js";
import {Todo} from "./components/todo.type.ts";

@customElement('todo-app')
export class TodoApp extends LitElement {
    @state()
    todoList: Todo[] = [];

    @property()
    filterState: Filter = Filter.All;


    firstUpdated() {
        this.updateFilteredItems();

        addEventListener("hashchange", () => {
            this.updateFilteredItems();
        });
    }

    updateFilteredItems() {
        const filter = window.location.hash.split('#/')[1]
        this.filterState = filter as Filter;

        this.todoList = this.todoList.map((todo) => {
            const filter = window.location.hash.split('#/')[1];

            return {
                ...todo,
                hidden: filter === Filter.Active && todo.checked || filter === Filter.Completed && !todo.checked
            };
        });
    }

    render() {
        return html`
            <h1 class="c-header">todos</h1>
            <div class="c-layout">
                <div class="c-mark-container${classMap({hidden: !this.todoList.length})}">
                    <button class="c-mark" @click="${this.toggleAll}">❯</button>
                </div>
                <todo-input @add=${this.addTodo}></todo-input>

                <div class="c-layout__window">
                    <ul>
                        ${this.todoList.map((todo, index) => html`
                            <todo-item .value="${todo.name}" .checked="${todo.checked}" .index="${index}"
                                       @delete="${this.deleteTodo}"
                                       @edit="${this.editTodo}" class="${classMap({hidden: todo.hidden})}"></todo-item>
                        `)}
                    </ul>

                    <div class="c-bottom-info${classMap({hidden: !this.todoList.length})}">
                        <div>
                            ${this.todoList.filter((todo) => !todo.checked).length} items left
                        </div>

                        <div class="c-filters">
                            ${this.getFilterItem(Filter.All)}
                            ${this.getFilterItem(Filter.Active)}
                            ${this.getFilterItem(Filter.Completed)}
                        </div>
                        
                        <button class="c-clear${classMap({hidden: this.todoList.every(todo => !todo.checked)})}" @click="${this.clearCompleted}">Clear Completed</button>
                    </div>
                </div>
            <div>
        `;
    }

    clearCompleted() {
        this.todoList = this.todoList.filter((todo) => !todo.checked);
    }

    getFilterItem(filter: Filter) {
        const classes = {selected: this.filterState === filter};
        return html`<a class="c-filter${classMap(classes)}" href="#/${filter}" @click="${() => this.setFilter(filter)}">${filter}</a>`;
    }

    setFilter(filter: Filter) {
        this.filterState = filter;
        this.updateFilteredItems();
    }

    toggleAll() {
        const allChecked = this.todoList.every((todo) => todo.checked);
        this.todoList = this.todoList.map((todo) => ({...todo, checked: !allChecked}));
    }

    addTodo(e: CustomEvent) {
        this.todoList = [...this.todoList, e.detail];
    }

    deleteTodo(e: CustomEvent) {
        this.todoList = [...this.todoList.filter((_, index) => index !== e.detail.index)];
    }

    editTodo(e: CustomEvent) {
        this.todoList = this.todoList.map((todo, index) =>
            index === e.detail.index ? {...todo, checked: e.detail.checked} : todo
        );

        if (e.detail.name) {
            this.todoList = this.todoList.map((todo, index) =>
                index === e.detail.index ? {...todo, name: e.detail.name} : todo
            );
        }
    }

    static styles = css`
        :global {
            :focus-visible, :focus {
                box-shadow: inset 0 0 2px 2px #cf7d7d !important;
                outline: 0 !important;
            }
        }
        

        .c-mark-container {
            display: flex;
            height: 0;

            &.hidden {
                display: none;
            }
        }

        .c-mark {
            position: absolute;
            padding: 18px 28px;
            border: none;
            background: none;
            align-content: center;
            font-size: 22px;
            color: rgb(148, 148, 148);
            transform: rotate(90deg);
            cursor: pointer;
        }

        .hidden {
            display: none;
        }
        
        .c-clear {
            margin-left: auto;
            height: fit-content;
            cursor: pointer;
            text-decoration: none;
            appearance: none;
            background: none;
            border: 0;
            font-size: 100%;
            
            .hidden {
                visibility: hidden;
            }

            &:hover {
                text-decoration: underline;
            }
        }

        .c-filters {
            position: absolute;
            left: 0;
            right: 0;


            @media (max-width: 450px) {
                padding-top: 24px;
            }
        }
        
        .c-filter {
            border: 1px solid transparent;
            border-radius: 3px;
            color: inherit;
            margin: 3px;
            padding: 3px 7px;
            text-decoration: none;

            &:hover {
                border-color: #db7676;
            }

            &:focus {
                box-shadow: 0 0 2px 2px #cf7d7d;
                outline: 0;
            }
        }

        a.selected {
            border: solid 1px #ce4646;
        }

        ul {
            margin: 0;
        }

        :host {
            width: 100%;
        }

        :focus-visible, :focus {
            box-shadow: inset 0 0 2px 2px #cf7d7d;
            outline: 0;
        }

        ul {
            list-style-type: none;
            padding-inline-start: 0;
        }

        .c-header {
            text-align: center;
            font-size: 80px;
            font-weight: 200;
            color: #b83f45;
            margin: 36px;
            line-height: 60px;
        }

        .c-layout {
            min-width: 230px;
            max-width: 550px;
            margin: auto;
            text-align: center;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2), 0 25px 50px 0 rgba(0, 0, 0, .1);
        }

        .c-bottom-info {
            height: 20px;
            display: flex;
            padding: 10px 16px;
            background: white;

            box-shadow: 0 1px 1px rgba(0, 0, 0, .2),
            0 8px 0 -3px #f6f6f6,
            0 9px 1px -3px rgba(0, 0, 0, .2),
            0 16px 0 -6px #f6f6f6,
            0 17px 2px -6px rgba(0, 0, 0, .2);


            @media (max-width: 450px) {
                height: 40px;
            }
            
            &.hidden {
                display: none;
            }
        }
    `;
}

declare global {
    interface HTMLElementTagNameMap {
        'todo-app': TodoApp;
    }
}
