"use strict";

angular.module("dolisttest")
    .component("home", {
        templateUrl: "components/home/home.html",
        controller: home
    })

function home($resource) {

    this.lookUp = () => {
        let category = "";
        let url = "https://api.foursquare.com/v2/venues/search?near=" + this.ville + "&query=" + (this.query == undefined ? "" : this.query) + "&v=20180101";
        let nearVenuesBdd = $resource(url, AUTH);
        let nearVenues = nearVenuesBdd.get().$promise.then((data) => {
            debugger;
            let cityvenues = data.response.venues;
            let len = cityvenues.length;
            this.category = category;
            this.cityvenues = cityvenues;

            console.log(data)
            console.log(this.cityvenues)
        })
    }

}
