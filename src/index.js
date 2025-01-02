import React from "react";
import ReactDOM from "react-dom/client"; // Обратите внимание на импорт из "react-dom/client"
import App from "./app";

// Создаем корень для рендеринга
const root = ReactDOM.createRoot(document.getElementById("root"));

// Рендерим компонент
root.render(<App />);

const devMode = process.env.NODE_ENV === "development";

// Подключаем HMR (горячая замена модулей) в режиме разработки
if (devMode && module && module.hot) {
  module.hot.accept();
}
