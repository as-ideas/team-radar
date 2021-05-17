import {html, LitElement} from 'lit-element';

import './team-radar.css';

import './components/radar-graph';
import './components/linear-graph';

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
        return fetch(url)
            .then(res => res.json())
            .then(json => {
                this.teamName = json.name;
                this.sections = json.sections;
            }).finally(() => {
                this.loading = false;
                this.requestUpdate();
            })
    }

    // we don't want to use shadow dom t
    createRenderRoot() {
        return this;
    }

    renderComponent(section) {
        switch (section.visualization) {
            case "radar":
                return html`<radar-graph title=${section.title}></radar-graph>`;
            case "linear":
                return html`<linear-graph title="Team"></linear-graph>`;
            default:
                html``;
        }
    }


    render() {
        console.log('render', this);
        const title = "Team 🧭 Radar";

        if (this.loading) {
            return html`<main class="team-radar">
                             <h1>${title}</h1>
                            <section>We are loading the data ...</section>
                </main>`;
        }

        let renderedSections = this.sections.map(section => this.renderComponent(section));

        return html`<main class="team-radar">
            <h1>${title}</h1>
            <p>You are viewing the team-radar for the team '${this.teamName}'. </p>
            ${renderedSections}
        </main>`;
    }
}

customElements.define('team-radar', TeamRadar);

