/**
 * Message Service
 */

// import RequestClient from "../request-client";
import BaseService from "./base-service";

const messageService = BaseService.create("messages", {
    // ...
});

export default messageService;