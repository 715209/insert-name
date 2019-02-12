"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
exports.socket = socket_io_1.default();
// Handlers
// import testing from "./handlers/testing";
exports.socket.on("connection", handleSocket);
function handleSocket(client) {
    // client.on("test", functionhere);
}
const port = process.env.PORT || 3001;
exports.socket.listen(port);
console.log("listening on port", port);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDBEQUFpQztBQUVwQixRQUFBLE1BQU0sR0FBb0IsbUJBQVEsRUFBRSxDQUFDO0FBRWxELFdBQVc7QUFDWCw0Q0FBNEM7QUFFNUMsY0FBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFdEMsU0FBUyxZQUFZLENBQUMsTUFBVztJQUM3QixtQ0FBbUM7QUFDdkMsQ0FBQztBQUVELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUN0QyxjQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUMifQ==