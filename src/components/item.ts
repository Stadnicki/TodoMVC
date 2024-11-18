import { LitElement, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('todo-item')
export class TodoItem extends LitElement {
  @property()
  value = 'Hello';

  @query('input', true) _input!: HTMLInputElement;

  render() {
    return html`
      <input class="c-input" value=${this.value}>
      <button @click=${this.edit}>Edit</button>
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
}

declare global {
  interface HTMLElementTagNameMap {
    'todo-item': TodoItem;
  }
}
