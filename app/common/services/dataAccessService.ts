import * as ng from "angular";
import { IProduct } from "../../products/product";

interface IDataAccessService {
    getProductResource(): ng.resource.IResourceClass<IProductResource>;
}

interface IProductResource extends ng.resource.IResource<IProduct> { }

class DataAccessService implements IDataAccessService {

    static $inject = ["$resource"];

    constructor(private $resource: ng.resource.IResourceService) { }

    getProductResource(): ng.resource.IResourceClass<IProductResource> {
        return this.$resource("/api/products/:productid");
    }
}

ng
    .module("common.services")
    .service("dataAccessService", DataAccessService);