<template>
  <div class="search-detail-wrapper">
    <div class="search-info-wrapper">
      <div class="search-info-head-wrapper">
        <img alt="" class="search-bac-img" src="@/assets/img/banner/pic1.jpeg">
        <span class="search-title">中国野生生物影像年赛——摄影单元征稿</span>
      </div>
      <div class="search-content-wrapper">
        <div class="search-content-box" v-html="searchDetail.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-detail",
  data:()=>{
    return {
      searchDetail:{
        content:`<div class="content-article">
<p class="one-p">北京时间6月19日，快船主场131-119击败爵士，以总比分4-2淘汰对手，晋级西部决赛，这也是快船51年队史里首次晋级分区决赛。莱昂纳德继续因伤缺阵，小将曼恩成为获胜头号功臣，轰下39分7记三分，得分和三分都创生涯新高。米切尔带伤作战，拼尽全力轰下39分8篮板9助攻。快船最多落后爵士25分，但他们在下半场迎来爆发，最终逆转取胜。</p>
<p class="one-p"><img class="content-picture" src="//inews.gtimg.com/newsapp_bt/0/13671602647/1000">
</p>
<p class="one-p"><strong>数据统计</strong></p>
<p class="one-p">爵士一方，米切尔39分9篮板9助攻，克拉克森21分，罗伊斯-奥尼尔21分10篮板，博格达诺维奇14分，戈贝尔12分10篮板，快船一方，曼恩39分7记三分，雷吉27分10助攻3抢断，乔治28分9篮板7助攻3抢断，巴图姆16分7篮板2抢断3盖帽，贝弗利12分。</p>
<p class="one-p"><strong>本场之星：曼恩</strong></p>
<p class="one-p">在这场比赛中，小将曼恩迎来大爆发，全场轰下39分和7记三分，两项数据都创生涯新高。他在第三节单节得到20分，帮助快船完成25分大逆转，队史首次晋级分区决赛。</p>
<p class="one-p"><strong>高光时刻</strong></p>
<p class="one-p">米切尔三分命中，他在第一节就得到16分！</p>
<p class="one-p"><img class="content-picture" src="//inews.gtimg.com/newsapp_match/0/13671472769/0">
</p>
<p class="one-p">快船小将曼恩单手补扣，他在第一节也得到12分！</p>
<p class="one-p"><img class="content-picture" src="//inews.gtimg.com/newsapp_match/0/13671474491/0">
</p>
<p class="one-p">巴图姆快攻滑翔扣篮！</p>
<p class="one-p"><img class="content-picture" src="//inews.gtimg.com/newsapp_match/0/13671477414/0">
</p>
<p class="one-p">克拉克森在第二节迎来大爆发，单节轰下21分，一度连拿17分，势不可挡！</p>
<p class="one-p"><img class="content-picture" src="//inews.gtimg.com/newsapp_match/0/13671479195/0">
</p>
<p class="one-p">英格尔斯送出妙传，戈贝尔单手空接暴扣！</p>
<p class="one-p"><img class="content-picture" src="//inews.gtimg.com/newsapp_match/0/13671572512/0">
</p>
<p class="one-p">曼恩在第三节内突外投，单节轰下20分！</p>
<p class="one-p"><img class="content-picture" src="//inews.gtimg.com/newsapp_match/0/13671612621/0">
</p>
<p class="one-p"><strong>比赛回顾</strong></p>
<p class="one-p">首节，米切尔连拿5分，曼恩三分命中，乔治上篮命中，戈贝尔扣篮得分。曼恩连拿7分，快船打出一波9-3。米切尔三分命中，博格达诺维奇上篮得分，巴图姆连拿5分，米切尔打成3+1，小莫里斯三分命中，乔治3罚3中，首节战罢，爵士33-31领先快船，米切尔单节16分，曼恩也得到12分。</p>
<p class="one-p"><img class="content-picture" src="//inews.gtimg.com/newsapp_bt/0/13671678533/1000">
</p>
<p class="one-p">次节，克拉克森抛投命中，乔治连拿5分。曼恩空接暴扣。戈贝尔连拿4分，朗多上篮得分。英格尔斯中投命中，巴图姆扣篮得分。克拉克森内突外投，连续为爵士得到17分，爵士将分差拉开到18分。乔治中投得分，奥尼尔、雷吉互飙三分。米切尔连续投中两记三分，博格达诺维奇也投中三分。半场结束，爵士72-50领先快船，克拉克森在第二节迎来爆发，单节得到21分。</p>
<p class="one-p"><img class="content-picture" src="//inews.gtimg.com/newsapp_bt/0/13671513492/1000">
</p>
<p class="one-p">易边再战，米切尔三分命中，乔治扣篮得分，曼恩三分命中，雷吉、曼恩接连上篮得分，快船打出一波9-0。博格达诺维奇、曼恩互飙三分。康利命中三分，戈贝尔空接上篮，奥尼尔上篮得分，爵士回敬一波7-0。巴图姆、米切尔互飙三分，雷吉连拿4分，戈贝尔空接扣篮得分。曼恩连拿10分，雷吉三分命中，快船打出一波17-0，将分差缩小到2分。奥尼尔扣篮得分，打破得分荒，米切尔两罚两中，雷吉三分命中。三节战罢，爵士94-91领先快船，快船小将曼恩单节轰下20分。</p>
<p class="one-p"><img class="content-picture" src="//inews.gtimg.com/newsapp_bt/0/13671515047/1000">
</p>
<p class="one-p">末节，巴图姆三分命中，戈贝尔两罚一中，雷吉上篮得分，反超对手。米切尔、贝弗利互飙三分。米切尔两罚一中，乔治三分命中。雷吉上篮得分，巴图姆三分命中，快船将分差拉开到7分。博格达诺维奇连中两记三分，乔治中投得分，曼恩上篮命中。贝弗利三分命中，最终，快船主场击败爵士，以4-2的总比分淘汰对手，51年队史首次打进分区决赛。</p>
<p class="one-p"><strong>双方首发</strong></p>
<p class="one-p">爵士：康利、米切尔、罗伊斯-奥尼尔、博格达诺维奇、戈贝尔</p>
<p class="one-p">快船：雷吉-杰克逊、乔治、曼恩、小莫里斯、巴图姆</p>
<div id="Status"><div data-reactroot="" class="article-status"><div></div><div class="statement">免责声明：本文来自腾讯新闻客户端自媒体，不代表腾讯网的观点和立场。</div></div></div>
</div>`
      }
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.search-detail-wrapper{
  background: #F4F5FB;
  padding: 30px 0;


  .search-info-wrapper{
    width: calc(~"100vw - 280px");
    background: #fff;
    border-radius: 14px;
    z-index: 1000;
    margin-left: 140px;

    .search-info-head-wrapper{
      position: relative;
      height: 400px;
      overflow: hidden;

      .search-bac-img{
        height: 500px;
        width: calc(~"100% + 100px");
        object-fit: cover;
        -webkit-filter: blur(13px); /* Chrome, Safari, Opera */
        filter: blur(13px);
        position: relative;
        left: -50px;
      }

      .search-title{
        font-weight: bold;
        color: #FBFBFD;
        position: absolute;
        font-size: 40px;
        left: 100px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .search-content-wrapper{
      padding: 30px 100px;
    }
  }
}
</style>
