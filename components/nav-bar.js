import {html, LitElement} from 'lit-element';
import {idGenerator} from '../team-radar';

class NavBar extends LitElement {

    static get properties() {
        return {
            links: {type: Array}
        }
    }
    constructor() {
        super();
        this.links = [];
    }

    createRenderRoot() {
        return this;
    }

    render() {
        return html`<header>
              <a href="#" class="logo">Logo</a>
              ${this.links.map(link => html`<a href="#${idGenerator(link)}" class="button">${link}</a>`)}
            </header>`;
    }
}

customElements.define('nav-bar', NavBar);
