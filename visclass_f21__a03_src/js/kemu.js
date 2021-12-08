var echart_kemu = echarts.init(document.getElementById('kemu'));
var color_list =  [
    "#c12e34",
    "#e6b600",
    "#0098d9",
    "#2b821d",
    "#005eaa",
    "#339ca8",
    "#cda819",
    "#32a487"];
function handledata_kemu(startyear, endyear, list_k,treeInfo,list_h) {
    data_filtered = data.filter(function(item){
        var kemu_bool = 0;
        for(var id in list_k){
            // console.log(list_k[id]);
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
    kemu_data = []
    for (var item of data_filtered){
        kemu = item.科目
        if (kemu_data[kemu] == null) {
            kemu_data[kemu] = {value:0,name:kemu};
        }
        kemu_data[kemu].value++;
    }
    return_data = []
    for (var item in kemu_data){
        return_data.push(kemu_data[item]);
    }
    // console.log(data);
    return return_data
}

function option_kemu(startyear, endyear, list_k,treeInfo,list_h) {
    return {
        title: {
            text: "科目 饼图",
        },
        tooltip: {
            show: true,
            trigger: "item",
        },
        "color": [
            "#d87c7c",
            "#919e8b",
            "#d7ab82",
            "#6e7074",
            "#61a0a8",
            "#efa18d",
            "#787464",
            "#cc7e63",
            "#724e58",
            "#4b565b"
        ],
        // "backgroundColor": "rgba(254,248,239,1)",
        borderColor: "rgba(205, 102, 102, 1)",
        legend: {
            show: true,
            top: 'bottom'
        },
        series: {
            type: 'pie',
            radius: '50%',
            data: handledata_kemu(startyear, endyear, list_k,treeInfo,list_h),
            emphasis: {
                itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    };
}

echart_kemu.setOption(option_kemu(startyear=1371, endyear=1610,list_k = kemu_list,treeInfo = {0:{dataIndex:0,name: "进士籍贯",value: 13388}},list_h = huji_list));


