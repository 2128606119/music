import {details} from 'network/Songlist.js'
/*获取用户详情*/
export const getUserDetail = uid =>details('/user/detail?uid='+uid)
/*获取用户播放记录*/
export const getUserRecord = (uid, type) =>details('/user/record?uid='+uid+'&type='+type)
/*获取用户收藏歌单*/
export const getUserArtist = (uid,i) => details('/user/playlist?uid='+uid+'&offset='+i)
/*获取用户歌单*/
export const getUserlist = (uid) => details('/user/playlist?uid='+uid)
