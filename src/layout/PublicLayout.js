import React, { Component } from 'react';
export default class PublicLayout extends Component {
    render() {
        return  (
            <div id="wrapper">
                {this.props.children}
            </div>
        );
    }
}