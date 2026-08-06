/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/catalog/src/dto/event.dto.ts"
/*!*******************************************!*\
  !*** ./apps/catalog/src/dto/event.dto.ts ***!
  \*******************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventDto = void 0;
class EventDto {
    title;
    description;
    date;
    venueName;
}
exports.EventDto = EventDto;


/***/ },

/***/ "./apps/catalog/src/dto/user.dto.ts"
/*!******************************************!*\
  !*** ./apps/catalog/src/dto/user.dto.ts ***!
  \******************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
class CreateUserDto {
    name;
    email;
    password;
}
exports.CreateUserDto = CreateUserDto;


/***/ },

/***/ "./apps/gateway/src/auth.controller.ts"
/*!*********************************************!*\
  !*** ./apps/gateway/src/auth.controller.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthController_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/gateway/src/auth.service.ts");
const user_dto_1 = __webpack_require__(/*! ../../catalog/src/dto/user.dto */ "./apps/catalog/src/dto/user.dto.ts");
let AuthController = AuthController_1 = class AuthController {
    authService;
    logger = new common_1.Logger(AuthController_1.name);
    constructor(authService) {
        this.authService = authService;
    }
    register(dto) {
        this.logger.log(`POST /auth/register request received for email: ${dto.email}`);
        return this.authService.register(dto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
exports.AuthController = AuthController = AuthController_1 = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ },

/***/ "./apps/gateway/src/auth.service.ts"
/*!******************************************!*\
  !*** ./apps/gateway/src/auth.service.ts ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let AuthService = AuthService_1 = class AuthService {
    catalogClient;
    jwtService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(catalogClient, jwtService) {
        this.catalogClient = catalogClient;
        this.jwtService = jwtService;
    }
    async register(dto) {
        this.logger.log(`Sending create_user message for email: ${dto.email}`);
        const user = await (0, rxjs_1.firstValueFrom)(this.catalogClient.send('create_user', dto));
        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
        });
        return { accessToken, user };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CATALOG_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ },

/***/ "./apps/gateway/src/gateway.controller.ts"
/*!************************************************!*\
  !*** ./apps/gateway/src/gateway.controller.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const gateway_service_1 = __webpack_require__(/*! ./gateway.service */ "./apps/gateway/src/gateway.service.ts");
const event_dto_1 = __webpack_require__(/*! ../../catalog/src/dto/event.dto */ "./apps/catalog/src/dto/event.dto.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let GatewayController = class GatewayController {
    gatewayService;
    orderClient;
    constructor(gatewayService, orderClient) {
        this.gatewayService = gatewayService;
        this.orderClient = orderClient;
    }
    getAllEvents() {
        return this.gatewayService.getAllEvents();
    }
    createEvent(dto) {
        return this.gatewayService.createEvent(dto);
    }
    holdSeat(seatId, userId) {
        return this.gatewayService.holdSeat(seatId, userId);
    }
    createSeat(eventId, dto) {
        return this.gatewayService.createSeat({ ...dto, eventId });
    }
    getSeatsByEvent(eventId) {
        return this.gatewayService.getSeatsByEvent(eventId);
    }
    createOrder(body) {
        return this.orderClient.send('process_checkout', body);
    }
};
exports.GatewayController = GatewayController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "getAllEvents", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof event_dto_1.EventDto !== "undefined" && event_dto_1.EventDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Post)('/reservations/hold/:seatId/:userId'),
    __param(0, (0, common_1.Param)('seatId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "holdSeat", null);
__decorate([
    (0, common_1.Post)('/:eventId/seats'),
    __param(0, (0, common_1.Param)('eventId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof Omit !== "undefined" && Omit) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "createSeat", null);
__decorate([
    (0, common_1.Get)('/:eventId/seats'),
    __param(0, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "getSeatsByEvent", null);
__decorate([
    (0, common_1.Post)('/orders/checkout'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "createOrder", null);
exports.GatewayController = GatewayController = __decorate([
    (0, common_1.Controller)('events'),
    __param(1, (0, common_1.Inject)('ORDER_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof gateway_service_1.GatewayService !== "undefined" && gateway_service_1.GatewayService) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], GatewayController);


/***/ },

/***/ "./apps/gateway/src/gateway.module.ts"
/*!********************************************!*\
  !*** ./apps/gateway/src/gateway.module.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const gateway_controller_1 = __webpack_require__(/*! ./gateway.controller */ "./apps/gateway/src/gateway.controller.ts");
const auth_controller_1 = __webpack_require__(/*! ./auth.controller */ "./apps/gateway/src/auth.controller.ts");
const user_controller_1 = __webpack_require__(/*! ./user.controller */ "./apps/gateway/src/user.controller.ts");
const gateway_service_1 = __webpack_require__(/*! ./gateway.service */ "./apps/gateway/src/gateway.service.ts");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./apps/gateway/src/auth.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let GatewayModule = class GatewayModule {
};
exports.GatewayModule = GatewayModule;
exports.GatewayModule = GatewayModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1h' },
                }),
            }),
            microservices_1.ClientsModule.register([
                {
                    name: 'CATALOG_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: 'localhost',
                        port: 3001,
                    }
                },
                {
                    name: 'RESERVATION_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: 'localhost',
                        port: 3002,
                    }
                },
                {
                    name: 'ORDER_SERVICE',
                    transport: microservices_1.Transport.TCP,
                    options: {
                        host: 'localhost',
                        port: 3003,
                    }
                }
            ])
        ],
        controllers: [gateway_controller_1.GatewayController, auth_controller_1.AuthController, user_controller_1.UserController],
        providers: [gateway_service_1.GatewayService, auth_service_1.AuthService],
    })
], GatewayModule);


/***/ },

