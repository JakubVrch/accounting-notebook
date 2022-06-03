if (typeof window === "undefined") {
  import("./server").then((server) => {
    server.server.listen();
  });
} else {
  import("./browser").then((worker) => {
    worker.worker.start();
  });
}

export {};
