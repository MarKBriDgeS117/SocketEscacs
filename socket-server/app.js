const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

let roomNumber = 1;
let jugadorsPartida = [];
const equips = [];
let condition = false;
countTotal = 0;
count = 0;
const returnJugador = () => {
  for (let equipIndex = 0; equipIndex < equips.length; equipIndex++) {
    const { equipAssignat, nom, jugadors } = equips[equipIndex];
    if (!equipAssignat) {
      for (
        let jugadorIndex = 0;
        jugadorIndex < jugadors.length;
        jugadorIndex++
      ) {
        const { jugadorAssignat, jugador } = jugadors[jugadorIndex];
        if (!jugadorAssignat) {
          jugadors[jugadorIndex].jugadorAssignat = true;
          condition = !condition;
          if (count >= 2) taulell = condition ? "2" : "1";
          else taulell = condition ? "1" : "2";
          count++;
          if (count == 4) count = 0;
          if (condition) color = "Blanc";
          else color = "Negre";
          jugadorsPartida.push({
            equip: nom,
            jugador,
            taulell,
            roomNumber: roomNumber,
            color: color,
          });
          return {
            equip: nom,
            jugador,
            taulell,
            roomNumber: roomNumber,
            color: color,
          };
        }
      }
      equips[equipIndex].equipAssignat = true;
    }
  }
};

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("jugar", () => {
    const clientsInRoom = io.sockets.adapter.rooms.get(`room-${roomNumber}`);
    const equip = returnJugador();
    console.log(equip);
    // Join the room with the current room number
    socket.join(`room-${roomNumber}`);
    socket.emit("jugador", equip);

    if (clientsInRoom && clientsInRoom.size == 4) {
      console.log(`room-${roomNumber} is now full`);
      io.to(`room-${roomNumber}`).emit("comencaPartida", jugadorsPartida);
      jugadorsPartida = [];
      roomNumber++;
    }
  });

  socket.on("mourePeca", (moviment) => {
    io.to(`room-${moviment.roomNumber}`).emit("moviment", moviment);
  });

  socket.on("addEquip", (equip) => {
    console.log(equip)
    const jugadors = [
      { jugador: equip.jugador1.jugador, jugadorAssignat: false },
      { jugador: equip.jugador2.jugador, jugadorAssignat: false },
    ];
    equips.push({ nom: equip.nomEquip, jugadors, equipAssignat: false });

    socket.emit("equips", Object.keys(equips));
    socket.emit("equip", equip);
    console.log(equips);
  });
});

http.listen(4444, () => {
  console.log("listening on *:4444");
});
