import * as ng from "angular";
import { IProduct, Product } from "../../products/product";
import "angular-mocks";

const mockResource = ng.module("productResourceMock", ["ngMockE2E"]);
mockResource.run(mockRun);
mockRun.$inject = ["$httpBackend"];

function mockRun($httpBackend: ng.IHttpBackendService): void {

    const products: IProduct[] = [
        new Product(1, "Leaf Rake", "GDN-0011", new Date(2009, 2, 19), 19.95, "Leaf rake with 48-inch wooden handle.", "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"),
        new Product(2, "Garden Cart", "GDN-0023", new Date(2010, 2, 18), 26.95, "15 gallon capacity rolling garden cart", "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"),
        new Product(3, "Saw", "TBX-002", new Date(2002, 3, 1), 16.95, "15-inch steel blade hand saw", "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"),
        new Product(4, "Hammer", "TBX-0048", new Date(2013, 4, 21), 8.99, "Curved claw steel hammer", "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"),
        new Product(5, "Video Game Controller", "GMG-0042", new Date(2012, 9, 25), 35.95, "Standard five-button video game controller", "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"),
    ];

    const getProductsUrl: string = "/api/products";
    const editProductRegex: RegExp = new RegExp(getProductsUrl + "/[0-9][0-9]*", '');

    $httpBackend.whenGET(getProductsUrl).respond(products);

    $httpBackend.whenGET(editProductRegex).respond(function (method, url, data) {

        const productId = +url.split('/').slice(-1)[0];

        for (const product of products) {
            if (product.productId == productId) {
                return [200, product, {}]
            }
        }

        // Return dummy product if not found.
        return [200, { "productId": 0 }, {}];
    });

    // Catch all for testing purposes.
    $httpBackend.whenGET(/api/).respond(function (method, url, data) {
        return [200, products, {}];
    });

    // Pass through any requests for application files.
    $httpBackend.whenGET(/app/).passThrough();
}