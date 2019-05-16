export const config =
  process.env.NODE_ENV === "development"
    ? {
        api: "http://localhost:8080/api",
        websocket: "ws://localhost:8080/api/ws/"
      }
    : {
        api: `${window.location.origin}/api`,
        websocket: `ws://${window.location.hostname}:${
          window.location.port
        }/api/ws/`
      };
