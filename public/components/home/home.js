"use strict";

angular.module("dolisttest")
    .component("home", {
        templateUrl: "components/home/home.html",
        controller: home
    })

function home($resource) {

    // Obtenir la position actuelle de l'utilisateur
    let lat;
    let long;
    let getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    let showPosition = (position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        getRecomm(lat, long)
    }

    getLocation();

    let getRecomm = (lat, long) => {
        let recVenuesBdd = $resource("https://api.foursquare.com/v2/venues/explore?ll=" + lat + "," + long + "&v=20180101", AUTH);
        let recVenues = recVenuesBdd.get().$promise.then((data) => {
            debugger;
            let recdata;
            let recArray = new Array();
            let old = new Array();
            let len = data.response.groups[0].items.length;
            let randNum = Math.floor(Math.random() * len);
            recdata = data.response.groups[0].items;
            //on choisi 6 recommendations au hazard sur un resultat de 30 elements
            for (let i = 0; i < 6; i++) {
                while (old.includes(randNum)) {
                    randNum = Math.floor(Math.random() * len);
                }
                old.push(randNum);
                recArray.push(recdata[randNum]);
            }
            this.recArray = recArray;
            this.location = data.response.headerLocation;
            console.log(this.recArray)
        })
    }

    this.lookUp = () => {
        let category = "";
        if (this.ville == undefined || this.ville == "") {
            angular.element('#ville').popover({
                content: "Veuillez bien indiquer le nom de la ville.",
                placement: 'top',
            }).popover('show');
        } else {
            angular.element('#ville').popover('hide');
            let url = "https://api.foursquare.com/v2/venues/search?near=" + this.ville + "&categoryId=" + category + "&query=" + (this.query == undefined ? "" : this.query) + "&v=20180101";
            let nearVenuesBdd = $resource(url, AUTH);
            let nearVenues = nearVenuesBdd.get().$promise.then((data) => {
                let cityvenues = data.response.venues;
                let len = cityvenues.length;
                this.category = category;
                this.cityvenues = cityvenues;

                console.log(data)
                console.log(this.cityvenues)
            })
        }
    }

}
