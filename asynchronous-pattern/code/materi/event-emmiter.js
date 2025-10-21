import { EventEmitter } from "events";

const emitter = new EventEmitter();
emitter.on("pesan", (nama) => console.log(`Halo ${nama}`));
emitter.emit("pesan", "Fitra");
