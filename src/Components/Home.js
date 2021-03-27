import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1> Welcome to Initiative Tracker!</h1>
        <h2>How to use Initiative Tracker</h2>
        <p>This Website is your one stop shop to manage combat Encounters for 5th Edition Dungeons & Dragons. Here you can manage your Player Characters and
          have access to a user driven database of Monsters and various NPCs. Then display all the important information you need to run a combat Encounter.
        </p>
        <h3> Different Pages: </h3>
        <p>In the Nav Bar you can see the different pages on our site. Campaigns, Encounters, Player Characters, and Monsters.</p>
        <h4>Creating a Campaign</h4>
        <p> First thing you must do is create a Campaign! This can be on ongoing session that you have or even a oneshot. Create your first Campaign and then you
          will be able to add Encounters for it, and create PCs that exist in that Campaign. </p>
        <h4>Creating an Encounter</h4>
        <p>Once your Campaign is created now you can create Encounters for it. This is also where you will be able to access the Encounter Room, but before you do that you'll
          need to create some PCs and assign some Monsters to your Encounter! </p>
        <h4>Creating a PC</h4>
        <p> It's time to add your PCs to your Campaign. When you click the "Create Player Character" button, it will take you to the Player Character form.
          There is no need to add their profeciency bonus or what saving throws they are profecient in, we take care of that for you. </p>
        <h5>Adding a PC to an Encounter</h5>
        <p>Once you have created a PC you will be taken back to the Player Characters page, there you will see your new character and any others you've made.
          You will be able to update your characters for when they level up or potentialy lose stats such as their Max HP! On the character card click "Add to Encounter"
          and a window popup will appear, here you will assign them to an Encounter of the Campaign they are a part of!</p>
        <h4>Creating a Monster</h4>
        <p>Our Monsters page has a lot of exciting tools for you to create and use other users Monsters. On the Monsters page you can create a new Monster
          providing all the stats needed in combat. Then back on the Monsters page you can explore other users Monsters for your own use or view your own creations
          with the "My Monsters" button. You can search the database for Monsters by Name, Type, or Challenge rating.</p>
        <h5>Adding a Monster to an Encounter</h5>
        <p>Once you have found a monster you would like to use in one of your Encounters, click the "Add to Encounter" button and select the Encounter you
          would like to monster to be a part of!</p>
        <h3>Using the encounter page</h3>
        <p>Now that you have assigned Monsters and Players to an Encounter, back on the Encounter page, click the "View" button of the Encounter you would like to run.
          There you will see all the Players and Monsters that have been assigned to that Encounter. Each Character's current health will be set to their max HP, and initiative will
          start at 0. As you roll for initiative, input the number into that Character's "Initiative" field and click "Save" for them. As you save the initiative for
          each Character they will begin to sort themselves from top to bottom of the initiative order. While you are running your combat session you will now have easy access
          to each Characters' Ability Scores, Armor Class, and other important information. You must save each Characters' card everytime you change their initiative,
          concentration, or current health points.</p>

      </div>
    );
  }
}

export default Home;
