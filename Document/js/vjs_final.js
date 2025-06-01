// 실시간 시계
function updateClock() {
  const clock = document.getElementById('clock');
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  clock.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// 랜덤 배경 이미지
const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80'
];
function setRandomBg() {
  const bg = document.getElementById('background');
  const idx = Math.floor(Math.random() * images.length);
  bg.style.backgroundImage = `url('${images[idx]}')`;
}
setRandomBg();

// 로그인 
const loginForm = document.getElementById('login-form');
const loginInput = document.getElementById('login-input');
const greeting = document.getElementById('greeting');
const USER_KEY = "username";

function paintGreeting(name) {
  greeting.textContent = `안녕하세요, ${name}님!`;
  greeting.classList.remove('hidden');
  document.getElementById('todo-form').classList.remove('hidden');
}

function onLoginSubmit(e) {
  e.preventDefault();
  localStorage.setItem(USER_KEY, loginInput.value);
  loginForm.classList.add('hidden');
  paintGreeting(loginInput.value);
}
loginForm.addEventListener('submit', onLoginSubmit);

const savedUser = localStorage.getItem(USER_KEY);
if (savedUser) {
  loginForm.classList.add('hidden');
  paintGreeting(savedUser);
} else {
  loginForm.classList.remove('hidden');
}

// 투두리스트 
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const TODOS_KEY = "todos";
let todos = JSON.parse(localStorage.getItem(TODOS_KEY)) || [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(e) {
  const li = e.target.parentElement;
  todos = todos.filter(todo => todo.id !== parseInt(li.id));
  saveTodos();
  li.remove();
}

function paintTodo(todo) {
  const li = document.createElement('li');
  li.id = todo.id;
  li.textContent = todo.text;
  const btn = document.createElement('button');
  btn.textContent = "❌";
  btn.onclick = deleteTodo;
  li.appendChild(btn);
  todoList.appendChild(li);
}

function onTodoSubmit(e) {
  e.preventDefault();
  const newTodo = {
    text: todoInput.value,
    id: Date.now()
  };
  todos.push(newTodo);
  paintTodo(newTodo);
  saveTodos();
  todoInput.value = '';
}
todoForm.addEventListener('submit', onTodoSubmit);

todos.forEach(paintTodo);

// 위치 및 날씨
function onGeoOk(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  const API_KEY = "3e7f19364c64c0a4f0e3292d27db9a4d"; 
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`)
    .then(res => res.json())
    .then(data => {
      const weather = document.getElementById('weather');
      weather.textContent = `${data.name} ${data.weather[0].main} / ${data.main.temp}°C`;
    });
}
function onGeoError() {
  const weather = document.getElementById('weather');
  weather.textContent = "위치 정보를 찾을 수 없습니다.";
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);


