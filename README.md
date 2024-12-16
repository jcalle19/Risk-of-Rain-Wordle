# Risk-of-Rain-Wordle
Wordle game that uses items from the game Risk of Rain 2 instead. Inspired by the game seen at Isaacle.com

Code Logic Overview (Work in Progress)
- Player starts by selecting the start game button, which automatically generates a random item from the item map in a separate script
- The player enters an item in the guess bar, and the guess is formatted to match the keys (lowercase, no spaces/other symbols)
- A row is created and added to the bottom of the table and each cell is given a dynamically produced id in the DOM, and the
  text is changed to reflect the item characteristic at the same index in the table
- The attributes of the guessed item and the generated item are then compared, and depending on how correct the guess is, a color is assigned
- Repeat until success or no guesses left

Currently in Progress
- animations
  (when starting with soldier syringe the animation is not properly aligned)
- need to fix reset button being unclickable
- start button should not be available during game
- add all items and images
- touch up styles
- finish main menu
- other stuff idk

Planned additions
- Game Modifiers
- Improved styling

MIGHT be added at somepoint in the future
- Daily Runs
- Backend
- Leaderboards

