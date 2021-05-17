import {html, LitElement} from 'lit-element';
import bb, {radar} from 'billboard.js';

class RadarGraph extends LitElement {
    static get properties() {
        return {
            id: {type: String},
            title: {type: String},
            text: {type: String},
        };
    }

    constructor() {
        super();
        this.title = 'RadarGraph';
        this.text = '';
    }

    firstUpdated() {
        bb.generate({
            data: {
                x: "x",
                columns: [
                    ["x", "backend", "frontend", "ops/cloud"],
                    ["Susi", 0, 2, 4],
                    ["Peter",  6, 5, 5],
                    ["marry",  2, 3, 5]
                ],
                type: radar(),
                labels: true
            },
            radar: {
                axis: {
                    max: 10
                },
                level: {
                    depth: 2
                },
                direction: {
                    clockwise: true
                }
            },
            bindto: `#radar-graph-${this.id}`
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
            <div id="radar-graph-${this.id}"></div>
        </section>`;
    }
}
customElements.define('radar-graph', RadarGraph);

