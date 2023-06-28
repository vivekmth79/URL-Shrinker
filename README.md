# URL Shrinker

URL Shrinker is a web application that allows users to shorten long URLs and keep track of the shortened URLs along with optional notes. This project is built using Node.js, Express.js, and MongoDB.

## Features

- Shorten long URLs to create compact and shareable links.
- Add optional notes to the shortened URLs for easy reference.
- Search functionality to find specific URLs based on full URL, short URL, or note.
- Display a table of shortened URLs with their corresponding details.
- Error handling for duplicate URLs and notes.

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/url-shrinker.git
   ```

2. Navigate to the project directory:

   ```shell
   cd url-shrinker
   ```

3. Install the dependencies:
   ```shell
   npm install
   ```

## Usage

1. Start the application:

   ```shell
   npm run devStart
   ```

2. Open your web browser and navigate to `http://localhost:5000`.

3. Enter a long URL in the input field and optionally add a note.

4. Click the "Shrink" button to create a shortened URL.

5. The shortened URL will be displayed in the table below.

6. Use the search bar to find specific URLs based on full URL, short URL, or note.

## Dependencies

The project uses the following dependencies:

- express: Fast, unopinionated, minimalist web framework for Node.js
- mongoose: Elegant MongoDB object modeling for Node.js
- shortid: Short id generator

You can install them using the command `npm install`.

## The Internal working of this Project:

**server.js:**

- Main entry point for the server-side code.
- Imports dependencies: Express, Mongoose, and the ShortUrl model.
- Establishes a connection to the MongoDB database.
- Configures the view engine as EJS and sets up middleware.
- Defines routes for URL search, URL shrinking, and URL redirection.
- Listens for incoming HTTP requests on the specified port.

**index.ejs:**

- View template for rendering the homepage.
- Contains HTML markup with embedded EJS code.
- Divided into three sections: search form, shrink form, and URL table.
- Search form allows users to search for URLs based on a query.
- Shrink form enables users to enter a URL and optional note for shortening.
- URL table displays existing URLs with their details.

**shortUrl.js:**

- Defines the ShortUrl model using Mongoose.
- Represents a document in the MongoDB collection for storing shortened URLs.
- Schema includes fields: full (full URL), short (short URL), notes.
- Includes a pre-save hook to generate a unique short URL before saving.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [shortid](https://www.npmjs.com/package/shortid)
