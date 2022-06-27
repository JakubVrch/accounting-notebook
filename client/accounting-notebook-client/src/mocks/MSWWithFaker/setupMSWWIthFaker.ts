export function setupMSWWIthFaker() {
  if (typeof window === "undefined") {
    import("./server").then((server) => {
      server.fakerServer.listen();
    });
  } else {
    import("./browser").then((browser) => {
      browser.fakerWorker.start();
    });
  }
}
