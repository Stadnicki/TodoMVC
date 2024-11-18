import { LitElement, css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';

@customElement('todo-input')
export class TodoInput extends LitElement {
  @query('input', true) _input!: HTMLInputElement;

  render() {
    return html`
      <input class="c-input" value="Submit">
      <button @click=${this.add}>Add</button>
    `;
  }

  static styles = css`
    .c-input {
    }
  `;

  private add() {
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
    'todo-input': TodoInput;
  }
}
