import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from "lit/directives/class-map.js";

@customElement('todo-item')
export class TodoItem extends LitElement {
  @property ()
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
    const classes = { editing: this.editing };

    return html`
      <li class="${classMap(classes)}">
        <input class="c-input" value=${this.value} @keydown="${this.onInputKeydown}" @blur="${this.edit}">

        <div class="c-preview">
          <input class="c-checkbox" type="checkbox" .checked=${this.checked ?? false} @change=${this.toggle}>
          <span class="c-value"  @dblclick="${this.startEdit}">${this.value}</span>
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
      flex: 1;
    }


    .editing {
      .c-input {
        display: block;
      }
      .c-preview{
        display: none;
      }
    }
    
    .c-preview {
      display: flex;
    }
    
    .c-value {
      flex: 1;
      text-align: left;
      word-break: break-all;
      padding: 8px 16px;
      font-size: 24px;
      color: #484848FF;
    }
    
    .c-input{
      display: none;
      flex: 1;
      background: white;
      margin-left: 40px;
      font-size: 24px;
      padding: 16px;
      border: none;
    }

    .c-delete {
      background: none;
      color: red;
      border: none;
      font: inherit;
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
    const options = {
      detail: { checked: this.checked, index: this.index},
      bubbles: true,
      composed: true,
    }
    this.dispatchEvent(new CustomEvent('edit', options));
  }

  private edit() {
    const name = this._input.value.trim();
    if (name) {
      const options = {
        detail: { name, index: this.index},
        bubbles: true,
        composed: true,
      };
      this.dispatchEvent(new CustomEvent('edit', options));
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
    setTimeout(() => this._input.focus(), 500);
  }

  private endEdit() {
    this.editing = false;
  }

  private delete() {
    const options = {
      detail: {index: this.index},
      bubbles: true,
      composed: true,
    }
    this.dispatchEvent(new CustomEvent('delete', options));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-item': TodoItem;
  }
}
