"use strict";

angular.module("dolisttest", [
    // les dépendances externes
    'ui.router', 'ngResource'
])
.config(function($stateProvider, $urlRouterProvider) {
    let states = [{
        name: "home",
        url: "/",
        component: "home",
    }]

    $urlRouterProvider.otherwise("/");
    states.forEach(function(state) {
        $stateProvider.state(state);
    })
})