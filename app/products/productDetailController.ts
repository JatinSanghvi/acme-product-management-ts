import * as ng from "angular";
import "angular-route";
import { IProduct } from "./product";
import { IProductResource, IDataAccessService } from "../common/services/dataAccessService";
import "../app";
import "../common/services/dataAccessService";

interface IProductDetail {
    title: string;
    product: IProduct;
}

interface IProductParams extends ng.route.IRouteParamsService {
    productId: number;
}

class ProductDetailController implements IProductDetail {
    title: string;
    product: IProduct;

    static $inject = ["$routeParams", "dataAccessService"];
    constructor(
        private $routeParams: IProductParams,
        private dataAccessService: IDataAccessService) {

        this.title = "Product Detail";

        const productResource: ng.resource.IResourceClass<IProductResource> = dataAccessService.getProductResource();

        productResource.get(
            { productId: $routeParams.productId },
            (data: IProduct) => this.product = data);
    }
}

ng
    .module("ProductManagement")
    .controller("ProductDetailController", ProductDetailController);