import router from "express";

const groupRouters = router();

groupRouters.get("/group");
groupRouters.get("/group/list");
groupRouters.get("/group/list/info");
groupRouters.get("/group/random");
groupRouters.get("/group/:name");
groupRouters.get("/group/board");
groupRouters.post("/group/board");
groupRouters.get("/group/board/:id").get().put().post();
groupRouters.delete("/group/board/drop/:id");
groupRouters.delete("/group/drop");
groupRouters.delete("/group/exile");
groupRouters.post("/group/img");

module.exports = groupRouters;
