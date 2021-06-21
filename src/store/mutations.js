const mutations = {
  urlpathxs(state,res){
    state.urlpath=res
  },
  /*时间措验证登录*/
  sjc_1xs(state,res){
    state.sjc_1=res
  },
  /*专辑数*/
  Albumnumberxs(state,res){
    state.Albumnumber=res
  },
  /*主页*/
  /*添加搜索记录*/
  increment (state,res) {
    state.keyword=res
    for(let j=0;j<state.Search.length;j++){
      if(state.Search[j]==res){
        return
      }
    }
    state.Search[state.Search.length]=res
  },
  /*删除单个搜索记录*/
  RemoveIncrement(state,res){
    for(let j=0;j<state.Search.length;j++){
      if(state.Search[j]==res){
        state.Search.splice(j, 1);
        return
      }
    }
  },
  /*删除所有搜索记录*/
  RemoveIncrementAll(state){
    state.Search.splice(0,state.Search.length)
  },

  /*用户*/
  UserIDupdate(state,id){
    state.UserId=id
  },

  /*音乐ID*/
  playmusic(state,res){
    state.MusicID=res
  },
  /*音乐URL*/
  updateURL(state,res){
    state.MusisURL=res
  },

  /*控制*/
  updatecoun(state,res){
    state.control=res
  },

  /*暂停播放*/
  upindexs(state,res) {
    state.indexs = res
  },
  /*音乐详情*/
  DetailsSongxs(state,res) {
    state.DetailsSong = res
  },
  /*播放格式*/
  Broadcastformatxs(state,res){
    state.Broadcastformat=res
  },
  /*歌曲页*/
  SgPg(state,res){
    state.SongPage=res
  },
  /*播放结束*/
  Endplayxs(state,res){
    state.Endplay=res
  },
  Playdownxs(state,res){
    state.Playdown=res
  },
  /*播放列表*/
  playListxs(state,res){
    state.playList.push(res)
  },
  /*清空搜索纪录*/
  Emptyrecordxs(state){
    state.playList.splice(0,state.playList.length)
  },
  /*删除单个记录*/
  RemoveEmptyrecord(state,res){
    for(let j=0;j<state.playList.length;j++){
      if(state.playList[j]==res){
        state.playList.splice(j, 1);
        return
      }
    }
  },
  /*时间错*/
  sjcxs(state,i){
    state.sjc=i
  }
}
export default mutations
