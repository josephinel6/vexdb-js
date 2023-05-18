var vexiq = "#0174c6";
var vexv5 = "#d8292e";

//* API URLs
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiYjVhN2ZjOWFhOTFkOTBlZDg1NDI2NzlhZDQwN2FkNjQwNjFhMjQ0NjhjYzI4ODg0MGUyZDE5YzFhZDBjMmQ1NzY2MjM5MmE2YTdhZDY4ZGEiLCJpYXQiOjE2ODM3NjIwNDEuNjk1MjAzMSwibmJmIjoxNjgzNzYyMDQxLjY5NTIwNzEsImV4cCI6MjYzMDUzNjg0MS42ODYyMjIxLCJzdWIiOiIxMTUxMzEiLCJzY29wZXMiOltdfQ.XoxNTREVpPXphGAs0k_DMpkOAkuZKdOzGk3GEOmJCLWqzhs2M8uopYJ5Haf3bLbiyw5JAc1u-k4K0-z86LzJ5fIh_SYjZ1LsocgdbXE-40OICA8hb0u5XwIdX2ssAriayWP07jz2mrglKG0mTEu9vANcpGJ17CVjSqJwsTMEf0T9Y0_nILHlGe2PpYvuvQXIGleB5LpzLnpWcZW4IFFGwuLE5c7WJgIeTcv5OZsOjylST-yyWg_95LzT7jL8Sl1Sm9CCQPnR9q2InHyLAx0up-tLSMSAmzciTZgBaB15O97t3-JmXNdIZ9eMTSTweC_yxWxOJrI1iJ2hTy1p162jobSS3dp0k7JO5drae7NPCCG68Lo40mAv0xIwH-2-zSQjo0ZPn9VWM78CEgeMAbyIseJ2558BHaRsMVsr3b4GTSjZHSvAiBTTLtxqqBiTUjUtcArnQR5UXAPRoFebKF1ZxfePeeCZdEDa7kdqMZ80AwmI0RcoetazCnVeFbHIROC7ANIIyIDMirY9-qhTq4ykX32VwApAtO-WRp7LbTNCMMeY0xM8UJv5EfY0lCOofeXDtCyTGmxz6Vmaw4bGCqmbxmC8iqlXN7tgIfzl12zO_DloSHwF2meNaIVjJXPsw091BHwmPQKsGubmJ9UPKSt3Xw8jhEhepZr-6X394WAwmw8";
var mainurl = "https://www.robotevents.com/api/v2";
var eventsurl = mainurl + "/events";
var teamsurl = mainurl + "/teams";
var myHeaders = new Headers();

myHeaders.append('Content-Type', 'application/json; charset=utf-8');
myHeaders.append('Authorization', 'Bearer ' + token);

const data = {

    method: 'GET',
    headers: myHeaders
};

$(function () {
    $("#nav-placeholder").load("https://josephinel6.github.io/vexdb-js/navigation.html");
});

// function openpage(pageName) {
//     // var i, tabcontent, tablinks;
//     // tabcontent = document.getElementsByClassName("tabcontent");
//     // for (i = 0; i < tabcontent.length; i++) {
//     //     tabcontent[i].style.display = "none";
//     // }
//     var i, tabcontent, tablinks;
//     tabcontent = document.getElementsByClassName("tabcontent");
//     for (i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].style.display = "none";
//     }
//     tablinks = document.getElementsByClassName("tablink");
//     for (i = 0; i < tablinks.length; i++) {
//         tablinks[i].style.backgroundColor = "";
//     }
//     document.getElementById(pageName).style.display = "block";
//     // document.getElementsByClassName("offcanvas").document.getElementById(pageName).style.display = "block";

//     if (pageName == "teamspage") {
//         getTeams(1)
//     }
//     if (pageName == "eventspage") {
//         getEvents(1)
//     }

//     document.body.scrollTop = 0;
//     document.documentElement.scrollTop = 0;
// }

var viewteamid;

