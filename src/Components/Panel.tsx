import React, { Component } from 'react';

interface PanelState {

}

interface PanelProps {
    token: string;
}


export class Panel extends Component<PanelProps, PanelState> {

    constructor(props: any) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <header className="App-header">
                Successfully authenticated!
            </header>
        )
    }
}

