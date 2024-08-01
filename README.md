This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Weather App

Цей додаток, створений за допомогою React та Next.js, використовує API від OpenWeatherMap для отримання погодних даних. Він включає такі функції:

Додавання карточки міста: Користувачі можуть додати місто, для якого буде відображатися погодна інформація.
Почасовий графік температури: За допомогою бібліотеки Chart.js реалізований графік, який показує зміни температури протягом дня.
Графік змін температури за 5 днів: Додатковий графік відображає температурні зміни протягом п'яти днів.
Видалення карточок міста: Користувачі можуть видаляти карточки міст зі списку.
Додавання міст до улюблених: Можливість додавання міст у вкладку "Улюблені".
Дві сторінки: Головна сторінка відображає погодну інформацію, а вкладка "Улюблені" показує додані користувачем улюблені міста.
Кнопка визначення місця знаходження: Використовує API від ipinfo.io для автоматичного визначення місця знаходження користувача і відображення погоди для цього місця.

Головна 
![Hero page](https://github.com/Nikolay0803/weather_app/blob/master/src/app/project_photos/Main.png)

Улюблені 
![Main page](https://github.com/Nikolay0803/weather_app/blob/master/src/app/project_photos/Favorite.png)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
