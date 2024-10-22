# Ultimate React Course--Eat-N-Split

This is a sample react project showing some examples of state Toggle, customComponents, more mapping, conditional rendering, and more

## Table of contents

- [Ultimate React Course--Eat-N-Split](#ultimate-react-course--eat-n-split)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
  - [Author](#author)

## Overview

### The challenge

Users should be able to:

- Add friends to the friends list without mutating the original array
- get a random id with crypto.randomUUID() method
- conditionally render the addFriend Form
- conditionally render the split the bill component when a friend is selected
- calculate who owe's who based on the selected friend and who is paying
- update the friends list based on the submitted calculations

### Screenshot

![](/src/Screen%20Shot%202024-07-08%20at%2019.14.43.png)

### Links

- Solution URL: (https://github.com/MorganEro/Eat-N-Split)
- Live Site URL: (morganero.github.io/Eat-N-Split/)

### Built with

- CSS custom properties
- JavaScript
- React
- Flexbox
- CSS Grid

### What I learned

1. learned to create a static project first before adding state for dynamic rendering
2. how to split a function into its own component using refactor
3. Prop drilling and Lifting start properly as to avoid unnecessary and excessive drilling.
4. custom components are a blank slate and properties like onClick that come prepackaged need to be sent in as properties
5. using spread operator instead of mutating original array
6. direct state toggle vs functional update. Functional update is better when new state is derived from old state
7. making a form, updating state, binding inputs to state variables, using a guard clause for falsy input values
8. using numeric values in input fields, formatting against non-numeric values, adding dollar sign inside input fields
9. creating a better user experience with form validation and error messages
10. Using the same button as a toggler and using optional chaining to prevent throwing an error when selection is null
11. using key props to control the reset of state based on a selection. Without the key props for FormSplitBill, the state would not reset based on the selected friend, which means that all 3 friends would should the split bill state even as different friends ae clicked.

### Continued development

I want to continue to grow my knowledge of React and its many capabilities.

## Author

- Website - [Morgan Ero] (https://github.com/MorganEro)
- Ultimate React Course- [Jonas Schmedtmann] UDEMY
