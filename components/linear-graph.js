import {html, LitElement} from 'lit-element';
import bb, {line} from 'billboard.js';

class LinearGraph extends LitElement {
    static get properties() {
        return {
            id: {type: String},
            title: {type: String},
            text: {type: String},
        };
    }

    constructor() {
        super();
        this.title = 'LinearGraph';
        this.text = '';
        this.data = [];
    }

    firstUpdated() {
        bb.generate({
            data: {
                columns: [
                    ["sample", 30, 200, 100, 400, 150, 250],
                    ["sample2", 130, 300, 200, 500, 250, 350]
                ],
                type: line(),
                axes: {
                    sample2: "y2"
                }
            },
            axis: {
                x: {
                    label: "X Label"
                },
                y: {
                    label: "Y Label"
                },
                y2: {
                    show: true,
                    label: "Y2 Label"
                }
            },
            bindto: `#linear-graph-${this.id}`
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
            <div id="linear-graph-${this.id}"></div>
        </section>`;
    }
}
customElements.define('linear-graph', LinearGraph);

