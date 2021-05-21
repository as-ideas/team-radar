import {html, LitElement} from 'lit-element';
import bb, {bar} from 'billboard.js';

class BarGraph extends LitElement {
    static get properties() {
        return {
            id: {type: String},
            title: {type: String},
            text: {type: String},
        };
    }

    constructor() {
        super();
        this.title = '';
        this.text = '';
        this.data = [];
    }

    firstUpdated() {

        bb.generate({
            data: {
                columns: this.data,
                type: bar(),
            },
            bar: {
                width: {
                    ratio: 0.2
                }
            },
            bindto: `#bar-graph-${this.id}`
        });
    }

    // we don't want to use shadow dom t
    createRenderRoot() {
        return this;
    }

    render() {
        return html`
        <section>
            <h1>${this.title}</h1>
            <p>${this.text}</p>
            <div id="bar-graph-${this.id}"></div>
        </section>`;
    }
}

customElements.define('bar-graph', BarGraph);