function getTeams(page) {
    var teamstodelete = document.querySelectorAll(".teamsdiv");
    teamstodelete.forEach(teamstodelete => {
        teamstodelete.remove();
        console.log("remove")
    })
    var pleasewait = document.createElement("img")
    pleasewait.src = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
    document.getElementById("teamspage").appendChild(pleasewait)
    pleasewait.className = "pleasewait"
    fetch(teamsurl + "?per_page=100" + "?page=" + page, data)
        .then(response => response.json())
        .then(response => {
            console.log(teamsurl + "?page=" + page + "&per_page=100")
            console.log(response);
            console.log(Object.keys(response.data).length)
            // console.log(response.meta.last_page);
            // if (response.meta.next_page_url != null) {
            pleasewait.remove();
            for (i = 0; i < Object.keys(response.data).length; i++) {
                console.log(response.data[i].team_name);
                var teamdiv = document.createElement("div");
                teamdiv.id = response.data[i].id;
                teamdiv.className = "teamdiv";
                document.getElementById("teamslist").appendChild(teamdiv);
                var programcontainer = document.createElement("div");
                programcontainer.className = "programcontainer";
                teamdiv.appendChild(programcontainer);
                var teamprogram = document.createElement("div");
                teamprogram.className = "program";
                programcontainer.appendChild(teamprogram);
                var teamnumbercontainer = document.createElement("div");
                teamnumbercontainer.className = "teamnumbercontainer";
                teamdiv.appendChild(teamnumbercontainer)
                var teamnumber = document.createElement("p");
                teamnumbercontainer.appendChild(teamnumber);
                teamnumber.innerHTML = response.data[i].number;
                teamnumber.style.display = "inline-block"
                var teamnamecontainer = document.createElement("div");
                teamnamecontainer.className = "teamnamecontainer";
                teamdiv.appendChild(teamnamecontainer)
                var teamname = document.createElement("p");
                teamnamecontainer.appendChild(teamname);
                teamname.innerHTML = response.data[i].team_name;
                teamname.className = "teamname";
                teamname.style.display = "inline-block"
                var teamorgcontainer = document.createElement("div");
                teamorgcontainer.className = "teamorgcontainer"
                var teamorg = document.createElement("p");
                teamorgcontainer.appendChild(teamorg)
                teamdiv.appendChild(teamorgcontainer);
                var teamlocationcontainer = document.createElement("div");
                teamlocationcontainer.className = "teamlocationcontainer"
                var teamlocation = document.createElement("p");
                teamlocationcontainer.appendChild(teamlocation);
                teamorg.innerHTML = response.data[i].organization;
                teamlocation.innerHTML = response.data[i].location.region + ", " + response.data[i].location.country;
                teamdiv.appendChild(teamlocationcontainer);
                if (response.data[i].program.code == "VEXU") {
                    teamprogram.innerHTML = "VEXU";
                    teamprogram.style.backgroundColor = "black";
                }
                else if (response.data[i].program.code == "VRC") {
                    teamprogram.innerHTML = "VRC";
                    teamprogram.style.backgroundColor = vexv5;

                }
                else if (response.data[i].program.code == "VIQC") {
                    teamprogram.innerHTML = "IQ";
                    teamprogram.style.backgroundColor = vexiq;

                }
                // programcontainer.style.backgroundColor = "blue";
                // teamnumbercontainer.style.backgroundColor = "red";
                // teamnamecontainer.style.backgroundColor = "black";
                // teamorgcontainer.style.backgroundColor = "blue";
                // teamlocationcontainer.style.backgroundColor = "black";

                teamname.setAttribute("onclick", "gotoviewteam(" + response.data[i].id + ")");
            }
            document.getElementById("teamslistpageselection").style.display = "block";
            document.getElementById("teamslisttotalpages").innerHTML = "of " + response.meta.last_page;
            // for (i = 0; i < response.meta.last_page; i++) {
            //     fetch(teamsurl + "?page=" + i, data)
            //         .then(response => response.json())
            //         .then(response => {
            //             console.log()
            //         })
            // }
            // else {
            //     break;
            // }
            // document.getElementById("numofproducts").innerHTML = Object.keys(response).length;
            // console.log(Object.keys(response).length)
            // num = Object.keys(response).length;
            // for (t = 0; t < num; t++) {

            //     var div = document.createElement("div");
            //     div.id = "item" + t;
            //     div.className = "item";
            //     document.body.appendChild(div);
            //     document.getElementById("productspage").appendChild(div);
            //     var img = document.createElement("img");
            //     document.getElementById("item" + t).appendChild(img);
            //     img.id = "productimg" + t;
            //     img.className = "itemimg";
            //     div.style.display = "inline-block";
            //     div.style.verticalAlign = "middle";
            //     img.style.objectFit = "contain";
            //     img.src = "https:" + response[t].api_featured_image;
            //     console.log("https:" + response[t].api_featured_image)
            //     var itembrand = document.createElement("div");
            //     itembrand.id = "itembrand" + t;
            //     itembrand.className = "itembrand";
            //     itembrand.innerHTML = response[t].brand;
            //     div.appendChild(itembrand);
            //     var itemname = document.createElement("div");
            //     itemname.id = "itemname" + t;
            //     itemname.className = "itemname";
            //     itemname.setAttribute("onclick", "viewproduct('" + load + "', '" + response[t].id + "')")
            //     img.setAttribute("onclick", "viewproduct('" + load + "', '" + response[t].id + "')")
            //     div.appendChild(itemname);
            //     itemname.style.bottom = "0";
            //     itemname.style.color = "black";
            //     itemname.innerHTML = response[t].name;
            //     itembrand.setAttribute("onclick", "productslistbrand('" + response[t].brand.split(' ').join('+') + "')")
            // }
        })

}

