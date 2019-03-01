import React, { Component } from 'react';
import { Song, Artist } from '../../Actions/index';
import { List, Avatar } from 'antd';

interface SongProps {
    song: Song,
    setActiveSong: (song: Song) => void;
}

export function formatArtists(artists: Artist[]) {
    return artists.slice(0, 3).map(artist => artist.name).join(", ")
}

export class SongItem extends Component<SongProps> {


    render() {
        const { artists } = this.props.song;

        return (
            <List.Item className="list-item-song" onClick={() => {
                this.props.setActiveSong(this.props.song);
            }}>
                <List.Item.Meta
                    avatar={<Avatar src={this.props.song.album.images[0].url} />}
                    title={<span className="song-name">{this.props.song.name}</span>}
                    description={formatArtists(artists)}
                />
            </List.Item>
        )
    }
}




