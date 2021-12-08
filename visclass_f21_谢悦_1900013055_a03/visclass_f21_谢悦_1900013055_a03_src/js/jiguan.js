var echart_jiguan = echarts.init(document.getElementById('jiguan'));

function handledata_jiguan(startyear, endyear,list_k,treeInfo,list_h) {
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
    console.log(data_filtered);
    var si_data = []
    var si_dict = {}
    for (var item of data_filtered) {
        var si = item['司'];
        if (si in si_dict) {
            si_data[si_dict[si]]['children'].push(item);
        }
        else {
            si_dict[si] = si_data.length;
            si_data.push({
                "name": si,
                "children": [item]
            });
        }
    }
    for (var i=0;i<si_data.length;i++) {
        var fu_data = []
        var fu_dict = {}
        for (var item of si_data[i]['children']) {
            var fu = item['府'];
            if (fu in fu_dict) {
                fu_data[fu_dict[fu]]['children'].push(item);
            }
            else {
                fu_dict[fu] = fu_data.length;
                fu_data.push({
                    "name": fu,
                    "children": [item]
                });
            }
        }
        for (var j=0; j<fu_data.length; j++) {
            var xian_data = [];
            var xian_dict = {};
            for (var item of fu_data[j]['children']) {
                xian = item['县'];
                if (xian in xian_dict) {
                    xian_data[xian_dict[xian]]['value'] += 1;
                }
                else {
                    xian_dict[xian] = xian_data.length;
                    xian_data.push({
                        "name": xian,
                        "value": 1
                    });
                }
            }
            fu_data[j]['children'] = xian_data;
        }
        si_data[i]['children'] = fu_data;
    }
    return si_data;
}

function getLevelOption() {
    return [
        {
          itemStyle: {
            borderColor: '#555',
            borderWidth: 4,
            gapWidth: 4
          }
        },
        {
          colorSaturation: [0.3, 0.6],
          itemStyle: {
            borderColorSaturation: 0.7,
            gapWidth: 2,
            borderWidth: 2
          }
        },
        {
          colorSaturation: [0.3, 0.5],
          itemStyle: {
            borderColorSaturation: 0.6,
            gapWidth: 1
          }
        },
        {
          colorSaturation: [0.3, 0.5]
        }
    ];
}

function option_jiguan(startyear , endyear,list_k,treeInfo,list_h) {
    var option = {
        title: {
            text: '进士籍贯 Squarified Treemap',
        },
        // "backgroundColor": "rgba(254,248,239,1)",
        tooltip: {
            formatter: function (info) {
                var value = info.value;
                var treePathInfo = info.treePathInfo;
                var treePath = [];
                for (var i = 1; i < treePathInfo.length; i++) {
                    treePath.push(treePathInfo[i].name);
                }
                return [
                    '<div class="tooltip-title">' +
                    echarts.format.encodeHTML(treePath.join('/')) +' ' + echarts.format.addCommas(value) + '人'
                ].join('');
            }
        },
        series: [
            {
                name: '明代',
                type: 'treemap',
                visibleMin: 300,
                leafDepth:1,
                label: {
                    show: true,
                    formatter: '{b}'
                },
                itemStyle: {
                    borderColor: '#fff'
                },
                levels: getLevelOption(),
                data: handledata_jiguan(startyear, endyear,list_k,treeInfo,list_h)
            }
        ]
    }
    return option;
}


echart_jiguan.setOption(option_jiguan(startyear=1371, endyear=1610,list_k = kemu_list,treeInfo = {0:{dataIndex:0,name: "进士籍贯",value: 13388}},list_h = huji_list));
