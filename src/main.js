import { ErrorPage } from "./pages/ErrorPage";
import {
  addUserInfo,
  checkUserInfo,
  //   checkUserInfo,
  deleteUserInfo,
  LoginPage,
  // reCheckUserInfo,
} from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { ProfilePage } from "./pages/ProfilePage";

const routers = {
  //1. 함수를 실행하면 안되는 이유
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
};

const router = () => {
  const path = window.location.pathname;
  // const isValidLoggedIn = checkUserInfo();

  //2. 즉시 실행 안하면 안되는 이유
  const render = (routers[path] || ErrorPage)();

  const app = document.getElementById("root");

  app.innerHTML = render; //렌더링이 되고나서

  if (path === "/login") {
    addUserInfo(); //해당 함수 실행

    // console.log("addUserInfo result", result);

    // console.log(" addUserInfo login", checkUserInfo());

    //문제상황: addUserInfo에서 로컬스토리지에 저장하고 저장된 값을 checkUserInfo서 확인하고 리다이렉트 시키는데, 비동기로 동작하는 로컬스토리지 때문에 타이밍문제

    // router();
    // if (result) {
    //   if (checkUserInfo()) {
    // window.history.pushState({}, "", "/");
    // router();
    //   }
    // }
  }

  if (path === "/") {
    deleteUserInfo();
  }

  if (path === "/profile") {
    // if (!isValidLoggedIn) window.history.pushState({}, "", "/login");

    if (checkUserInfo()) {
      deleteUserInfo();
      // router();
    }

    if (!checkUserInfo()) {
      // console.log("inin");
      window.history.pushState({}, "", "/login");
      // history.replaceState({}, "", "/login");
      router(); //왜 이거를 한번 더 해줘야지 리다이렉트가 되는거지?
    }
  }
};

// const navigate = (event) => {
//   event.preventDefault();

//   const href = event.target.getAttribute("href");

//   //history.pushState(state, title, url);
//   //state: 상태 객체로, 브라우저 세션 기록 스택에 저장될 데이터입니다.

//   console.log("href", href);

//   if (href) {
//     // window.history.pushState({}, "", href); //주소 변경
//     router(); //렌더링
//   }
// };

const initRouter = () => {
  window.addEventListener("popstate", router); //뒤로가기, 앞으로가기

  // const isValidLoggedIn = checkUserInfo();

  // const currentPath = window.location.pathname;

  // if (!isValidLoggedIn && currentPath !== "/login")
  //   window.history.replaceState({ isLoggedIn: false }, "", "/login");

  // document.addEventListener("click", (event) => {
  //   console.log("event", event.target);
  //   if (event.target.matches("[data-link]")) {
  //     navigate(event);
  //   }
  // });

  router();
};

initRouter();
