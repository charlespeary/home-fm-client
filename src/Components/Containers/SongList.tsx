import React, { Component } from "react";
import { Song, setActiveSong } from "../../Actions/index";
import { SongItem } from "../Presentational/index";
import { connect } from "react-redux";
import { ReduxState } from "../../Stores/index";
import "antd/dist/antd.css";
import { List, Menu } from "antd";
import { Dispatch } from "redux";
import { addSongsToQueue } from "../../Actions/songsQueue";
import { SongQueueItem } from "../Presentational/Song";

type SongListProps = {
  songs: Song[];
  songsQueue: Song[];
  setActiveSong: (song: Song) => void;
};

enum SelectedList {
  YourSongs = "YourSongs",
  SongsQueue = "SongsQueue"
}

type SongListState = {
  offset: number;
  currentPage: number;
  window_height: number;
  window_width: number;
  selectedList: SelectedList;
};

class SongList extends Component<SongListProps, SongListState> {
  state = {
    offset: 0,
    currentPage: 1,
    window_height: window.innerHeight,
    window_width: window.innerWidth,
    selectedList: SelectedList.YourSongs
  };

  render() {
    return (
      <div className="list-container">
        <Menu
          onClick={e => {
            const key =
              e.key === "YourSongs"
                ? SelectedList.YourSongs
                : SelectedList.SongsQueue;
            this.setState({ selectedList: key });
          }}
          selectedKeys={[this.state.selectedList]}
          mode="horizontal"
        >
          <Menu.Item key={SelectedList.YourSongs}>Your songs</Menu.Item>
          <Menu.Item key={SelectedList.SongsQueue}>Songs queue</Menu.Item>
        </Menu>

        <List
          bordered={true}
          size={"large"}
          itemLayout="horizontal"
          dataSource={
            this.state.selectedList === SelectedList.SongsQueue
              ? this.props.songsQueue
              : this.props.songs
          }
          renderItem={(song: Song) => {
            if (this.state.selectedList === SelectedList.SongsQueue) {
              return (
                <SongQueueItem
                  setActiveSong={this.props.setActiveSong}
                  song={song}
                />
              );
            } else {
              return (
                <SongItem
                  setActiveSong={this.props.setActiveSong}
                  song={song}
                />
              );
            }
          }}
          pagination={{
            total:
              this.state.selectedList === SelectedList.SongsQueue
                ? this.props.songsQueue.length
                : this.props.songs.length,
            pageSize: 9,
            simple: true,
            showQuickJumper: true
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    songs: state.songs,
    songsQueue: state.songsQueue
  };
};

const dispatchToProps = (dispatch: Dispatch) => {
  return {
    setActiveSong: (song: Song) => {
      // set song to be active, true indicates that we want to download it
      dispatch(setActiveSong(song, true));
      dispatch(addSongsToQueue([song]));
    }
  };
};

const SongListComponent = connect(
  mapStateToProps,
  dispatchToProps
)(SongList);

export { SongListComponent as SongList };
