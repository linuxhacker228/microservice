/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const ioredis_1 = __importDefault(__webpack_require__(5));
const reservation_service_1 = __webpack_require__(6);
const reservation_controller_1 = __webpack_require__(12);
const prisma_module_1 = __webpack_require__(13);
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


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReservationService = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(7);
const prisma_service_1 = __webpack_require__(8);
const ioredis_1 = __importDefault(__webpack_require__(5));
let ReservationService = class ReservationService {
    prismaService;
    redisClient;
    constructor(prismaService, redisClient) {
        this.prismaService = prismaService;
        this.redisClient = redisClient;
    }
    async holdSeat(seatId, userId) {
        try {
            const lockKey = `lock:seat:${seatId}`;
            const acquired = await this.redisClient.set(lockKey, userId, 'EX', 600, 'NX');
            if (!acquired) {
                return {
                    success: false,
                    message: 'Seat already reserved',
                };
            }
            await this.prismaService.seat.update({
                where: { id: seatId },
                data: { status: 'HELD', userId }
            });
            return {
                success: true,
                message: 'Seat reserved successfully',
            };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Internal server error';
            throw new microservices_1.RpcException({
                status: 'error',
                message,
            });
        }
    }
    async validateHold(userId, seatId) {
        const lockKey = `lock:seat:${seatId}`;
        const seat = await this.redisClient.get(lockKey);
        if (!seat) {
            throw new microservices_1.RpcException({
                status: 'error',
                message: 'Seat is not held (hold missing or expired) — call /reservations/hold before checkout',
            });
        }
        if (!(seat === userId)) {
            throw new microservices_1.RpcException({
                status: 'error',
                message: 'Место занято'
            });
        }
        return true;
    }
    async releaseHold(seatId) {
        const seat = await this.prismaService.seat.findUnique({
            where: {
                id: seatId
            }
        });
        if (!seat) {
            throw new microservices_1.RpcException({
                error: 'error',
                message: 'Места нету'
            });
        }
        const lockKey = `lock:seat:${seatId}`;
        await this.redisClient.del(lockKey);
        return this.prismaService.seat.update({
            where: {
                id: seatId
            },
            data: {
                status: "FREE",
                userId: null,
            }
        });
    }
};
exports.ReservationService = ReservationService;
exports.ReservationService = ReservationService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('REDIS_CLIENT')),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof ioredis_1.default !== "undefined" && ioredis_1.default) === "function" ? _b : Object])
], ReservationService);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const common_1 = __webpack_require__(3);
const adapter_pg_1 = __webpack_require__(9);
const pg_1 = __webpack_require__(10);
const client_1 = __webpack_require__(11);
const config_1 = __webpack_require__(4);
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


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@prisma/adapter-pg");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("pg");

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.ReservationController = void 0;
const common_1 = __webpack_require__(3);
const reservation_service_1 = __webpack_require__(6);
const microservices_1 = __webpack_require__(7);
let ReservationController = class ReservationController {
    reservationService;
    constructor(reservationService) {
        this.reservationService = reservationService;
    }
    async holdSeat(data) {
        try {
            return this.reservationService.holdSeat(data.seatId, data.userId);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Internal server error';
            if (error instanceof microservices_1.RpcException) {
                throw error;
            }
            throw new microservices_1.RpcException({
                status: 'error',
                message,
            });
        }
    }
    async validateHold(data) {
        try {
            return this.reservationService.validateHold(data.userId, data.seatId);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                status: 'error',
                message: error,
            });
        }
    }
    async releaseHold(seatId) {
        try {
            return this.reservationService.releaseHold(seatId);
        }
        catch (error) {
            throw new microservices_1.RpcException({
                status: 'error',
                message: error,
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
__decorate([
    (0, microservices_1.MessagePattern)('validate_hold'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "validateHold", null);
__decorate([
    (0, microservices_1.MessagePattern)('release_hold'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationController.prototype, "releaseHold", null);
exports.ReservationController = ReservationController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof reservation_service_1.ReservationService !== "undefined" && reservation_service_1.ReservationService) === "function" ? _a : Object])
], ReservationController);


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(8);
const config_1 = __webpack_require__(4);
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


/***/ })
/******/ 	]);
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

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const reservation_module_1 = __webpack_require__(2);
const microservices_1 = __webpack_require__(7);
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