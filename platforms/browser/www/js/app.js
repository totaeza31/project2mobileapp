
var firebaseConfig = {
    apiKey: "AIzaSyDE0ldLjuWiAYtcbl3G9kKalNOwxeFw3yg",
    authDomain: "food-e0c82.firebaseapp.com",
    databaseURL: "https://food-e0c82.firebaseio.com",
    projectId: "food-e0c82",
    storageBucket: "food-e0c82.appspot.com",
    messagingSenderId: "909826880316",
    appId: "1:909826880316:web:bc7974ce3d92b90c63a439"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
// ดูสถานะการ login

var  arrayMenu=[];
var arrayPrice=[];
var arrayCount=[];
var xx =0;

document.addEventListener('init', function (event) {


    var page = event.target;

    if (page.id === 'page1') {
        var category = localStorage.getItem("selectedCategory");

        console.log("page1");

        db.collection("fontcategory").where("type", "==", category).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    var item5 = `
                
                <button class="button--quiet" onclick="myfunction(${doc.data().id})" width="100%" id="${doc.data().id}">
                    <li class="list-item">
                        <div class="list-item__left" >
                            <img width="130px"height="80px" 
                            style="background-image: url('${doc.data().photoUrl}') ;  background-size: cover;">
                        </div>
                        <div class="list-item__center">
                            <div class="list-item__title">${doc.data().name}</div>
                            <div class="list-item__subtitle">${doc.data().category}</div>
                            <div class="list-item__subtitle">
                                <i class="zmdi zmdi-star" style="color:yellow"></i> ${doc.data().star}
                                <i class="zmdi zmdi-pin"></i>
                                ${doc.data().lo}</div>
                        </div>
                    </li>
            </button> 
              `
                    $("#carousel5").append(item5);

                });
             var tot = `
                <h2>หมวด           
                `
            $("#carousel6").append(tot + category);
            });
        $("#backbtn").click(function () {
            var content = document.getElementById('content');
            var menu = document.getElementById('menu');
            content.load('tabbar.html')
                .then(menu.close.bind(menu));
        });

        $("#homebtn1").click(function () {
            content.load('tabbar.html')
                .then(menu.close.bind(menu));
        });
    }

    if (page.id === 'page2') {

       console.log("page2");
        var menurest = localStorage.getItem("selectedCategorys");
        
        db.collection("fontcategory").where("id", "==", menurest)
            .get().then((querySnapshot2) => {
                querySnapshot2.forEach((doc) => {
                    var item8 = `
                <ul class="list " style="background-color:#FF9900 ;">
                <li class="list-item">
        
                    <div class="list-item__center">
                        <div class="list-item__title" style="color: white">
                            <h3>${doc.data().name}</h3>
                        </div>
                        <div class="list-item__subtitle" style="color: white">${doc.data().category} <i class="zmdi zmdi-star"
                                style="color:yellow"></i> ${doc.data().star}</div>
                        <div class="list-item__subtitle">
                        </div>
                </li>
        
            </ul>
            <img style="-webkit-filter: blur(4px); filter: blur(2px);" width="380px" height="100px"
                src="${doc.data().photoUrl}">          
              `
                    $("#carousel8").append(item8);
                });
            });

        console.log("idrest ที่ใช้เรียก " + menurest);
        
        db.collection("itemrest1").where("number", "==", menurest)
            .get().then((querySnapshot2) => {
                querySnapshot2.forEach((doc) => {
                    var item7 = `
                <ul class="list " id="${doc.data().id}" >
                    <li class="list-item">
                        <div class="list-item__left">
        
                        </div>
                        <div class="list-item__center"  style="width:100%;height:80px">
                            <div class="list-item__title">${doc.data().name}</div>
                            <div class="list-item__subtitle">${doc.data().price} Bath</div>
                            <div class="list-item__subtitle"> 
                            </div>
                        </div>
                        <div class="list-item__right list-item--material__right">
                            &nbsp; &nbsp; &nbsp; &nbsp;
                        </div>
                     
                        <div class="list-item__right list-item--material__right" id="addorders" >
                        <ons-button modifier="quiet"  onclick="myfunction3(${doc.data().id},${doc.data().price},'${doc.data().name}')">
                            <i class="zmdi zmdi-plus-square zmdi-hc-3x" style="color:orange"></i>
                            </ons-button>
                        </div>
                  
                    </li>
                </ul>
              `
     
                    $("#carousel7").append(item7);                   
                });

                $("#addorders").click(function () {
                    
                });              
            });

            $("#orderbtn").click(function () {
                content.load('busket.html')
                    .then(menu.close.bind(menu));
            });
            $("#backbtn").click(function () {
                content.load('resturent.html')
                    .then(menu.close.bind(menu));
            });
            $("#homebtn1").click(function () {
                content.load('tabbar.html')
                    .then(menu.close.bind(menu));
            });

    }
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var email = user.email;
            console.log(email + "signed in");
        }
    });
    if (page.id === 'loginPage') {
        console.log("loginPage");
        $("#backbtn").click(function () {
            content.load('login.html')
                .then(menu.close.bind(menu));
        });
        $("#signupbtn").click(function () {
            var username = $("#username1").val();
            var password = $("#password1").val();
            firebase.auth().createUserWithEmailAndPassword(username, password)
                .then(function (result) {
                    console.log(result);
                    ons.notification.alert("Regis Complete!!!");
                    content.load('login.html')
                        .then(menu.close.bind(menu));

                }).catch(function (error) {
                    console.log(error.message);
                    ons.notification.alert(error.message);
                });
        })
        $("#gmailbtn").click(function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
              content.load('tabbar.html')
                    .then(menu.close.bind(menu));
            }).catch(function (error) {
                console.log(error);
            });
        })
        $("#signinbtn").click(function () {
            var username = $("#username").val();
            var password = $("#password").val();
            firebase.auth().signInWithEmailAndPassword(username, password)
                .then(function (result) {
                    console.log(result);
                    ons.notification.alert("LOGIN Complete!!!");
                    content.load('tabbar.html')
                        .then(menu.close.bind(menu));

                }).catch(function (error) {
                    console.log(error.message);
                    ons.notification.alert(error.message);
                });
        })
        $("#regisbtn1").click(function () {
            content.load('regis.html')
                .then(menu.close.bind(menu));
        });
        $("#backhomebtn").click(function () {
            $("#content")[0].load("home.html");
        });
    }

    if (page.id === "tabbar") {
        //Code for tabbar
        $("#menubtn").click(function () {
            var menu = document.getElementById('menu');
            menu.open();
        });
        $("#backbtn").click(function () {
            content.load('tabbar.html')
                .then(menu.close.bind(menu));
        });
        $("#fbtn").click(function () {
            content.load('tabbar.html')
                .then(menu.close.bind(menu));
        });
        $("#gbtn").click(function () {
            content.load('tabbar.html')
                .then(menu.close.bind(menu));
        });
    }
    if (page.id === "tab3") {
        $("#homebtn1").click(function () {

            content.load('tabbar.html')
                .then(menu.close.bind(menu));
        });
        $("#backbtn").click(function () {

            content.load('tabbar.html')
                .then(menu.close.bind(menu));
        });

    }

    if (page.id === "tab1") {
        db.collection("recommended").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var item = `
            <ons-carousel-item modifier="nodivider" id="${doc.data().id}" class="recomended_items">
            <ons-button modifier="quiet">
                <div class="thumbnail" style="background-image: url('${doc.data().photoUrl}')">
                </div>
                <div class="recomended_item_title" id="item1_name">${doc.data().name}</div>
                </ons-button>
            </ons-carousel-item>`
                $("#carousel").append(item);
            });
            $("#carousel").click(function () {
             
                ons.notification.alert("เลือกแบบหมวดไปก่อนนะครับ!!");

            });
        });

        db.collection("fastdelivery").get().then((querySnapshot1) => {
            querySnapshot1.forEach((doc) => {
                var item3 = `
              <ons-carousel-item modifier="nodivider" id="${doc.data().id}" class="recomended_item">
              <ons-button modifier="quiet">
                  <div class="thumbnailss" style="background-image: url('${doc.data().photoUrl}') ;width="200px">
                  </div>
                  <div class="recomended_item_title" id="item1_name">${doc.data().name}</div>
                  </ons-button>
              </ons-carousel-item>`
                $("#carousel2").append(item3);
            });
            $("#carousel2").click(function () {

                ons.notification.alert("เลือกแบบหมวดไปก่อนนะครับ!!");

            });
        });
        db.collection("promotionOnefreeOne").get().then((querySnapshot1) => {
            querySnapshot1.forEach((doc) => {

                var item1 = `
              <ons-carousel-item modifier="nodivider" id="${doc.data().id}" class="recomended_item">
              <ons-button modifier="quiet">
                  <div class="thumbnails" style="background-image: url('${doc.data().photoUrl}') ;width="200px">
                  </div>
                  <div class="recomended_item_title" id="item1_name">${doc.data().name}</div>
                  </ons-button>
              </ons-carousel-item>`
                $("#carousels").append(item1);
            });

            $("#carousels").click(function () {

                 ons.notification.alert("เลือกแบบหมวดไปก่อนนะครับ!!");

            });
        });

    }

    if (page.id === "tab2") {
        console.log("tab2");
        $("#thaibtn").click(function () {
            localStorage.setItem("selectedCategory", "thai");
            $("#content")[0].load("resturent.html");
        });
        $("#allbtn").click(function () {
            localStorage.setItem("selectedCategory", "all");
            $("#content")[0].load("resturent.html");
        });
        $("#fastbtn").click(function () {
            localStorage.setItem("selectedCategory", "fast");
            $("#content")[0].load("resturent.html");
        });
        $("#seabtn").click(function () {
            localStorage.setItem("selectedCategory", "sea");
            $("#content")[0].load("resturent.html");
        });
        $("#spicybtn").click(function () {
            localStorage.setItem("selectedCategory", "spicy");
            $("#content")[0].load("resturent.html");
        });
        $("#streetbtn").click(function () {
            localStorage.setItem("selectedCategory", "street");
            $("#content")[0].load("resturent.html");
        });

    }

    if (page.id === "resturant") {
        console.log("rest1");

        db.collection("itemrest11").get().then((querySnapshot1) => {
            querySnapshot1.forEach((doc) => {

                var item1 = `

               <button class="button--quiet" width="100%" id="${doc.data().id}">
                <ul class="list ">
                    <li class="list-item">
                        <div class="list-item__left">
        
                        </div>
                        <div class="list-item__center">
                            <div class="list-item__title">${doc.data().name}</div>
                            <div class="list-item__subtitle">${doc.data().price} Bath</div>
                            <div class="list-item__subtitle"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                            </div>
                        </div>
                        <div class="list-item__right list-item--material__right">
                            &nbsp; &nbsp; &nbsp; &nbsp;
                        </div>
                        <div class="list-item__right list-item--material__right">
                            <i class="zmdi zmdi-plus-square zmdi-hc-3x" style="color:orange"></i>
                        </div>
                    </li>
                </ul>
            </button>
              
              `
                $("#carousel8").append(item1);
            });

            $("#carousel8").click(function () {
                content.load('busket.html')
                    .then(menu.close.bind(menu));
            });
        });

        $("#homebtn1").click(function () {
            content.load('tabbar.html')
                .then(menu.close.bind(menu));
        });
        $("#backbtn").click(function () {
            content.load('tabbar.html')
                .then(menu.close.bind(menu));
        });
        $("#mainmenu").click(function () {
            var content = document.getElementById('content');
            content.load('rest1.html');
        });
        $("#noodlemenu").click(function () {
            var content = document.getElementById('content');
            content.load('rest11.html');
        });

    }

    if (page.id === "busket") {


            for (i = 0; i < arrayMenu.length; i++) {
         
        
                var item = `<ons-row>
                <ons-col width="150px">${arrayMenu[i]}</ons-col>
                <ons-col></ons-col> 
                <ons-col>${arrayPrice[i]}</ons-col>
                   
                </ons-row>
                <ons-row></ons-row>` 
           
                
              $("#print").append(item);
              xx+=parseInt(arrayPrice[i]);
            }
            
    var tota = `<div>${xx}</div>`
    $("#asd").append(tota);
       

        $("#agianbtn").click(function () {
            content.load('rest1.html')
                .then(menu.close.bind(menu));
        });
        $("#backbtn").click(function () {
            arrayMenu=[];
arrayPrice=[];
 arrayCount=[];
 xx =0;
            content.load('tabbar.html')
                .then(menu.close.bind(menu));
        });
        $("#homebtn1").click(function () {
            content.load('tabbar.html')
                .then(menu.close.bind(menu));
        });
        $("#paybtn").click(function () {
            arrayMenu=[];
            arrayPrice=[];
             arrayCount=[];
             xx =0;
            ons.notification.alert('ชำระเงินสำเร็จ');
            content.load('tabbar.html')
                .then(menu.close.bind(menu));
        });
        $("#rbtn").click(function () {
            arrayMenu=[];
            arrayPrice=[];
             arrayCount=[];
             xx =0;
            ons.notification.alert('กรุณารอรับอาหาร');
            content.load('tabbar.html')
                .then(menu.close.bind(menu));
        });
    }

    if (page.id === "addressPage") {
 var lat;
 var lng;
 var selectLat;
 var selectLng;



  var onSuccess = function(position) {
       lat = position.coords.latitude;
       lng = position.coords.longitude ;


       mapboxgl.accessToken = 'pk.eyJ1IjoidG90ZXphMzEiLCJhIjoiY2sybGFlZWQwMDUwejNkbXU3cDh1MmRzbCJ9.S6s6C36_Y-h4-HcKrDX7vA';
       var map = new mapboxgl.Map({
       container: 'map', // container id
       style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
       center: [lng, lat], // starting position [lng, lat]
       zoom: 13 // starting zoom
       });

       var marker = new mapboxgl.Marker({
        draggable: true
        })
        .setLngLat([lng, lat])
        .addTo(map);
         
        function onDragEnd() {

        var lngLat = marker.getLngLat();
        selectLat = lngLat.lat;
        selectLng = lngLat.lng;
        coordinates.style.display = 'block';
        coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;


        }
         
        marker.on('dragend', onDragEnd);
       
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);



    $("#setAddress").click(function(){
        ons.notification.alert("Delivery: " + selectLat +","+selectLng);
      
    });


    }


    if (page.id === "sidemenu") {
        //Code for sidemenu
        $("#homebtn").click(function () {

            content.load('tabbar.html')
                .then(menu.close.bind(menu));
        });

        $("#addressbtn").click(function () {

            content.load('address.html')
                .then(menu.close.bind(menu));
        });

        $("#loginbtn").click(function () {

            content.load('login.html')
                .then(menu.close.bind(menu));
        });
        $("#regisbtn").click(function () {

            content.load('regis.html')
                .then(menu.close.bind(menu));
        });
        $("#basbtn").click(function () {

            content.load('busket.html')
                .then(menu.close.bind(menu));
        });
    }

});

function myfunction(idRent) {
    localStorage.setItem("selectedCategorys", idRent);
    $("#content")[0].load("page2.html");
}
function myfunction3(idRent2,price,name) {

        $("#showtabbar").show();
    
console.log(name);

    console.log(price);
    console.log(idRent2);


    var arraycart = arrayMenu.includes(idRent2);
    
    if(arraycart == false){
  
        arrayMenu.push(name);
        arrayPrice.push(price);
        console.log('sss'+arrayMenu);
        console.log(arrayPrice);
        
       
  
    }else if(arraycart == true){
      
    }
    document.getElementById("amount").innerHTML =arrayMenu.length;
   
}