function getEvents(page) {
    var eventstodelete = document.querySelectorAll(".eventdiv");
    eventstodelete.forEach(eventstodelete => {
        eventstodelete.remove();
        console.log("remove")
    })
    var pleasewait = document.createElement("img")
    pleasewait.src = "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
    document.getElementById("eventspage").appendChild(pleasewait)
    pleasewait.className = "pleasewait"
    fetch(eventsurl + "?per_page=100", data)
        .then(response => response.json())
        .then(response => {
            console.log(teamsurl + "?page=" + page + "&per_page=100")
            console.log(response);
            console.log(Object.keys(response.data).length)
            // console.log(response.meta.last_page);
            // if (response.meta.next_page_url != null) {
            pleasewait.remove();
            for (i = 0; i < Object.keys(response.data).length; i++) {
                // console.log(response.data[i].team_name);

                var eventdiv = document.createElement("div");
                eventdiv.id = "eventdiv" + i;
                eventdiv.className = "eventdiv";
                document.getElementById("eventslist").appendChild(eventdiv);
                var eventprogramcontainer = document.createElement("div");
                eventprogramcontainer.className = "programcontainer";
                eventdiv.appendChild(eventprogramcontainer);
                var eventprogram = document.createElement("div");
                eventprogramcontainer.appendChild(eventprogram)
                eventprogram.className = "program";
                var eventnamecontainer = document.createElement("div");
                eventnamecontainer.className = "eventnamecontainer";
                eventdiv.appendChild(eventnamecontainer)
                var eventname = document.createElement("p");
                eventnamecontainer.appendChild(eventname);
                eventname.innerHTML = response.data[i].name;
                eventname.className = "eventname";
                eventname.style.display = "inline-block"
                var eventdatecontainer = document.createElement("div");
                eventdatecontainer.className = "eventdatecontainer"
                var eventdate = document.createElement("p");
                eventdatecontainer.appendChild(eventdate)
                eventdiv.appendChild(eventdatecontainer);
                var eventlocationcontainer = document.createElement("div");
                eventlocationcontainer.className = "eventlocationcontainer"
                var eventlocation = document.createElement("p");
                eventlocationcontainer.appendChild(eventlocation);
                if (response.data[i].start == response.data[i].start) {
                    eventdate.innerHTML = response.data[i].start.split("T")[0];
                }
                else {
                    eventdate.innerHTML = response.data[i].start.split("T")[0] + "through " + response.data[i].end.split("T")[0];
                }
                eventlocation.innerHTML = response.data[i].location.region + ", " + response.data[i].location.country;
                eventdiv.appendChild(eventlocationcontainer);
                console.log(eventname.innerHTML + ", " + eventdate.innerHTML + ", " + eventlocation.innerHTML);

                if (response.data[i].program.code == "VEXU") {
                    eventprogram.innerHTML = "VEXU";
                    eventprogram.style.backgroundColor = "black";
                }
                else if (response.data[i].program.code == "VRC") {
                    eventprogram.innerHTML = "VRC";
                    eventprogram.style.backgroundColor = vexv5;

                }
                else if (response.data[i].program.code == "VIQC") {
                    eventprogram.innerHTML = "IQ";
                    eventprogram.style.backgroundColor = vexiq;

                }
                else {
                    console.log("Event program" + response.data[i].program.code)
                    eventprogram.innerHTML = "null";

                }
            }

            document.getElementById("eventslistpageselection").style.display = "block";
            document.getElementById("eventslisttotalpages").innerHTML = "of " + response.meta.last_page;

        })

}
var teamranking;

