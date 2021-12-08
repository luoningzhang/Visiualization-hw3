var echart_nianling = echarts.init(document.getElementById('nianling'));

function handleseries_nianling(startyear, endyear,list_k,treeInfo,list_h) {    
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
        return startyear <= item.年份 && item.年份 <= endyear && kemu_bool && tree_bool && huji_bool;
    });
    // console.log(list_k);
    var nianling_data = []
    for (var item of data_filtered) {
        nianling = item.年龄
        if (nianling_data[nianling] == null) {
            nianling_data[nianling] = {name:nianling,value:0};
        }
        nianling_data[nianling].value++;
    }
    var return_data = []
    for (var item in nianling_data) {
        nianling = nianling_data[item];
        return_data.push([nianling.name,nianling.value])
        // console.log(nianling);
    }
    return {
        type: 'line',
        showSymbol:false,
        data: return_data,
        smooth: true,
    };
}

function option_nianling(startyear, endyear, list_k,treeInfo,list_h) {
    return {
        animationDuration: 1000,
        title: {
            text: "年龄分布折线图",
        },
        // "backgroundColor": "rgba(254,248,239,1)",
        tooltip: {
            order: 'valueDesc',
            trigger: 'axis',
            formatter: function (info) {
                var value0 = info[0].value[0];
                var value1 = info[0].value[1];
                return [
                    '<div class="tooltip-title">' + echarts.format.addCommas(value0) +'岁 ' + echarts.format.addCommas(value1) + '人'
                ].join('');
            }
        },
        xAxis: {
            name: "年龄（岁）",
            nameLocation: 'end'
        },
        yAxis: {
            name: "进士数（人）",
        },
        grid: {
            right: 140
        },
        series: handleseries_nianling(startyear, endyear, list_k,treeInfo,list_h),
    };
}

echart_nianling.setOption(option_nianling(startyear=1371, endyear=1610,list_k = kemu_list,treeInfo = {0:{dataIndex:0,name: "进士籍贯",value: 13388}},list_h = huji_list));
