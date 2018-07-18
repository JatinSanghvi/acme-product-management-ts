import * as ng from "angular";
import { IProduct, Product } from "./product";
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

        const newProduct = new Product(
            3, "Saw", "TBX-002", new Date(2002, 3, 1), 16.95, "15-inch steel blade hand saw",
            "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png");

        newProduct.price = newProduct.calculateDiscount(10);
        this.products.push(newProduct);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }
}

ng
    .module("ProductManagement")
    .controller("ProductListController", ProductListController);