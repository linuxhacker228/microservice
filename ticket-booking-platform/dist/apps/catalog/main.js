/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/catalog/prisma/prisma.controller.ts"
/*!**************************************************!*\
  !*** ./apps/catalog/prisma/prisma.controller.ts ***!
  \**************************************************/
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
exports.PrismaController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./apps/catalog/prisma/prisma.service.ts");
let PrismaController = class PrismaController {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
};
exports.PrismaController = PrismaController;
exports.PrismaController = PrismaController = __decorate([
    (0, common_1.Controller)('prisma'),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], PrismaController);


/***/ },

/***/ "./apps/catalog/prisma/prisma.module.ts"
/*!**********************************************!*\
  !*** ./apps/catalog/prisma/prisma.module.ts ***!
  \**********************************************/
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
const prisma_service_1 = __webpack_require__(/*! ./prisma.service */ "./apps/catalog/prisma/prisma.service.ts");
const prisma_controller_1 = __webpack_require__(/*! ./prisma.controller */ "./apps/catalog/prisma/prisma.controller.ts");
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Module)({
        controllers: [prisma_controller_1.PrismaController],
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ },

/***/ "./apps/catalog/prisma/prisma.service.ts"
/*!***********************************************!*\
  !*** ./apps/catalog/prisma/prisma.service.ts ***!
  \***********************************************/
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

/***/ "./apps/catalog/src/catalog.controller.ts"
/*!************************************************!*\
  !*** ./apps/catalog/src/catalog.controller.ts ***!
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
var CatalogController_1;
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatalogController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const catalog_service_1 = __webpack_require__(/*! ./catalog.service */ "./apps/catalog/src/catalog.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const event_dto_1 = __webpack_require__(/*! ./dto/event.dto */ "./apps/catalog/src/dto/event.dto.ts");
const seat_dto_1 = __webpack_require__(/*! ./dto/seat.dto */ "./apps/catalog/src/dto/seat.dto.ts");
const user_dto_1 = __webpack_require__(/*! ./dto/user.dto */ "./apps/catalog/src/dto/user.dto.ts");
let CatalogController = CatalogController_1 = class CatalogController {
    catalogService;
    logger = new common_1.Logger(CatalogController_1.name);
    constructor(catalogService) {
        this.catalogService = catalogService;
    }
    getEvents() {
        this.logger.log('Received get_events message');
        return this.catalogService.getAllEvents();
    }
    createEvent(dto) {
        this.logger.log(`Received create_event message: ${JSON.stringify(dto)}`);
        return this.catalogService.createEvent(dto);
    }
    createSeat(dto) {
        this.logger.log(`Received create_seat message: ${JSON.stringify(dto)}`);
        return this.catalogService.createSeat(dto);
    }
    getSeats(eventId) {
        this.logger.log(`Received get_seats message for eventId: ${eventId}`);
        return this.catalogService.getSeatsByEvent(eventId);
    }
    createUser(dto) {
        this.logger.log(`Received create_user message for email: ${dto.email}`);
        return this.catalogService.createUser(dto);
    }
    getSeatsByUser(userId) {
        this.logger.log(`Received get_seats_by_user message for userId: ${userId}`);
        return this.catalogService.getSeatsByUser(userId);
    }
};
exports.CatalogController = CatalogController;
__decorate([
    (0, microservices_1.MessagePattern)('get_events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getEvents", null);
__decorate([
    (0, microservices_1.MessagePattern)('create_event'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof event_dto_1.EventDto !== "undefined" && event_dto_1.EventDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "createEvent", null);
__decorate([
    (0, microservices_1.MessagePattern)('create_seat'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof seat_dto_1.CreateSeatDto !== "undefined" && seat_dto_1.CreateSeatDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "createSeat", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_seats'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getSeats", null);
__decorate([
    (0, microservices_1.MessagePattern)('create_user'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof user_dto_1.CreateUserDto !== "undefined" && user_dto_1.CreateUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "createUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_seats_by_user'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getSeatsByUser", null);
exports.CatalogController = CatalogController = CatalogController_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof catalog_service_1.CatalogService !== "undefined" && catalog_service_1.CatalogService) === "function" ? _a : Object])
], CatalogController);


/***/ },

/***/ "./apps/catalog/src/catalog.module.ts"
/*!********************************************!*\
  !*** ./apps/catalog/src/catalog.module.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatalogModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const catalog_controller_1 = __webpack_require__(/*! ./catalog.controller */ "./apps/catalog/src/catalog.controller.ts");
const catalog_service_1 = __webpack_require__(/*! ./catalog.service */ "./apps/catalog/src/catalog.service.ts");
const prisma_module_1 = __webpack_require__(/*! ../prisma/prisma.module */ "./apps/catalog/prisma/prisma.module.ts");
let CatalogModule = class CatalogModule {
};
exports.CatalogModule = CatalogModule;
exports.CatalogModule = CatalogModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
        ],
        controllers: [catalog_controller_1.CatalogController],
        providers: [catalog_service_1.CatalogService],
    })
], CatalogModule);


