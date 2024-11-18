import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('todo-item')
export class TodoItem extends LitElement {
  @property()
  value = 'Hello';

  @property()
  index = 0;

  @query('input', true) _input!: HTMLInputElement;

  render() {
    return html`
      <input class="c-input" value=${this.value}>
      <span>${this.index}</span>
      <button @click=${this.edit}>Edit</button>
      <button @click=${this.delete}>Delete</button>
    `;
  }

  static styles = css`
    .c-input {
    }
  `;

  private edit() {
    const name = this._input.value.trim();
    if (name) {
      const options = {
        detail: { name },
        bubbles: true,
        composed: true,
      };
      this.dispatchEvent(new CustomEvent('add', options));
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
