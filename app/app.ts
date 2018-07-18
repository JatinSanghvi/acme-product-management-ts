import * as ng from "angular";
import "angular-route";
import "./common/services/common.services"
import "./common/services/productResourceMock"

const main = ng.module("ProductManagement", ["ngRoute", "common.services", "productResourceMock"]);

main.config(routeConfig);

routeConfig.$inject = ["$routeProvider"];
function routeConfig($routeProvider: ng.route.IRouteProvider): void {

    $routeProvider
        .when("/products", {
            templateUrl: "/app/products/productListView.html",
            controller: "ProductListController as vm"
        })
        .when("/products/:productId", {
            templateUrl: "/app/products/productDetailView.html",
            controller: "ProductDetailController as vm"
        })
        .otherwise("/products");
}