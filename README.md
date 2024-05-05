# Edit school final project

This was the final project for my React workshop. It consisted of creating a web application with admin and user capabilities. Under the hood I used Vite, Zustand, Tailwind, React and all of it is looking nice thanks to Shadcn's UI components, and it is all mobile frendly.

As far as data goes it is fetched from a local json server with pseudorandom delay on the fetches on the frontend. All of the data is pulled once and stored in Zustand store and all of the crow operations refresh the said store.
This would be ineffective for realistic amounts of data but for this example I decided that it would be good to demonstrate working with local data.

Some of the less noticable features are when in admin mode there are people listed when trying to sign up for a workshop, under workshop presenter is clickable and there is a theme switcher.

![Modal](https://github.com/PetarPoP/Edit-school-final/assets/47577541/8112a742-66ae-4bac-ad88-cec855c8b218)
A modal for adding workshops

![Panel](https://github.com/PetarPoP/Edit-school-final/assets/47577541/b9797708-0e5f-4610-9cd7-bc4b419f2748)
Workshops

![Admin panel](https://github.com/PetarPoP/Edit-school-final/assets/47577541/635df32a-0f99-4cec-9cf3-96d5dc44b5fa)
Admin panel
