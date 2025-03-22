# StudentHub

## Steps to start developing
- Install MySQL Server and get it running, make sure you setup a user and password
- Install NodeJS and NPM
- Install and configure Git
- Clone this repository using `git clone https://github.com/KieranBrooks/Group-Project-CSY2088`
- Create .env file in studenthub folder and put `DATABASE_URL="mysql://USERNAME:PASSWORD!@localhost:3306/studenthub"` in it. Replace `USERNAME` with your mysql username and replace `PASSWORD` with your mysql password.
- Run `npm install`
- Run `npx prisma generate` and when asked if you sure say `Y`
- Set Git remote origin using command `git remote add origin https://github.com/KieranBrooks/Group-Project-CSY2088`
- You can now start developing. To start a development server run `npm run dev`. Any changes to code will hot reload.

## Making changes
- Before making a change, create and navigate to a new git branch. If you are working on a specific feature run a command like `git checkout -B new-feature` replacing `new-feature` with a branch name that makes sense. 
- When on your feature branch, add a file using `git add PATH_TO_FILE` or add all using `git add .`. 
- When on your feature branch, commit changes using `git commit -m "my message quickly sumarising what these changes result in"`
- When you want to push your feature branch run `git push origin new-feature` where `new-feature` is the branch name you selected. 
- Create a pull request on GitHub for your feature into development branch. I (Tyler) will review it and merge it if its all good.
- Never delete the main branch or development branch. If you are finished with `new-feature` branch you can delete it.

## Things to read
- https://svelte.dev/docs/kit/introduction
- https://www.prisma.io/docs/orm/overview/introduction
- https://tailwindcss.com/docs/styling-with-utility-classes
