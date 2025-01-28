# WixiLite

Frontend JavaScript Developer test asignment for MailerLite. [Demo here](https://wixilite.vercel.app/).


## Requirements

- Build a simple drag & drop landing page builder using any of Vue.js, Angular, React. Extra points for using Vue.js.

This version is built using React.js. But the last 1-2 asignment days I replicated the project in Vue.js, you can check it out [here](https://github.com/juandc/wixilite-vue).


- Create 2 draggable blocks: Text and Image.

Created 3: Text, Image and Rectangle.


- The content of Text block should be editable.
- Image block can be edited by selecting one of the 3-4 predefined images.
- The user should be able to rearrange, duplicate and delete blocks.

All elements can be edited. All props are available in the right sidebar when selecting an element. Some others directly from the board, like position (with drag and drop), size (desktop-only), and text content.


- Landing page data like the text content, links to images, block order, etc. should be exported to a JSON format when the user clicks the “Save” button (console.log is enough).

Check!


- Style the application using CSS or a CSS framework of your choice (e.g., Tailwind CSS).

Check! Some components still use some temporary inline styles, I'll be refactoring them to regular CSS.


- The application should be responsive.

Ja! This one was interesting.

Responsive styling landing pages is "ease", but styling a responsive-landing-pages responsive-builder... that's a way more complicated design and development challenge.

My first thoughts were between (1) a fluid approach, allowing to configure almost all CSS properties, which requires container-elements to unlock flexbox / grid layouts, and (2) setting a fixed total page size, one for desktop and another for mobile, allowing to drop elements everywhere and later edit those fixed positions.

I chose to prioritize the 2nd option, because I think it's easier to understand for non-technical users and makes more sense with the asignment guidelines. Although the project architecture is ready to allow the first option too.

**Right now the landing pages builder is responsive, but the landing pages themselves are not yet**. Desktop "preview" board is not ready, I'll be working on that next.

Also, the landing pages builder's mobile design is not its best version. Instead of hamburger-menu-like sidebars, mobile-first experiences (e.g. Canva mobile app) use a fixed and always visible growing bottom bar. It's difficult on the web because of the vertical space, but I'd like to explore that option further.


- Test cases are a bonus.

Added tests for some components and utilities.

The most important ones double-check data updates (`src/utils/fixedElements`), although those modifications are development-env protected by the TS type structure (`src/types/IFixedLayout`).

Others make sure that the essential elements of the application are still there. That's useful for the future, although in an MVP stage with everything changing so much I would recommend prioritizing manual QA.


## TODOs for myself

- [ ] Fluid Layout
- [ ] Desktop board
- [ ] Fixed board custom height
- [ ] Elements links prop
- [ ] Mobile drags preview
- [ ] Mobile resize from board
- [ ] Desktop keyboard actions (duplicate, delete…)
- [ ] Open / close config bar with gestures
- [ ] Somewhere to list “pre-builded” previews
- [ ] Somewhere to transform JSON into page preview
