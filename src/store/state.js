const state={
    /*跳转*/
    urlpath:'',
    /*专辑数*/
    Albumnumber:{},
    // 播放列表
    playList: [],
    // 播放索引
    currentIndex: -1,
    /*控制显示*/
    current:true,
    /*上下一曲*/
    Playdown:-1,
    /*时间戳*/
    sjc:0,
    /*时间措验证登录*/
    sjc_1:0,

    /*搜索记录*/
    keyword:'',
    /*搜索记录列表*/
    Search:[],
    /*播放音乐*/
    control:false,
    /*音乐ID*/
    MusicID:0,
    /*音乐URL*/
    MusisURL:'',
    /*播放 暂停*/
    indexs:1000,
    /*歌曲详情*/
    DetailsSong:{
        /*歌曲封面*/
        SongCover:'',
        /*歌曲名*/
        songname:'',
        /*作者*/
        name:'',
        /*歌曲时长*/
        songtime:0
    },
    /*播放格式*/
    Broadcastformat:'nicexunhuanbofang24',
    /*歌曲页*/
    SongPage:false,
    /*播放结束 false没结束 true结束*/
    Endplay:0
}
export default state