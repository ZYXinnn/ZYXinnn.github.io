

    //TODO
    console.log("获取访客信息")
    var userinfodom = document.getElementById("userip")
    // var updatetemp = temp.getElementsByClassName("item-content")[0].innerHTML
    // console.log(updatetemp)
    $.ajax({
        url:"https://ip.help.bj.cn",
        type:"GET",
        data:{},
        beforeSend:function(){
            // console.log("请求前")
        },
        success:function (data) {
        //    var data=JSON.parse(data);
           let userinfo = data.data[0]
        //   定义一个str
        //    if(userinfo != null){
            var userip = "你来自:&nbsp;&nbsp;&nbsp;"+ userinfo.nation + "&nbsp;" + userinfo.province + userinfo.city + "<br>"
            userip += "你的ip:&nbsp;&nbsp;&nbsp;" + userinfo.ip + "<br>"
            userip += "城市邮编:&nbsp;&nbsp;&nbsp;" + userinfo.adcode + "<br>"
            userip += "气温:&nbsp;&nbsp;&nbsp;" + userinfo.weather.weather + "&nbsp;" + userinfo.weather.temp
            // console.log(updatetemp)
            // updatetemp.innerHTML = userip
            userinfodom.getElementsByClassName("item-content")[0].innerHTML = userip
        //    }
        //    console.log("ajax请求");
        },
        error:function (e) {
         console.log("请求错误");
         console.log(e)
        }
    });