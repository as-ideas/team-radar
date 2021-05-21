import {html, LitElement} from 'lit-element';
import WordCloud from 'wordcloud';

const groupWords = (data = []) => {
    let buckets = {};
    data.forEach(entry => {
        buckets[entry] =  buckets[entry] ? buckets[entry] + 1 : 1;
    })

    let keys = Object.keys(buckets);
    return keys.map(key => [key, buckets[key]]);
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
        WordCloud(document.getElementById(elementSelector), { list: words, shrinkToFit: true, weightFactor: 3, backgroundColor: 'transparent'} );
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
            <canvas width="80%" id="wordcloud-graph-${this.id}"></canvas>
        </section>`;
    }
}
customElements.define('wordcloud-graph', WordCloudGraph);

