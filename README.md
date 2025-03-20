# StudentHub

## Steps to start developing
- Install MySQL Server and get it running, make sure you setup a user and password
- Install NodeJS and NPM
- Install and configure Git
- Clone this repository using `git clone https://github.com/KieranBrooks/Group-Project-CSY2088`
- Create .env file in studenthub folder and put `DATABASE_URL="mysql://USERNAME:PASSWORD!@localhost:3306/studenthub"` in it. Replace `USERNAME` with your mysql username and replace `PASSWORD` with your mysql password.
- Run `npm install`
- Run `npx prisma migrate reset` and when asked if you sure say `Y`
- You can now start developing. To start a development server run `npm run dev`. Any changes to code will hot reload.

## Things to read
- https://svelte.dev/docs/kit/introduction
- https://www.prisma.io/docs/orm/overview/introduction
