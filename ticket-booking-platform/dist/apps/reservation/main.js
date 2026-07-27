/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/reservation/prisma/prisma.module.ts"
/*!**************************************************!*\
  !*** ./apps/reservation/prisma/prisma.module.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./apps/reservation/prisma/prisma.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
        imports: [config_1.ConfigModule],
    })
], PrismaModule);


/***/ },

/***/ "./apps/reservation/prisma/prisma.service.ts"
/*!***************************************************!*\
  !*** ./apps/reservation/prisma/prisma.service.ts ***!
  \***************************************************/
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const adapter_pg_1 = __webpack_require__(/*! @prisma/adapter-pg */ "@prisma/adapter-pg");
const pg_1 = __webpack_require__(/*! pg */ "pg");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor(configService) {
        const pool = new pg_1.Pool({ connectionString: configService.get('DATABASE_URL') });
        const adapter = new adapter_pg_1.PrismaPg(pool);
        super({ adapter });
    }
    async onModuleInit() {
        await this.$connect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], PrismaService);


/***/ },

/***/ "./apps/reservation/src/reservation.controller.ts"
/*!********************************************************!*\
  !*** ./apps/reservation/src/reservation.controller.ts ***!
  \********************************************************/
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
var ReservationController_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const reservation_service_1 = __webpack_require__(/*! ./reservation.service */ "./apps/reservation/src/reservation.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let ReservationController = ReservationController_1 = class ReservationController {
    reservationService;
    logger = new common_1.Logger(ReservationController_1.name);
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async holdSeat(data) {
        this.logger.log(`Received hold_seat message: ${JSON.stringify(data)}`);
        try {
            return await this.reservationService.holdSeat(data.seatId, data.userId);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Internal server error';
            this.logger.error(`Error in holdSeat: ${message}`, error instanceof Error ? error.stack : undefined);
            if (error instanceof microservices_1.RpcException) {
                throw error;
            }
            throw new microservices_1.RpcException({
                status: 'error',
                message,
            });
        }
    }
};
exports.ReservationController = ReservationController;
__decorate([
    (0, microservices_1.MessagePattern)('hold_seat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "holdSeat", null);
exports.ReservationController = ReservationController = ReservationController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.ReservationService !== "undefined" && reservation_service_1.ReservationService) === "function" ? _a : Object])
], ReservationController);


/***/ },

/***/ "./apps/reservation/src/reservation.module.ts"
/*!****************************************************!*\
  !*** ./apps/reservation/src/reservation.module.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const ioredis_1 = __importDefault(__webpack_require__(/*! ioredis */ "ioredis"));
const reservation_service_1 = __webpack_require__(/*! ./reservation.service */ "./apps/reservation/src/reservation.service.ts");
const reservation_controller_1 = __webpack_require__(/*! ./reservation.controller */ "./apps/reservation/src/reservation.controller.ts");
const prisma_module_1 = __webpack_require__(/*! ../prisma/prisma.module */ "./apps/reservation/prisma/prisma.module.ts");
let ReservationModule = class ReservationModule {
};
exports.ReservationModule = ReservationModule;
exports.ReservationModule = ReservationModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ isGlobal: true }), prisma_module_1.PrismaModule],
        controllers: [reservation_controller_1.ReservationController],
        providers: [
            reservation_service_1.ReservationService,
            {
                provide: 'REDIS_CLIENT',
                useFactory: () => {
                    return new ioredis_1.default({
                        host: 'localhost',
                        port: 6379,
                    });
                },
            },
        ],
        exports: [reservation_service_1.ReservationService],
    })
], ReservationModule);


/***/ },

/***/ "./apps/reservation/src/reservation.service.ts"
/*!*****************************************************!*\
  !*** ./apps/reservation/src/reservation.service.ts ***!
  \*****************************************************/
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var ReservationService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./apps/reservation/prisma/prisma.service.ts");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
const ioredis_1 = __importDefault(__webpack_require__(/*! ioredis */ "ioredis"));
let ReservationService = ReservationService_1 = class ReservationService {
    prismaService;
    redisClient;
    logger = new common_1.Logger(ReservationService_1.name);
    constructor(prismaService, redisClient) {
        this.prismaService = prismaService;
        this.redisClient = redisClient;
    }
    async holdSeat(seatId, userId) {
        this.logger.log(`holdSeat called with seatId: ${seatId}, userId: ${userId}`);
        try {
            const lockKey = `lock:seat:${seatId}`;
            this.logger.log(`Setting lock key: ${lockKey}`);
            const acquired = await this.redisClient.set(lockKey, userId, 'EX', 600, 'NX');
            this.logger.log(`Lock acquired result: ${acquired}`);
            if (!acquired) {
                this.logger.warn(`Seat ${seatId} already reserved`);
                return {
                    success: false,
                    message: 'Seat already reserved',
                };
            }
            try {
                await this.prismaService.seat.update({
                    where: { id: seatId },
                    data: { status: 'HELD', userId }
                });
            }
            catch (error) {
                await this.redisClient.del(lockKey);
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                    this.logger.warn(`Seat ${seatId} not found`);
                    return {
                        success: false,
                        message: 'Seat not found',
                    };
                }
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
                    this.logger.warn(`User ${userId} not found`);
                    return {
                        success: false,
                        message: 'User not found',
                    };
                }
                throw error;
            }
            this.logger.log(`Seat ${seatId} reserved successfully`);
            return {
                success: true,
                message: 'Seat reserved successfully',
            };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Internal server error';
            this.logger.error(`Error in holdSeat: ${message}`, error instanceof Error ? error.stack : undefined);
            throw new microservices_1.RpcException({
                status: 'error',
                message,
            });
        }
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = ReservationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof ioredis_1.default !== "undefined" && ioredis_1.default) === "function" ? _b : Object])
], ReservationService);


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

/***/ "@nestjs/microservices"
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
(module) {

module.exports = require("@nestjs/microservices");

/***/ },

/***/ "@prisma/adapter-pg"
/*!*************************************!*\
  !*** external "@prisma/adapter-pg" ***!
  \*************************************/
(module) {

module.exports = require("@prisma/adapter-pg");

/***/ },

/***/ "@prisma/client"
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
(module) {

module.exports = require("@prisma/client");

/***/ },

/***/ "ioredis"
/*!**************************!*\
  !*** external "ioredis" ***!
  \**************************/
(module) {

module.exports = require("ioredis");

/***/ },

/***/ "pg"
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
(module) {

module.exports = require("pg");

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
/*!**************************************!*\
  !*** ./apps/reservation/src/main.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const reservation_module_1 = __webpack_require__(/*! ./reservation.module */ "./apps/reservation/src/reservation.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(reservation_module_1.ReservationModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 3002,
        }
    });
    await app.listen();
}
bootstrap();

})();

/******/ })()
;