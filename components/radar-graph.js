import {html, LitElement} from 'lit-element';
import bb, {radar} from 'billboard.js';

class RadarGraph extends LitElement {
    static get properties() {
        return {
            id: {type: String},
            title: {type: String},
            text: {type: String},
            data: {type: Array}
        };
    }

    constructor() {
        super();
        this.title = 'RadarGraph';
        this.text = '';
        this.data = [];
    }

    firstUpdated() {
        bb.generate({
            data: {
                x: "x",
                columns: [
                    ["x", "Data A", "Data B", "Data C", "Data D", "Data E"],
                    ["data1", 330, 350, 200, 380, 150],
                    ["data2", 130, 100, 30, 200, 80],
                    ["data3", 230, 153, 85, 300, 250]
                ],
                type: radar(), // for ESM specify as: radar()
                labels: true
            },
            radar: {
                axis: {
                    max: 400
                },
                level: {
                    depth: 4
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

