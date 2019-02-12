"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
server_1.socket.on("connection", handleSocket);
function handleSocket() {
    setInterval(function () {
        const d = new Date();
        const n = d.getTime();
        server_1.socket.emit("test", {
            message: "testing " + Math.random(),
            admin: false,
            username: "Stress Test",
            timestamp: n
        });
    }, 1500);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQWtDO0FBRWxDLGVBQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBRXRDLFNBQVMsWUFBWTtJQUNqQixXQUFXLENBQUM7UUFDUixNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3JCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixlQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixPQUFPLEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDbkMsS0FBSyxFQUFFLEtBQUs7WUFDWixRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUUsQ0FBQztTQUNmLENBQUMsQ0FBQztJQUNQLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNiLENBQUMifQ==