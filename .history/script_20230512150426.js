<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>


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
    $("#nav-placeholder").load("navigation.html");
});

function openpage(pageName) {
    // var i, tabcontent, tablinks;
    // tabcontent = document.getElementsByClassName("tabcontent");
    // for (i = 0; i < tabcontent.length; i++) {
    //     tabcontent[i].style.display = "none";
    // }
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    // document.getElementsByClassName("offcanvas").document.getElementById(pageName).style.display = "block";

    if (pageName == "teamspage") {
        getTeams(1)
    }
    if (pageName == "eventspage") {
        getEvents(1)
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

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
    pleasewait.style.marginLeft = "25%";
    pleasewait.style.height = "50%";
    pleasewait.style.width = "50%";
    pleasewait.style.objectFit = "cover";
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
                teamdiv.id = "teamdiv" + i;
                teamdiv.className = "teamdiv";
                document.getElementById("teamslist").appendChild(teamdiv);
                var programcontainer = document.createElement("div");
                programcontainer.className = "programcontainer";
                teamdiv.appendChild(programcontainer);
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
                // programcontainer.style.backgroundColor = "blue";
                // teamnumbercontainer.style.backgroundColor = "red";
                // teamnamecontainer.style.backgroundColor = "black";
                // teamorgcontainer.style.backgroundColor = "blue";
                // teamlocationcontainer.style.backgroundColor = "black";
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
    document.getElementById("teamspage").appendChild(pleasewait)
    pleasewait.className = "pleasewait"
    pleasewait.style.marginLeft = "25%";
    pleasewait.style.height = "50%";
    pleasewait.style.width = "50%";
    pleasewait.style.objectFit = "cover";
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
                eventprogramcontainer.className = "eventprogramcontainer";
                eventdiv.appendChild(eventprogramcontainer);
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
            }

            document.getElementById("teamslistpageselection").style.display = "block";
            document.getElementById("teamslisttotalpages").innerHTML = "of " + response.meta.last_page;

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
