General
==============
Our design model separates model methods from UI methods.
It is using prototypes as the way to implement JS classes.
The JS classes form the "model" part of the application, where all logic is implemented and all game entities are represented.
CSS classes are defined to allow better definition and interaction with the UI.
The card images are named according to a defined convention that allows the "binding" of a card image file to its model entity.

Classes
==============
1.	Game - this is the main class, responsible for the orchestration of all the other models, and the flow of the game entities.
	This acts as the root object and is bound to the DOM's 'window' property to allow its persistency and easy access to it in
	methods that interact with the UI.
2.	Card - Mostly self explanatory. Has a method that generates the corresponding image file name, to allow binding of a Card 
	class to its image file.
3.	Player - Represents a player of the game, both a human player and a computer player. The decision to differentiate the two 
	using a class property (used as a flag), rather then using inheritance and polymorphism - has been made because this kind
	of implementation complexity is not required.
4.	Deck - represents the deck of cards from which the players can take cards. Acts as a stack.
5.	OpenDeck - represents the main heap of cards, on which the players put cards.
6.	MoveGenerator - a helper class that holds the logic for the computer player.


Assumptions
==============
1.	The game is for 1 computer player, and 1 human player.
2.	A game that ends in withdraw has no winner. Our logic is that the game is multiplayer and if someone withdraws - how would one decide the winner out of the rest of the remaining players? Although now the game is only for 2, we make this interpolation.

Bonuses
==============
1.	"+" Card
2.	New Game at the end of a game


Remarks
==============
*	We chose to help the user understand the possible cards he can click, by changing the mouse pointer to look clickable.
*	start_page.html is an extension of the exercise requirements. It is a simple form that allows to start a game with any given
	number of human and computer players. The exercise requires only one human player and one computer player, so this file is
	not used in this exercise. Might be used in future.