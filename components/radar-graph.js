import {html, LitElement} from 'lit-element';
import bb, {radar} from 'billboard.js';

const extractDimensions = (data = []) => {
    let entries = [];
    data.forEach(entry => {
        entries = entries.concat(Object.keys(entry))
    });
    let x = new Set([ ...entries]).keys();
    return [...x];
}

const extractEntries = (dimensions, data = []) => {
    const entries = [];
    data.forEach((entry, idx) => {
        let newEntry = ['member'+idx];
        dimensions.forEach(dimension => newEntry.push(entry[dimension] ? entry[dimension] : 0))
        entries.push(newEntry);
    })
    return entries
}

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
        let dimensions = extractDimensions(this.data);
        let entries = extractEntries(dimensions, this.data);

        const columns = [["x", ...dimensions], ...entries]
        bb.generate({
            data: {
                x: "x",
                columns: columns,
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
            tooltip: {
                show: false,
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

