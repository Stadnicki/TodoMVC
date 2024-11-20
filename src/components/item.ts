import {LitElement, css, html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {classMap} from "lit/directives/class-map.js";

@customElement('todo-item')
export class TodoItem extends LitElement {
    @property()
    editing = false;

    @property()
    checked = false;

    @property()
    value = 'Hello';

    @property()
    index = 0;

    @query('.c-input', true) _input!: HTMLInputElement;

    firstUpdated() {
        this._input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.endEdit();
                this.edit();
            }
        });
    }

    render() {
        const classes = {editing: this.editing };

        return html`
            <li class="c-item${classMap(classes)}">
                <input class="c-input" value=${this.value} @keydown="${this.onInputKeydown}" @blur="${this.edit}">

                <div class="c-preview">
                    <input class="c-checkbox" type="checkbox" .checked=${this.checked} @change=${this.toggle}>
                    <span class="c-value" @dblclick="${this.startEdit}">${this.value}</span>
                    <button class="c-delete" @click=${this.delete}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </li>
        `;
    }

    static styles = css`
        :host {
            display: flex;
            background: white;
            border-bottom: 1px solid #ededed;
        }

        li {
            display: flex;
            flex: 1;
        }

        .c-item:hover {
            .c-delete {
                color: #949494;
                display: block;
                
                &:hover {
                    color: #c18585;
                }
            }
        }

        .editing {
            .c-input {
                display: flex;
            }

            .c-preview {
                display: none;
            }
        }

        .c-preview {
            display: flex;
            flex: 1;
            align-items: center;
        }

        .c-value {
            flex: 1;
            text-align: left;
            word-break: break-all;
            padding: 16px;
            font-size: 24px;
            line-height: 1.2;
            color: #484848FF;
        }

        .c-input {
            display: none;
            flex: 1;
            width: 100%;
            background: white;
            font-size: 24px;
            padding: 16px 16px 16px 40px;
            border: none;
            
            &:focus-visible, &:focus {
                box-shadow: inset 0 0 2px 2px #cf7d7d;
                outline: 0;
            }
        }

        .c-delete {
            width: 40px;
            height: 40px;
            margin-right: 10px;
            display: none;
            font-size: 30px;
            background: none;
            border: none;
            cursor: pointer;
            outline: inherit;
        }

        .c-checkbox {
            background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E);
            background-repeat: no-repeat;
            background-position: center left;

            width: 40px;
            height: 40px;
            appearance: none;
            outline: none;
            cursor: pointer;

            &:checked {
                background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E);
            }
        }
    `;

    private toggle() {
        this.checked = !this.checked;
        this.dispatchEvent(new CustomEvent('edit', {
            detail: {checked: this.checked, index: this.index},
        }));
    }

    private edit() {
        const name = this._input.value.trim();
        if (name) {
            this.dispatchEvent(new CustomEvent('edit',  {
                detail: {name, index: this.index},
            }));
        }
        this.endEdit()
    }

    private onInputKeydown(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            this.edit();
        }
    }

    private startEdit() {
        this.editing = true;
        setTimeout(() => this._input.focus(), 1);
    }

    private endEdit() {
        this.editing = false;
    }

    private delete() {
        this.dispatchEvent(new CustomEvent('delete', {
            detail: {index: this.index},
        }));
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'todo-item': TodoItem;
    }
}
