import {html, LitElement} from 'lit-element';

import './team-radar.css';

import './components/radar-graph';
import './components/linear-graph';
import './components/wordcloud-graph';

import 'whatwg-fetch';

class TeamRadar extends LitElement {

    loading = true;
    teamName = "";
    sections = [];

    constructor() {
        super()
        this.loadSectionData()
    }

    loadSectionData() {
        const urlParams = new URLSearchParams(window.location.search);
        const config = {
            team: urlParams.get('team') || 'as-ideas',
            repository: urlParams.get('repo') || 'team-radar',
            branch: urlParams.get('branch') || 'main'
        };

        let url = `https://raw.githubusercontent.com/${config.team}/${config.repository}/${config.branch}/data.json`;
        console.log('loading data from:', url);
        return fetch(url)
            .then(res => res.json())
            .then(json => {
                this.teamName = json.name;
                this.sections = json.sections;
            })
            .finally(() => {
                this.loading = false;
                console.log(this.sections);
                this.requestUpdate();
            })
    }

    // we don't want to use shadow dom t
    createRenderRoot() {
        return this;
    }

    renderComponent(section) {
        const visualization = section.visualization;
        const title = section.title || 'Title';
        const text = section.text || 'Text';
        const data = section.data || null;

        switch (visualization) {
            case "radar":
                return html`<radar-graph title="${title}" text="${text}" data="${data}"></radar-graph>`;
            case "linear":
                return html`<linear-graph title="${title}" text="${text}" data="${data}"></linear-graph>`;
            case "wordcloud":
                return html`<wordcloud-graph title="${title}" text="${text}" data="${data}"></wordcloud-graph>`;
            default:
                html`<p>Unknown section ${visualization}</p>`;
        }
    }


    render() {
        const title = "Team 🧭 Radar";

        if (this.loading) {
            return html`<main class="team-radar">
                             <h1>${title}</h1>
                            <section>We are loading the data ...</section>
                </main>`;
        }

        return html`<main class="team-radar">
            <h1>${title}</h1>
            <p>You are viewing the team-radar for the team '${this.teamName}'. </p>
            ${(this.sections.map(section => this.renderComponent(section)))}
        </main>`;
    }
}

customElements.define('team-radar', TeamRadar);

