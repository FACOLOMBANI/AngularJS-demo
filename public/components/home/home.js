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
     }
 
    getLocation();
    


    this.lookUp = () => {
        let category = "";
        if (this.ville == undefined || this.ville == "") {
            angular.element('#ville').popover({
                content: "Veuillez bien indiquer le nom de la ville.",
                placement: 'top',
            }).popover('show');
        } else {
            angular.element('#ville').popover('hide');
            let url = "https://api.foursquare.com/v2/venues/search?near=" + this.ville + "&query=" + (this.query == undefined ? "" : this.query) + "&v=20180101";
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
