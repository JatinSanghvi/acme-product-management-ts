import * as ng from "angular";
import { IProduct } from "./product";
import { IProductResource, IDataAccessService } from "../common/services/dataAccessService";
import "../app";
import "../common/services/dataAccessService";

interface IProductList {
    title: string;
    showImage: boolean;
    products: IProduct[];

    toggleImage(): void;
}

class ProductListController implements IProductList {
    title: string;
    showImage: boolean;
    products: IProduct[];

    static $inject = ["dataAccessService"];
    constructor(private dataAccessService: IDataAccessService) {
        this.title = "Product List";
        this.showImage = false;
        this.products = [];

        const productResource: ng.resource.IResourceClass<IProductResource> = dataAccessService.getProductResource();
        productResource.query((data: IProduct[]) => this.products = data);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}

ng
    .module("ProductManagement")
    .controller("ProductListController", ProductListController);