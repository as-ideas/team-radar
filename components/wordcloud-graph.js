import {html, LitElement} from 'lit-element';
import WordCloud from 'wordcloud';

const groupWords = (data = []) => {
    let buckets = {};
    data.forEach(entry => buckets[entry] = buckets[entry] ? buckets[entry] + 1 : 1)
    return Object.keys(buckets).map(key => [key, buckets[key]]);
}

const wordCloudConfiguration = {
    gridSize: 16,
    weightFactor: 16,
    origin: [90, 0],
    fontFamily: 'Times, serif',
    color: 'random-dark',
    backgroundColor: 'transparent'
}

class WordCloudGraph extends LitElement {
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
        this.title = 'WordCloudGraph';
        this.text = '';
        this.data = [];
    }

    firstUpdated() {
        const elementSelector = `wordcloud-graph-${this.id}`;
        const words = groupWords(this.data || []);
        WordCloud(document.getElementById(elementSelector), { list: words, ...wordCloudConfiguration} );
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
            <canvas id="wordcloud-graph-${this.id}"></canvas>
        </section>`;
    }
}
customElements.define('wordcloud-graph', WordCloudGraph);

