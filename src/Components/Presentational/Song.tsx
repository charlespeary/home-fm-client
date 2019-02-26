import React, { Component } from 'react';
import { Song } from '../../Actions/index';
import { List, Avatar } from 'antd';

interface SongProps {
    song: Song
}

export class SongItem extends Component<SongProps> {

    render() {
        return (
            <List.Item>
                <List.Item.Meta
                    avatar={<Avatar src={this.props.song.album.images[0].url} />}
                    title={<a href="https://ant.design">{this.props.song.name}</a>}
                    description={this.props.song.artists.map(artist => artist.name).join(", ")}
                />
            </List.Item>
        )
    }
}




