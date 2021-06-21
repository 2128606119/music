import {details} from './Songlist'
/*退出登录*/
export const tcdlu=()=>{return details('logout')}
/*歌单详情*/
export const Playlist =id=>{return details('playlist/detail?id='+id)}
/*歌单收藏*/
export const Songlist=id=>{return details('playlist/subscribers?id='+id+'&limit=28')}
/*歌单推荐*/
export const creator=id=>{return details('related/playlist?id='+id)}
/*歌单评论*/
export const comments=id=>{return details('comment/playlist?id='+id)};
/*获取歌曲详情*/
export const Detailssong=id=>{return details('song/detail?ids='+id)};
/*获取歌曲url*/
export const songurl=id=>{return details('song/url?id='+id)}
/*收藏/取消收藏 歌单*/
export const scgd=(i,id)=>{return details('/playlist/subscribe?t='+i+'&id='+id)}
/*歌手详情*/
export const Detailsofthesinger=(id)=>{return details('/artist/detail?id='+id)}
/*歌手热门50首歌曲*/
export const Popularsongs=(id)=>{return  details('/artist/top/song?id='+id)}
/*歌手专辑*/
export const Singeralbum=(id,count)=>{return  details('/artist/album?id='+id+'&limit='+count)}
/*歌手详情*/
export const Dofsinger=(id)=>{return  details('/artist/desc?id='+id)}
/*相似歌手*/
export const Similartosinger=id=>{return details('/simi/artist?id='+id)}
/*专辑详情*/
export const Albumdetails=id=>{return details('/album?id='+id)}
/*专辑动态*/
export const Albumdynamic=id=>{return details('/album/detail/dynamic?id='+id)}
/*搜索*/
export const seek =(data,type)=> {return details('/cloudsearch?keywords='+data+'&limit=30&offset=0&type='+type)}
/*二维码登录*/
export const QRcodekey=(key,item)=>{return details('/login/qr/create?key='+key+'&qrimg=true&timerstamp='+item)}
export const QRcodeloge=item=>{return details('/login/qr/key?timerstamp='+item)}
export const QRcodezt=(key,item)=>{return details('/login/qr/check?key='+key+'&timerstamp='+item)}
export const QRcodejbd=()=>{return details('/login/status')}
/*排行榜*/
export const Musiclistsun=()=>{return details('/toplist/detail')}
/*歌单分类*/
export const catlist=()=>{return details('/playlist/catlist')}
/*热门歌单分类*/
export const rmecatlist=()=>{return details('/playlist/hot')}
/*获取歌单详情*/
export const flplaylist=(res,offset)=>{return details('/top/playlist?cat='+res+'&offset='+offset+'&limit=40')}
/**
 * 获取歌手分类列表
 * @param sum
 * initial:以那个字母进行搜索 热门传-1 其他 0
 * limit:取出数量
 * offset：取值位置
 * type：歌手类型   取值：-1:全部，1:男歌手，2:女歌手，3:乐队
 * area：歌手位置   取值：-1:全部，7华语，96欧美，8:日本，16韩国，0:其他
 */
export const getSingerList=sum=>{return details('/artist/list?initial='+sum.initial+'&limit=40&offset='+sum.offset+'&type='+sum.type+'&area='+sum.area)}
/*获取视频标签列表*/
export const getavka=()=>{return details('/video/group/list')}
/*获取视频分类列表 登录才能查看*/
export const getavkb=()=>{return details('/video/category/list')}
/*获取全部视频列表*/
export const getVideoAll=offset=>{return details ('video/timeline/all?offset='+offset)}
/*获取视频标签/分类下的视频*/
export const getVideoOther = (id, offset) =>{return details('/video/group?id='+id+'&offset='+offset)}
/*获取视频详情*/
export const Thevideodetails=id=>{return details('/video/detail?id='+id)}
/*获取视频播放地址*/
export const Broadcastaddress=id=>{return details('/video/url?id='+id)}
/*视频评论*/
// export const getcomments=(id,offset,limit)=>{return details('/comment/video?id='+id+'&offset='+offset+'&limit='+limit)}
export const getcomments=(id,offset,limit)=>{return details('/comment/video?id='+id+'&'+new Date().getTime())}

/*相关视频*/
export const getVideoRelatedspou=id=>{return details('/related/allvideo?id='+id)}
/*视频评论*/
export const faoncomment = (id,test)=>{return details('/comment?t=1&type=5&id='+id+'&content='+test)}