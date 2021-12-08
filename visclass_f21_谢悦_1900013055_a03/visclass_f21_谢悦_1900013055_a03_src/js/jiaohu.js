var startyear=1371
var endyear=1610
var kemu_list_jiaohu = ["诗经","书经","易经","礼记","春秋"];
var huji_list_jiaohu = ["民籍","军籍","官籍","匠籍","灶籍","监籍","站籍"];
var treemapInfo = {0:{dataIndex:0,name: "进士籍贯",value: 13388}};

echart_huji.on('datazoom', function (params) {
    function Range(a, b, Percent) {
        return a + (b - a) * Percent / 100
    }
    var startValue = echart_huji.getModel().option.dataZoom[0].startValue;
    var endValue = echart_huji.getModel().option.dataZoom[0].endValue;
    //获得起止位置百分比

    startyear = year_list[startValue];
    endyear = year_list[endValue];
    treemapInfo ={0:{dataIndex:0,name: "进士籍贯",value: 13388}};

    echart_kemu.setOption({series:{data: handledata_kemu(startyear, endyear, kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)}});
    echart_jiguan.setOption({series:{data: handledata_jiguan(startyear, endyear,kemu_list_jiaohu,{0:{dataIndex:0,name: "进士籍贯",value: 13388}},huji_list_jiaohu)}});
    echart_nianling.setOption({series: handleseries_nianling(startyear, endyear, kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)});
    // console.log(startyear, endyear)

});

echart_kemu.on('click', function(params) {
    // console.log(params);
    // console.log(treemapInfo);
    if (params.componentType === 'series') {
        treemapInfo ={0:{dataIndex:0,name: "进士籍贯",value: 13388}};
        if(kemu_list_jiaohu.length ==1 &&kemu_list_jiaohu[0]==params.name){
            kemu_list_jiaohu = ["诗经","书经","易经","礼记","春秋"];
            echart_huji.setOption({series: handleseries_huji(1371,1610,kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)});
            echart_kemu.setOption({series:{data: handledata_kemu(startyear, endyear, kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)}});
            echart_jiguan.setOption({series:{data:handledata_jiguan(startyear, endyear,kemu_list_jiaohu,{0:{dataIndex:0,name: "进士籍贯",value: 13388}},huji_list_jiaohu)}});
            echart_nianling.setOption({series:handleseries_nianling(startyear, endyear, kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)});
        }
        else{
            kemu_list_jiaohu = [params.name];
            
            echart_huji.setOption({series: handleseries_huji(1371,1610,kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)});
            echart_kemu.setOption({series:{data: handledata_kemu(startyear, endyear, kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)}});
            echart_jiguan.setOption({series:{data:handledata_jiguan(startyear, endyear,kemu_list_jiaohu,{0:{dataIndex:0,name: "进士籍贯",value: 13388}},huji_list_jiaohu)}});
            echart_nianling.setOption({series:handleseries_nianling(startyear, endyear, kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)});
        }
        // console.log(startyear, endyear)
    }
});

echart_jiguan.on('click', function(params) {
    if (params.componentType === 'series'){
        // console.log(params.treePathInfo);
        treemapInfo = params.treePathInfo;

        // console.log(echart_jiguan.getOption());
        echart_huji.setOption({series: handleseries_huji(1371,1610,kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)});
        echart_kemu.setOption({series:{data: handledata_kemu(startyear, endyear, kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)}});
        echart_nianling.setOption({series: handleseries_nianling(startyear, endyear, kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)});

    }

});

echart_huji.on('click','series.line', function(params) {
    // console.log(params);
    // console.log(treemapInfo);
    if (params.componentType === 'series') {
        treemapInfo ={0:{dataIndex:0,name: "进士籍贯",value: 13388}};
        if(huji_list_jiaohu.length ==1 &&huji_list_jiaohu[0]==params.seriesName){
            huji_list_jiaohu = ["民籍","军籍","官籍","匠籍","灶籍","监籍","站籍"];
            echart_huji.setOption({series: handleseries_huji(1371,1610,kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)});
            echart_kemu.setOption({series:{data: handledata_kemu(startyear, endyear, kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)}});
            echart_jiguan.setOption({series:{data:handledata_jiguan(startyear, endyear,kemu_list_jiaohu,{0:{dataIndex:0,name: "进士籍贯",value: 13388}},huji_list_jiaohu)}});
            echart_nianling.setOption({series:handleseries_nianling(startyear, endyear, kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)});
        }
        else{
            huji_list_jiaohu = [params.seriesName];
            echart_huji.setOption({series: handleseries_huji(1371,1610,kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)});
            echart_kemu.setOption({series:{data: handledata_kemu(startyear, endyear, kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)}});
            echart_jiguan.setOption({series:{data:handledata_jiguan(startyear, endyear,kemu_list_jiaohu,{0:{dataIndex:0,name: "进士籍贯",value: 13388}},huji_list_jiaohu)}});
            echart_nianling.setOption({series:handleseries_nianling(startyear, endyear, kemu_list_jiaohu,treemapInfo,huji_list_jiaohu)});
        }
    }

});
echart_nianling.on('click', function(params) {
    list_h = huji_list_jiaohu;
    list_k = kemu_list_jiaohu;
    treeInfo = treemapInfo;
    data_filtered = data.filter(function(item){
        kemu_bool = 0;
        for(var id in list_k){
            if(list_k[id]==item.科目)kemu_bool = 1;
        }
        huji_bool = 0;
        for(var id in list_h){
            if(list_h[id]==item.户籍)huji_bool = 1;
        }
        var tree_bool = 1;
        if(treeInfo.length>1){
            if(item.司 === treeInfo[1].name){
                if(treeInfo.length>2){
                    if(item.府 === treeInfo[2].name){
                        if(treeInfo.length>3){
                            if(item.县 === treeInfo[3].name){
                                tree_bool = 1;
                            }
                            else tree_bool = 0
                        }
                    }
                    else tree_bool = 0
                }
            }
            else tree_bool = 0
        }
        return startyear <= item.年份 && item.年份 <= endyear && kemu_bool && tree_bool && huji_bool&&item.年龄 === params.value[0];
    });
    var str = "";
    for(var i=0;i < data_filtered.length;i++){
        var item = data_filtered[i];
        // console.log(item);
        str = str+echarts.format.addCommas(item.姓名)+": "+echarts.format.addCommas(item.年份)+"年 "+echarts.format.addCommas(item.年龄)+"岁 "+echarts.format.addCommas(item.籍贯)+" "+echarts.format.addCommas(item.户籍)+" "+echarts.format.addCommas(item.科目)+"\n";
    }
    // console.log(str);
    alert(str);
    // console.log(params);
});
echart_nianling.on('dblclick', function(params) {
    confirm("太频繁了~送你一个小惊喜");
    // console.log(params);
    window.open('https://pkuhelper.pku.edu.cn/hole/');
});
echart_huji.on('dblclick', function(params) {
    confirm("太频繁了~送你一个小惊喜O(∩_∩)O~");
    // console.log(params);
    window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.seriesName));
});
echart_jiguan.on('dblclick', function(params) {
    confirm("太频繁了~送你一个小惊喜（づ￣3￣）づ╭❤～");
    // console.log(params);
    window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
});
echart_kemu.on('dblclick', function(params) {
    confirm("太频繁了~送你一个小惊喜ヾ(✿ﾟ▽ﾟ)ノ");
    // console.log(params);
    window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
});