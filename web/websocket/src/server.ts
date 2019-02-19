import socketIo from "socket.io";

export const socket: socketIo.Server = socketIo();

// Handlers
// import testing from "./handlers/testing";

socket.on("connection", handleSocket);

function handleSocket(client: any) {
    console.log(client);
    // client.on("test", functionhere);
}

const port = process.env.PORT || 3001;
socket.listen(port);
console.log("listening on port", port);