/***/ },

/***/ "./apps/catalog/src/catalog.service.ts"
/*!*********************************************!*\
  !*** ./apps/catalog/src/catalog.service.ts ***!
  \*********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CatalogService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const bcrypt = __importStar(__webpack_require__(/*! bcrypt */ "bcrypt"));
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./apps/catalog/prisma/prisma.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let CatalogService = class CatalogService {
    prismaService;
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getAllEvents() {
        return this.prismaService.event.findMany();
    }
    async createEvent(dto) {
        if (!dto.date) {
            throw new microservices_1.RpcException('date is required');
        }
        let dateValue;
        if (dto.date instanceof Date) {
            dateValue = dto.date;
        }
        else {
            dateValue = new Date(dto.date);
            if (isNaN(dateValue.getTime())) {
                throw new microservices_1.RpcException('Invalid date format: expected ISO-8601 DateTime');
            }
        }
        return this.prismaService.event.create({
            data: {
                name: dto.title,
                description: dto.description,
                date: dateValue,
                venueName: dto.venueName,
            }
        });
    }
    async createSeat(dto) {
        if (!dto.eventId) {
            throw new microservices_1.RpcException('eventId is required');
        }
        if (!dto.seatNumber) {
            throw new microservices_1.RpcException('seatNumber is required');
        }
        const event = await this.prismaService.event.findUnique({ where: { id: dto.eventId } });
        if (!event) {
            throw new microservices_1.RpcException(`Event with id ${dto.eventId} not found`);
        }
        return this.prismaService.seat.create({
            data: {
                eventId: dto.eventId,
                seatNumber: dto.seatNumber,
                price: dto.price,
            }
        });
    }
    getSeatsByEvent(eventId) {
        return this.prismaService.seat.findMany({
            where: { eventId },
            include: { user: { select: { id: true, name: true, email: true } } },
        });
    }
    getSeatsByUser(userId) {
        return this.prismaService.seat.findMany({
            where: { userId },
            include: { event: { select: { id: true, name: true, date: true, venueName: true } } },
        });
    }
    async createUser(dto) {
        if (!dto.name) {
            throw new microservices_1.RpcException('name is required');
        }
        if (!dto.email) {
            throw new microservices_1.RpcException('email is required');
        }
        if (!dto.password) {
            throw new microservices_1.RpcException('password is required');
        }
        const existing = await this.prismaService.user.findUnique({ where: { email: dto.email } });
        if (existing) {
            throw new microservices_1.RpcException(`User with email ${dto.email} already exists`);
        }
        const user = await this.prismaService.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: await bcrypt.hash(dto.password, 10),
            }
        });
        const { password, ...safeUser } = user;
        return safeUser;
    }
};
exports.CatalogService = CatalogService;
exports.CatalogService = CatalogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], CatalogService);


/***/ },

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

/***/ "./apps/catalog/src/dto/seat.dto.ts"
/*!******************************************!*\
  !*** ./apps/catalog/src/dto/seat.dto.ts ***!
  \******************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSeatDto = void 0;
class CreateSeatDto {
    eventId;
    seatNumber;
    price;
}
exports.CreateSeatDto = CreateSeatDto;


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

/***/ "bcrypt"
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
(module) {

module.exports = require("bcrypt");

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
/*!**********************************!*\
  !*** ./apps/catalog/src/main.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const catalog_module_1 = __webpack_require__(/*! ./catalog.module */ "./apps/catalog/src/catalog.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(catalog_module_1.CatalogModule, {
        transport: microservices_1.Transport.TCP,
        options: {
            host: 'localhost',
            port: 3001,
        }
    });
    await app.listen();
}
bootstrap();

})();

/******/ })()
;