var echart_huji = echarts.init(document.getElementById('huji'));

function handleseries_huji(startyear, endyear,list_k,treeInfo,list_h) {    
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
    current_year = year_list.filter(function (year) {
        return startyear <= year && year <= endyear;
    });
    var huji_data = []
    for(var hh in huji_list){
        huji_data[huji_list[hh]] = {};
        for(var yy=startyear;yy<=endyear;yy++){
            huji_data[huji_list[hh]][yy]=0;
        }
    }
    for (var item of data_filtered) {
        year = item.年份
        huji = item.户籍
        huji_data[huji][year]++;
    }
    series_data = []
    for (var j of huji_list) {
        huji_data_filtered = []
        for (var i=0;i<current_year.length;i++){
            year = current_year[i];
            huji_data_filtered.push([i, huji_data[j][year]]);
        }
        // console.log(huji_data_filtered);
        series_data.push({
            type: 'line',
            // stack: 'Total',
            name: j,
            labelLayout: {
                moveOverlap: 'shiftY'
            },
            emphasis: {
                focus: 'series'
            },
            // areaStyle: {},
            data: huji_data_filtered,
            smooth: true,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1)
            },
        });
    }
    return series_data
}

function option_huji(startyear, endyear,list_k,treeInfo,list_h) {
    return {
        animationDuration: 1000,
        title: {
            text: "户籍折线图",
        },
        // "backgroundColor": "rgba(254,248,239,1)",
        legend:{
            show: true,
            padding: 5,
            itemGap: 10,
            itemWidth: 25,
            itemHeight: 14
        },
        tooltip: {
            order: 'valueDesc',
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: {
            name: "年份（年）",
            nameLocation: "end",
            data: year_list.filter(function (year) {
                return startyear <= year && year <= endyear;
            }),
            splitLine: {
                show: true
            }
        },
        yAxis: {
            name: "进士数（人）",
            boundaryGap: false,
            splitLine: {
                show: true
            }
        },
        grid: {
            right: 140
        },
        series: handleseries_huji(startyear, endyear,list_k,treeInfo,list_h),
        dataZoom:{
            type: "slider",
            start: 0,
            end: 100
        },
    };
}

echart_huji.setOption(option_huji(startyear=1371, endyear=1610,list_k = kemu_list,treeInfo = {0:{dataIndex:0,name: "进士籍贯",value: 13388}},list_h = huji_list));