/***/ "./apps/gateway/src/gateway.service.ts"
/*!*********************************************!*\
  !*** ./apps/gateway/src/gateway.service.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var GatewayService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let GatewayService = GatewayService_1 = class GatewayService {
    catalogClient;
    reservationClient;
    logger = new common_1.Logger(GatewayService_1.name);
    constructor(catalogClient, reservationClient) {
        this.catalogClient = catalogClient;
        this.reservationClient = reservationClient;
    }
    getAllEvents() {
        this.logger.log('Sending get_events message to catalog service');
        return this.catalogClient.send('get_events', {});
    }
    createEvent(dto) {
        this.logger.log(`Sending create_event message: ${JSON.stringify(dto)}`);
        return this.catalogClient.send('create_event', dto);
    }
    holdSeat(seatId, userId) {
        const payload = { seatId, userId };
        this.logger.log(`Sending hold_seat message to reservation service: ${JSON.stringify(payload)}`);
        return this.reservationClient.send('hold_seat', payload);
    }
    createSeat(dto) {
        this.logger.log(`Sending create_seat message: ${JSON.stringify(dto)}`);
        return this.catalogClient.send('create_seat', dto);
    }
    getSeatsByEvent(eventId) {
        this.logger.log(`Sending get_seats message for eventId: ${eventId}`);
        return this.catalogClient.send('get_seats', eventId);
    }
    getSeatsByUser(userId) {
        this.logger.log(`Sending get_seats_by_user message for userId: ${userId}`);
        return this.catalogClient.send('get_seats_by_user', userId);
    }
};
exports.GatewayService = GatewayService;
exports.GatewayService = GatewayService = GatewayService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CATALOG_SERVICE')),
    __param(1, (0, common_1.Inject)('RESERVATION_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], GatewayService);


/***/ },

/***/ "./apps/gateway/src/user.controller.ts"
/*!*********************************************!*\
  !*** ./apps/gateway/src/user.controller.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserController_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const gateway_service_1 = __webpack_require__(/*! ./gateway.service */ "./apps/gateway/src/gateway.service.ts");
let UserController = UserController_1 = class UserController {
    gatewayService;
    logger = new common_1.Logger(UserController_1.name);
    constructor(gatewayService) {
        this.gatewayService = gatewayService;
    }
    getSeatsByUser(userId) {
        this.logger.log(`GET /users/${userId}/seats request received`);
        return this.gatewayService.getSeatsByUser(userId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('/:userId/seats'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getSeatsByUser", null);
exports.UserController = UserController = UserController_1 = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [typeof (_a = typeof gateway_service_1.GatewayService !== "undefined" && gateway_service_1.GatewayService) === "function" ? _a : Object])
], UserController);


/***/ },

/***/ "@nestjs/common"
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/common");

/***/ },

/***/ "@nestjs/config"
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/config");

/***/ },

/***/ "@nestjs/core"
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
(module) {

module.exports = require("@nestjs/core");

/***/ },

/***/ "@nestjs/jwt"
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
(module) {

module.exports = require("@nestjs/jwt");

/***/ },

/***/ "@nestjs/microservices"
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
(module) {

module.exports = require("@nestjs/microservices");

/***/ },

/***/ "rxjs"
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
(module) {

module.exports = require("rxjs");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************************!*\
  !*** ./apps/gateway/src/main.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const gateway_module_1 = __webpack_require__(/*! ./gateway.module */ "./apps/gateway/src/gateway.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(gateway_module_1.GatewayModule);
    await app.listen(process.env.port ?? 3000);
}
bootstrap();

})();

/******/ })()
;