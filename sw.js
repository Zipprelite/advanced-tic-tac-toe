// Only used to show "your turn" notifications (phones need this) and open the game when one is clicked.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const code = (e.notification.data || {}).code;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(cs => {
    const c = cs[0];
    if (c) { c.postMessage({ att: "open-async", code }); return c.focus(); }
    return self.clients.openWindow("./");
  }));
});
