"use strict";

angular.module("dolisttest")
    .component("home", {
        templateUrl: "components/home/home.html",
        controller: home
    })

function home($resource) {
this.message = "Hello world."
}
