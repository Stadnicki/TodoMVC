import {LitElement, css, html} from 'lit';
import {customElement, query} from 'lit/decorators.js';

@customElement('todo-input')
export class TodoInput extends LitElement {
    @query('input', true) _input!: HTMLInputElement;

    render() {
        return html`
            <input class="c-input" placeholder="What needs to be done?" autofocus>
        `;
    }

    firstUpdated() {
        this._input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.add();
            }
        });
    }

    static styles = css`
        :host {
            display: flex;
            background: white;
        }

        :focus-visible, :focus {
            box-shadow: inset 0 0 2px 2px #cf7d7d !important;
            outline: 0 !important;
        }

        .c-input {
            width: 100%;
            background: white;
            padding: 18px 18px 18px 60px;
            border: none;
            box-shadow: inset 0 -2px 1px #00000008;
            font-size: 24px;
            max-width: 550px;
        }

        input::placeholder {
            font-style: italic;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.4);
        }
    `;

    private add() {
        const name = this._input.value.trim();
        if (name) {
            this._input.value = '';
            this.dispatchEvent(new CustomEvent('add', {
                detail: {name},
            }));
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'todo-input': TodoInput;
    }
}
