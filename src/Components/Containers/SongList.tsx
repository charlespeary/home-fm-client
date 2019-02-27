import React, { Component } from 'react';
import { Song } from '../../Actions/index';
import { SongItem } from '../Presentational/index';
import { connect } from 'react-redux';
import { ReduxState } from '../../Stores/index';
import 'antd/dist/antd.css';
import { List, Avatar } from 'antd';

type SongListProps = {
    songs: Song[]
}

type SongListState = {
    offset: number;
    currentPage: number;
    window_height: number;
    window_width: number;
}


class SongList extends Component<SongListProps, SongListState> {
    state = {
        offset: 0,
        currentPage: 1,
        window_height: window.innerHeight,
        window_width: window.innerWidth
    }

    render() {
        return (
            <div className="list-container">
                <List
                    bordered={true}
                    size={"large"}
                    itemLayout="horizontal"
                    dataSource={this.props.songs}
                    renderItem={(song: Song) => <SongItem song={song} />}
                    pagination={{
                        total: this.props.songs.length,
                        pageSize: this.state.window_height / 100,
                        simple: true,
                        showQuickJumper: true
                    }}
                />
            </div>
        )
    }
}




const mapStateToProps = (state: ReduxState, something: any) => {
    return {
        songs: state.songs
    }
}

const SongListComponent = connect(
    mapStateToProps
)(SongList);


export { SongListComponent as SongList };