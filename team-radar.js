import {html, LitElement} from 'lit-element';

import './team-radar.css';

import './components/radar-graph';
import './components/linear-graph';

const getDataUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('team');
}

class TeamRadar extends LitElement {

    constructor() {
        super();
        this.dataUrl = getDataUrl();
    }

    // we don't want to use shadow dom t
    createRenderRoot() {
        return this;
    }


    renderComponent(section) {
        switch (section) {
            case "experience": return html`<linear-graph title="Experience"></linear-graph>`;
            case "team": return html`<radar-graph title="Team"></radar-graph>`;
            default: html``;
        }
    }


    render() {
        const title = "Team 🧭 Radar";

        return html`
        <section class="team-radar">
            <h1>${title}</h1>
            ${this.renderComponent("team")}
            ${this.renderComponent("experience")}
        </section>`;
    }
}
customElements.define('team-radar', TeamRadar);