function gotoviewteam(teamid) {
    console.log("team = " + teamid)
    viewteamid = teamid;
    window.location.replace('viewteam.html?teamid=' + teamid);
}

var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
var daysinweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

async function viewteam() {
    const teamsviewurl = new URLSearchParams(location.search);
    viewteamid = teamsviewurl.get("teamid");
    console.log(viewteamid)
    fetch(teamsurl + "/" + viewteamid, data)
        .then(response => response.json())
        .then(response => {
            console.log("fetch")
            console.log(response)
            document.getElementById("viewteamwindow").style.display = "block";
            document.getElementById("viewteamname").innerHTML = response.number + ": " + response.team_name;
            document.getElementById("viewteamorg").innerHTML = response.organization;
            document.getElementById("viewteamprogram").innerHTML = response.program.code;
            document.getElementById("viewteamlocation").innerHTML = response.location.city + ", " + response.location.region + ", " + response.location.country;
            document.getElementById("viewteamwebsite").innerHTML = "Robotevents Profile"
            document.getElementById("viewteamwebsite").href = "https://www.robotevents.com/teams/" + response.program.code + "/" + response.number;
            // document.getElementById("viewteamwebsite").setAttribute(onclick, function () { window.open("www.robotevents.com/teams/" + response.program.code + "/" + response.number, "_self") });
            // document.getElementById("viewteamwindow").appendChild(teamname);
            // var teamorg = document.createElement("h5");
            // teamorg.style.color = "gray";
            // teamorg.style.marginTop = "-2px"
            // teamorg.innerHTML = response.organization;
            // document.getElementById("viewteamwindow").appendChild(teamorg);
        })
    await fetch(teamsurl + "/" + viewteamid + "/events", data)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            for (i = 0; i < response.data.length; i++) {
                var teameventdiv = document.createElement("div");
                teameventdiv.className = "viewteameventdiv"
                document.getElementById("viewteamwindow").appendChild(teameventdiv);
                var eventtitle = document.createElement("h4");
                eventtitle.innerHTML = response.data[i].name;
                teameventdiv.appendChild(eventtitle);
                var eventdate = document.createElement("h6")
                eventdate.style.marginTop = "-2px"
                document.getElementById("viewteameventsbox").appendChild(teameventdiv);
                teameventdiv.appendChild(eventdate);
                if (response.data[i].start == response.data[i].end) {
                    // var date = new Date(response.data[i].start.split("-")[0], response.data[i].start.split("-")[1], response.data[i].start.split("-")[2]);
                    var date = new Date(response.data[i].start)
                    eventdate.innerHTML = daysinweek[date.getDay()] + " " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
                    console.log(date)
                }
                else {
                    var startdate = new Date(response.data[i].start);
                    var enddate = new Date(response.data[i].end);
                    eventdate.innerHTML = "From " + daysinweek[startdate.getDay()] + " " + months[startdate.getMonth()] + " " + startdate.getDate() + ", " + startdate.getFullYear() + " to " + daysinweek[enddate.getDay()] + " " + months[enddate.getMonth()] + " " + enddate.getDate() + ", " + enddate.getFullYear()
                }
                var rankingicon = document.createElement("i");
                rankingicon.className = "fa fa-list-ol";
                var rankingnum = document.createElement("p");
                rankingnum.style.display = "inline-block";
                rankingnum.style.marginLeft = "5px";
                // rankingnum.id = "rankingnum" + i;
                rankingnum.setAttribute("id", "rankingnum" + i)
                teameventdiv.appendChild(rankingicon);
                teameventdiv.appendChild(rankingnum);
                var tempp = document.createElement("p");
                tempp.innerHTML = " "
                tempp.style.marginTop = "-30px";
                var awardsicon = document.createElement("i");
                awardsicon.className = "fa fa-trophy";
                awardsicon.setAttribute("id", "awardsicon" + i);
                awardsicon.style.display = "none";
                // awardsicon.style.position = "absolute";
                var awardslist = document.createElement("p");
                awardslist.style.display = "inline-block";
                awardslist.style.marginLeft = "5px";
                // awardslist.style.position = "absolute";
                // awardslist.id = "awardslist" + i;
                awardslist.setAttribute("id", "awardslist" + i)
                teameventdiv.appendChild(rankingicon);
                teameventdiv.appendChild(rankingnum);

                teameventdiv.appendChild(tempp);
                teameventdiv.appendChild(awardsicon);
                teameventdiv.appendChild(awardslist);
                // var teamrankresponse = await fetch()
                geteventrankingforteam(viewteamid, response.data[i].id, i);
                geteventawardsforteam(viewteamid, response.data[i].id, i);
                geteventdataforteam(viewteamid, response.data[i].id, i)
                // teamranking = fetch(teamsurl + "/" + viewteamid + "/rankings?event=" + response.data[i].id, data);
                // rankingnum.innerHTML = teamranking.data[0].rank;

                // fetch(teamsurl + "/" + viewteamid + "/rankings?event=" + response.data[i].id, data)
                //     .then(response => response.json())
                //     .then(response => {
                //         rankingnum.innerHTML = response.data[0].rank;
                //         console.log(response)
                //         console.log(response.data[0].rank)
                //     })

            }
        })
}

