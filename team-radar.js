import {html, LitElement} from 'lit-element';

import './team-radar.css';

import './components/radar-graph';
import './components/bar-graph';
import './components/wordcloud-graph';
import './components/nav-bar';

import 'whatwg-fetch';

export const idGenerator = (str) => (''+ btoa(str)).substr(0,6)

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
        return fetch(url)
            .then(res => res.json())
            .then(json => {
                this.teamName = json.name;
                this.sections = json.sections;
            })
            .finally(() => {
                this.loading = false;
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
        const id = idGenerator(title);

        switch (visualization) {
            case "radar":
                return html`<radar-graph id="${id}" title="${title}" text="${text}" .data="${data}"></radar-graph>`;
            case "bar":
                return html`<bar-graph id="${id}" title="${title}" text="${text}" .data="${data}"></bar-graph>`;
            case "wordcloud":
                return html`<wordcloud-graph id="${id}" title="${title}" text="${text}" .data="${data}"></wordcloud-graph>`;
            default:
                html`<p>Unknown section ${visualization}</p>`;
        }
    }


    render() {
        const title = "Team 🧭 Radar";
        const links = this.sections.map(section => section.title);

        if (this.loading) {
            return html`<main class="team-radar container">
                             <h1>${title}</h1>
                            <section>We are loading the data ...</section>
                </main>`;
        }

        return html`
            <nav-bar .links="${links}"></nav-bar>
            <main class="container">
                <div class="row">
                <div class="col-lg-4 col-md-3 col-sm-1"></div>
                    <div class="col-lg-4 col-md-6 col-sm-10">
                        <h1>${title}</h1>
                        <p>You are viewing the team-radar for the team '${this.teamName}'. </p>
                        ${(this.sections.map(section => this.renderComponent(section)))}
                    </div>
                    <div class="col-lg-4 col-md-3 col-sm-1"></div>
                </div>
                
            <bar-graph></bar-graph>

            </main>`;
    }
}

customElements.define('team-radar', TeamRadar);

