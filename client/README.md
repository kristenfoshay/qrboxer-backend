<img alt="QRBoxer" src="https://user-images.githubusercontent.com/88470531/200191542-e1ad20bf-33de-4e86-9106-ebee88872375.jpg" width="450" height=auto>

## QR Boxer ##

http://noiseless-burst.surge.sh/

I'm currently designing a RESTful application platform to help users move to a new home. Users print out a QR code that they can stick to their box that will link to the app with a list of the items that are packed in the box scanned. Built using React, Node, Postgres, CSS, Bootstrap, HTML and qrcode.react.

![homepage](https://user-images.githubusercontent.com/88470531/200193161-56f9cc8a-ed40-4e28-8aef-7d3b8b0e71a5.PNG)

## App Features Include:

    Users can:
         create multiple moves and save them for future reference if needed.
         make boxes for their move and add items they are putting in each box. 
         post photos of the items that they have it in each box.
         print the QR Code for the box they are packing so they can attach it to their box and scan it later to see what's inside!

    Information for each move, box and item is saved for future reference so the user can locate their items later!
    
    
## Technology Used:

    Node.js
    Postgresql
    React
    CSS Bootstrap 
    HTML 
    qrcode.react
    
## Getting started with using QR Boxer locally:

After cloning the repository, install all dependencies in package.json using node/npm:


```bash
npm install
```

#### To create the database, start the Postgresql server and run qrboxer-schema.sql:

```bash
sudo service postgresql start
psql < qrboxer-schema.sql
```

Start the application to run locally:

```bash
npm start
```

## Future goals for QR Boxer:

#### QR Boxer is still a work in progress. Here are my future plans to streamline the UI/UX design:

        Add a drag and drop feature for dropping items into a virtual "box".
        Provide printing from the react app for each Box QR Code.
        Polish the design for user accessibility.