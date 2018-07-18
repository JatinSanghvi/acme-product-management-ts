import * as ng from "angular";
import "./common/services/common.services"
import "./common/services/productResourceMock"

ng.module("ProductManagement", ["common.services", "productResourceMock"]);