function geteventdataforteam(teamid, eventid, thisthisnum) {
    fetch(teamsurl + "/" + teamid + "/matches?event=" + eventid, data){
        .then(response => response.json())
            .then(response => {
                { "meta": { "current_page": 1, "first_page_url": "https:\/\/www.robotevents.com\/api\/v2\/teams\/139219\/matches?page=1", "from": 1, "last_page": 1, "last_page_url": "https:\/\/www.robotevents.com\/api\/v2\/teams\/139219\/matches?page=1", "next_page_url": null, "path": "https:\/\/www.robotevents.com\/api\/v2\/teams\/139219\/matches", "per_page": 15, "prev_page_url": null, "to": 10, "total": 10 }, "data": [{ "id": 34954622, "event": { "id": 48305, "name": "Battle at the Bolt (MS\/HS)", "code": "RE-VRC-22-8305" }, "division": { "id": 1, "name": "Division 1", "code": null }, "round": 2, "instance": 1, "matchnum": 2, "scheduled": "2022-11-12T10:05:00-05:00", "started": "2022-11-12T10:31:23-05:00", "field": "Field 2", "scored": false, "name": "Qualifier #2", "alliances": [{ "color": "blue", "score": 69, "teams": [{ "team": { "id": 104143, "name": "38678C", "code": null }, "sitting": false }, { "team": { "id": 124192, "name": "38141B", "code": null }, "sitting": false }] }, { "color": "red", "score": 148, "teams": [{ "team": { "id": 139219, "name": "515R", "code": null }, "sitting": false }, { "team": { "id": 116142, "name": "38141A", "code": null }, "sitting": false }] }] }, { "id": 34954629, "event": { "id": 48305, "name": "Battle at the Bolt (MS\/HS)", "code": "RE-VRC-22-8305" }, "division": { "id": 1, "name": "Division 1", "code": null }, "round": 2, "instance": 1, "matchnum": 9, "scheduled": "2022-11-12T10:40:00-05:00", "started": "2022-11-12T10:56:16-05:00", "field": "Field 3", "scored": false, "name": "Qualifier #9", "alliances": [{ "color": "blue", "score": 165, "teams": [{ "team": { "id": 139219, "name": "515R", "code": null }, "sitting": false }, { "team": { "id": 143771, "name": "4233S", "code": null }, "sitting": false }] }, { "color": "red", "score": 70, "teams": [{ "team": { "id": 90313, "name": "9257R", "code": null }, "sitting": false }, { "team": { "id": 46456, "name": "7177B", "code": null }, "sitting": false }] }] }, { "id": 34954638, "event": { "id": 48305, "name": "Battle at the Bolt (MS\/HS)", "code": "RE-VRC-22-8305" }, "division": { "id": 1, "name": "Division 1", "code": null }, "round": 2, "instance": 1, "matchnum": 18, "scheduled": "2022-11-12T11:25:00-05:00", "started": "2022-11-12T11:26:59-05:00", "field": "Field 3", "scored": false, "name": "Qualifier #18", "alliances": [{ "color": "blue", "score": 40, "teams": [{ "team": { "id": 136363, "name": "4233X", "code": null }, "sitting": false }, { "team": { "id": 84030, "name": "8823C", "code": null }, "sitting": false }] }, { "color": "red", "score": 168, "teams": [{ "team": { "id": 139219, "name": "515R", "code": null }, "sitting": false }, { "team": { "id": 114149, "name": "38678D", "code": null }, "sitting": false }] }] }, { "id": 34954650, "event": { "id": 48305, "name": "Battle at the Bolt (MS\/HS)", "code": "RE-VRC-22-8305" }, "division": { "id": 1, "name": "Division 1", "code": null }, "round": 2, "instance": 1, "matchnum": 30, "scheduled": "2022-11-12T12:57:30-05:00", "started": "2022-11-12T12:59:36-05:00", "field": "Field 3", "scored": false, "name": "Qualifier #30", "alliances": [{ "color": "blue", "score": 159, "teams": [{ "team": { "id": 139219, "name": "515R", "code": null }, "sitting": false }, { "team": { "id": 104142, "name": "38678B", "code": null }, "sitting": false }] }, { "color": "red", "score": 102, "teams": [{ "team": { "id": 58413, "name": "8823A", "code": null }, "sitting": false }, { "team": { "id": 133405, "name": "338A", "code": null }, "sitting": false }] }] }, { "id": 34954656, "event": { "id": 48305, "name": "Battle at the Bolt (MS\/HS)", "code": "RE-VRC-22-8305" }, "division": { "id": 1, "name": "Division 1", "code": null }, "round": 2, "instance": 1, "matchnum": 36, "scheduled": "2022-11-12T13:30:30-05:00", "started": "2022-11-12T13:30:10-05:00", "field": "Field 3", "scored": false, "name": "Qualifier #36", "alliances": [{ "color": "blue", "score": 72, "teams": [{ "team": { "id": 58415, "name": "8823B", "code": null }, "sitting": false }, { "team": { "id": 85331, "name": "8823E", "code": null }, "sitting": false }] }, { "color": "red", "score": 160, "teams": [{ "team": { "id": 85332, "name": "8823F", "code": null }, "sitting": false }, { "team": { "id": 139219, "name": "515R", "code": null }, "sitting": false }] }] }, { "id": 34954665, "event": { "id": 48305, "name": "Battle at the Bolt (MS\/HS)", "code": "RE-VRC-22-8305" }, "division": { "id": 1, "name": "Division 1", "code": null }, "round": 2, "instance": 1, "matchnum": 45, "scheduled": "2022-11-12T14:20:00-05:00", "started": "2022-11-12T14:06:45-05:00", "field": "Field 3", "scored": false, "name": "Qualifier #45", "alliances": [{ "color": "blue", "score": 183, "teams": [{ "team": { "id": 139219, "name": "515R", "code": null }, "sitting": false }, { "team": { "id": 111356, "name": "18628A", "code": null }, "sitting": false }] }, { "color": "red", "score": 30, "teams": [{ "team": { "id": 142669, "name": "4233N", "code": null }, "sitting": false }, { "team": { "id": 72046, "name": "56772A", "code": null }, "sitting": false }] }] }, { "id": 34954677, "event": { "id": 48305, "name": "Battle at the Bolt (MS\/HS)", "code": "RE-VRC-22-8305" }, "division": { "id": 1, "name": "Division 1", "code": null }, "round": 3, "instance": 1, "matchnum": 1, "scheduled": null, "started": "2022-11-12T15:52:43-05:00", "field": null, "scored": false, "name": "QF #1-1", "alliances": [{ "color": "blue", "score": 52, "teams": [{ "team": { "id": 114149, "name": "38678D", "code": null }, "sitting": false }, { "team": { "id": 56473, "name": "9364D", "code": null }, "sitting": false }] }, { "color": "red", "score": 176, "teams": [{ "team": { "id": 139219, "name": "515R", "code": null }, "sitting": false }, { "team": { "id": 56472, "name": "9364C", "code": null }, "sitting": false }] }] }, { "id": 34954681, "event": { "id": 48305, "name": "Battle at the Bolt (MS\/HS)", "code": "RE-VRC-22-8305" }, "division": { "id": 1, "name": "Division 1", "code": null }, "round": 4, "instance": 1, "matchnum": 1, "scheduled": null, "started": "2022-11-12T16:08:30-05:00", "field": null, "scored": false, "name": "SF #1-1", "alliances": [{ "color": "blue", "score": 80, "teams": [{ "team": { "id": 93725, "name": "9257F", "code": null }, "sitting": false }, { "team": { "id": 58297, "name": "9257C", "code": null }, "sitting": false }] }, { "color": "red", "score": 156, "teams": [{ "team": { "id": 139219, "name": "515R", "code": null }, "sitting": false }, { "team": { "id": 56472, "name": "9364C", "code": null }, "sitting": false }] }] }, { "id": 34954683, "event": { "id": 48305, "name": "Battle at the Bolt (MS\/HS)", "code": "RE-VRC-22-8305" }, "division": { "id": 1, "name": "Division 1", "code": null }, "round": 5, "instance": 1, "matchnum": 1, "scheduled": null, "started": "2022-11-12T16:33:18-05:00", "field": null, "scored": false, "name": "Final #1-1", "alliances": [{ "color": "blue", "score": 34, "teams": [{ "team": { "id": 63340, "name": "4233B", "code": null }, "sitting": false }, { "team": { "id": 133405, "name": "338A", "code": null }, "sitting": false }] }, { "color": "red", "score": 203, "teams": [{ "team": { "id": 139219, "name": "515R", "code": null }, "sitting": false }, { "team": { "id": 56472, "name": "9364C", "code": null }, "sitting": false }] }] }, { "id": 34954669, "event": { "id": 48305, "name": "Battle at the Bolt (MS\/HS)", "code": "RE-VRC-22-8305" }, "division": { "id": 1, "name": "Division 1", "code": null }, "round": 6, "instance": 1, "matchnum": 1, "scheduled": null, "started": "2022-11-12T15:21:15-05:00", "field": null, "scored": false, "name": "R16 #1-1", "alliances": [{ "color": "blue", "score": 34, "teams": [{ "team": { "id": 124444, "name": "9257X", "code": null }, "sitting": false }, { "team": { "id": 85331, "name": "8823E", "code": null }, "sitting": false }] }, { "color": "red", "score": 191, "teams": [{ "team": { "id": 139219, "name": "515R", "code": null }, "sitting": false }, { "team": { "id": 56472, "name": "9364C", "code": null }, "sitting": false }] }] }] }
            })
    }
}

