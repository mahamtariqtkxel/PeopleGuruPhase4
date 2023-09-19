//SideBar Toggle
const openMenuBtn = document.querySelector(".open-menu");
const closeMenuBtn = document.querySelector(".menu-collapse");
const sideBar = document.querySelector(".sidebar");
const navList = document.querySelector(".pg-app-nav-list");
const mainArea = document.querySelector(".main");

const openMenu = () => {
  sideBar.classList.remove("sidebar-collapse");
  sideBar.classList.add("sidebar-open");
  jobLeftArea.classList.remove("main-close");
  jobLeftArea.classList.add("main-open");
  openMenuBtn.classList.remove("open-menu-visible");
};
const closeMenu = () => {
  sideBar.classList.remove("sidebar-open");
  sideBar.classList.add("sidebar-collapse");
  mainArea.classList.remove("main-open");
  mainArea.classList.add("main-close");
  openMenuBtn.classList.add("open-menu-visible");
};
openMenuBtn.onclick = openMenu;
closeMenuBtn.onclick = closeMenu;
//job collapse
const openJobBtn = document.querySelector(".pg-app-open-job");
const closeJobBtn = document.querySelector(".pg-app-job-collapse");
const jobLeftArea = document.querySelector(".pg-app-left-sec");
const jobRightArea = document.querySelector(".pg-app-right-sec");
const openJobMenu = () => {
  jobLeftArea.classList.remove("close-job");
  jobLeftArea.classList.add("open-collapse");
  jobRightArea.classList.add("right-open");
};
const closeJobMenu = () => {
  jobLeftArea.classList.remove("open-collapse");
  jobLeftArea.classList.add("close-job");
  jobRightArea.classList.remove("right-open");
};
openJobBtn.onclick = openJobMenu;
closeJobBtn.onclick = closeJobMenu;
