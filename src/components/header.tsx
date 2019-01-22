import React, {Fragment} from 'react';

export const SiteHeader = () => {
    return (
        <Fragment>
            <div className="container-header">
                <h1 style={{color: "#FFF", margin:0, fontWeight:"bold"}}>react-css-donut-chart</h1>
                <p>ported from vue-css-donut-chart</p>
                <span>Lightweight React component for drawing pure CSS donut charts</span>
            </div>
            <nav className="container-nav">
                <a href="https://github.com/dumptyd/vue-css-donut-chart/blob/master/README.md">Documentation</a>
                <a href="https://github.com/dumptyd/vue-css-donut-chart/blob/master/README.md#installation">Installation</a>
                <a href="https://github.com/dumptyd/vue-css-donut-chart/blob/master/README.md#usage">Usage</a>
                <a href="https://github.com/dumptyd/vue-css-donut-chart">Github</a>
                <a href="https://github.com/dumptyd/vue-css-donut-chart">Vue Donut Github</a>
            </nav>
        </Fragment>
    );
}