function geteventrankingforteam(teamid, eventid, num) {
    // teamranking = await fetch(teamsurl + "/" + teamid + "/rankings?event=" + eventid, data);
    // teamranking = await teamranking.json()
    // console.log(teamranking);
    // console.log("Getting rank for " + eventid + " at " + num);
    fetch(teamsurl + "/" + teamid + "/rankings?event=" + eventid, data)
        .then(response => response.json())
        .then(response => {
            document.getElementById("rankingnum" + num).innerHTML = response.data[0].rank;
        })
}



function geteventawardsforteam(teamid, eventid, thisnum) {
    fetch(teamsurl + "/" + teamid + "/awards?event=" + eventid, data)
        .then(response => response.json())
        .then(response => {
            if (response.meta.total > 0) {
                var teamsawardsforevent = "   ";
                for (i = 0; i < response.data.length; i++) {
                    var thisaward = response.data[i].title.toString();
                    if (thisaward.includes(" (VRC/VEXU/VAIC)")) {
                        thisaward = thisaward.replace(" (VRC/VEXU/VAIC)", "")
                    }
                    if (thisaward.includes(" (VRC/VEXU)")) {
                        thisaward = thisaward.replace(" (VRC/VEXU)", "")
                    }
                    if (thisaward.includes(" (VRC)")) {
                        thisaward = thisaward.replace(" (VRC)", "")
                    }
                    // teamsawardarrayperevent.push(response.data[i].title);
                    if (i != response.data.length - 1) {
                        teamsawardsforevent += thisaward + ", ";
                    }
                    else {
                        teamsawardsforevent += thisaward;
                    }

                }
                document.getElementById("awardsicon" + thisnum).style.display = "inline-block";
                document.getElementById("awardslist" + thisnum).innerHTML = teamsawardsforevent;
            }
        })
}

// document.getElementById("teamslistpagenum").addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//         console.log("Enter");
//         if (document.getElementById("teamslistpagenum").value != null) {
//             getTeams(document.getElementById("teamslistpagenum").value);
//             console.log(document.getElementById("teamslistpagenum").value);
//         }
//         else {
//             alert("Please enter a page number");
//         }
//     }
// });

