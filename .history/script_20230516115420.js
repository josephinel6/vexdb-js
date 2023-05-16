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

function gotoviewteam(teamid) {
    console.log("team = " + teamid)
    viewteamid = teamid;
    window.location.replace('viewteam.html?teamid=' + teamid);
}

var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var daysinweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function viewteam() {
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

                console.log("repeat")
                console.log("Event " + i)
                var teameventdiv = document.createElement("div");
                teameventdiv.className = "viewteameventdiv"
                document.getElementById("viewteamwindow").appendChild(teameventdiv);
                var eventtitle = document.createElement("h4");
                eventtitle.innerHTML = response.data[i].name;
                teameventdiv.appendChild(eventtitle);
                var eventdate = document.createElement("h6")
                eventdate.style.marginTop = "-2px"
                teameventdiv.appendChild(eventdate);
                if (response.data[i].start == response.data[i].end) {
                    // var date = new Date(response.data[i].start.split("-")[0], response.data[i].start.split("-")[1], response.data[i].start.split("-")[2]);
                    var date = new Date(response.data[i].start)
                    eventdate.innerHTML = daysinweek[date.getDay()] + " " + months[date.getMonth() - 1] + " " + date.getDate() + ", " + date.getFullYear();
                    console.log(date)
                }
                else {
                    var startdate = new Date(response.data[i].start);
                    var enddate = new Date(response.data[i].end);
                    eventdate.innerHTML = "From " + daysinweek[startdate.getDay()] + " " + months[startdate.getMonth() - 1] + " " + startdate.getDate() + ", " + startdate.getFullYear() + " to " + daysinweek[enddate.getDay()] + " " + months[enddate.getMonth() - 1] + " " + enddate.getDate() + ", " + enddate.getFullYear()
                }
                var rankingicon = document.createElement("i");
                rankingicon.className = "fa fa-list-ol";
                var rankingnum = document.createElement("p");
                rankingnum.style.display = "inline-block";
                rankingnum.style.marginLeft = "5px";
                teameventdiv.appendChild(rankingicon);
                teameventdiv.appendChild(rankingnum);
                var teamrankresponse = await fetch()
                fetch(teamsurl + "/" + viewteamid + "/rankings?event=" + response.data[i].id, data)
                    .then(response => response.json())
                    .then(response => {
                        rankingnum.innerHTML = response.data[0].rank;
                        console.log(response)
                        console.log(response.data[0].rank)
                    })
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

