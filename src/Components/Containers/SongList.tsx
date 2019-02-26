import React, { Component } from 'react';
import { Song } from '../../Actions/index';
import { SongItem } from '../Presentational/index';
import { connect } from 'react-redux';
import { ReduxState } from '../../Stores/index';
import { Pagination } from "antd";
import 'antd/dist/antd.css';
import { List, Avatar } from 'antd';


type SongListProps = {
    songs: Song[]
}

type SongListState = {
    offset: number;
    currentPage: number;
}

class SongList extends Component<SongListProps, SongListState> {
    state = {
        offset: 0,
        currentPage: 1
    }

    render() {
        return (
            <div>
                <List
                    bordered={true}
                    itemLayout="horizontal"
                    dataSource={this.props.songs}
                    renderItem={(song: Song) => <SongItem song={song} />}
                    pagination={{
                        onChange: (currentPage: number) => {
                            // if page changed add offset based on direction in which user clicks pagination buttons
                            const newOffset = currentPage > this.state.currentPage ? 30 : -30;
                            this.setState({ offset: this.state.offset + newOffset, currentPage })
                        },
                        total: this.props.songs.length,
                        pageSize: 10
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