const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path'); 

// Define el esquema de GraphQL
const typeDefs = gql`
  type Query {
    hello(message: String!): String
    aboutLeninCarabali: String
    aboutAlejandroGiron: String
    aboutDavidOrdoñez: String
    aboutAgrace: String
  }
`;

// Define los resolvers de GraphQL
const resolvers = {
  Query: {
    hello: (_, { message }) => {
        return `¡Hola, ${message}! Un saludo por parte del profe `;
      },
    aboutLeninCarabali: () => {
        return `Soy Lenin Carabali. Me gusta mucho leer sobre distopías; Rebelión en la granja fue
        la última que me leí. En su momento quise estudiar filosofía.`;
      },
    aboutAlejandroGiron: () => {
      return `Hola, Soy Alejandro Giron, me gusta la programación y jugar Lolsito en mis tiempos libres,
      en este momento estoy enfocado en aprender nuevos lenguajes de programación.`;
    },
    aboutDavidOrdoñez: () => {
      return `Soy David Camilo Ordoñez Marin. Me gustan las artes marciales tanto verlas como practicarlas y tambien me gustan los cubos rubik.`;
    },  
    aboutAgrace: ()=> {
      return  `Soy juan camilo. me gusta mucho el gymn. ademas, me interesa el mundo de AI`;
    }
  },
};

async function startApolloServer() {
  // Crea la instancia de Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers });

  // Inicia el servidor Apollo
  await server.start();

  // Crea la aplicación Express
  const app = express();

  // Aplica el middleware de Apollo Server a la aplicación Express
  server.applyMiddleware({ app, path: '/graphql' });

  // Sirve la aplicación de React desde la carpeta "saludofront-app"
   const reactAppPath = path.join(__dirname, 'saludofront-app', 'dist');
    app.use(express.static(reactAppPath));
    app.get('*', (req, res) => {
    res.sendFile(path.join(reactAppPath, 'index.html'));
    });

  // Inicia el servidor
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL ejecutándose en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();