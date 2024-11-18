import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('todo-item')
export class TodoItem extends LitElement {
  @property()
  checked = false;

  @property()
  value = 'Hello';

  @property()
  index = 0;

  @query('.c-input', true) _input!: HTMLInputElement;
  @query('.c-input', true) _checkbox!: HTMLInputElement;

  render() {
    return html`
      <input class="c-checkbox" type="checkbox" .checked=${this.checked ?? false} @change=${this.toggle}>
      <input class="c-input" value=${this.value}>
      <button class="c-delete" @click=${this.delete}>
        <span aria-hidden="true">&times;</span>
      </button>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      padding: 16px;
      background: white;
      border-bottom: 1px solid #ededed;
    }
    
    
    .c-input{
      width: 100%;
      background: white;
      border: none;
    }

    .c-delete {
      background: none;
      color: red;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
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
        detail: { name },
        bubbles: true,
        composed: true,
      };
      this.dispatchEvent(new CustomEvent('edit', options));
    }
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
