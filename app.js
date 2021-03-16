const express = require("express");
const prisma = require("@prisma/client");
const app = express();
const client = new prisma.PrismaClient();
const PORT = 3000;

app.use(express.json());

// rest is about defining resources
// resources should be isolated from each other

// 1 resource for users
// another for bucket lists

app.get("/", (req, res) => {
  res.json({
    test: "hello world",
  });
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  client.user
    .findUnique({
      where: {
        id: Number(userId),
      },
    })
    .then((user) => {
      res.json(user);
    });
});

app.get("/users", (req, res) => {
  client.user.findMany().then((users) => {
    res.json(users);
  });
});

app.post("/users", (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  client.user
    .create({
      data: {
        email: email,
        name: name,
      },
    })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/buckets", (req, res) => {
  client.bucketListItem.findMany().then((bucketListItem) => {
    res.json(bucketListItem);
  });
});

app.get("/buckets/:id", (req, res) => {
  const authorId = req.params.id;
  client.bucketListItem
    .findUnique({
      where: {
        id: Number(authorId),
      },
    })
    .then((bucketListItem) => {
      res.json(bucketListItem);
    });
});

app.post("/buckets", (req, res) => {
  const userId = 1;
  client.bucketListItem
    .create({
      data: {
        title: req.body.title,
        authorId: Number(req.body.authorId),
      },
    })
    .then((bucketListItem) => {
      client.bucketListItem
        .findUnique({
          where: { id: bucketListItem.id },
          include: { author: true },
        })
        .then((bucketListItemWithUser) => {
          res.json(bucketListItemWithUser);
        });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/locations", (req, res) => {
  client.location.findMany().then((locations) => {
    res.json(locations);
  });
});

app.get("/locations/:id", (req, res) => {
  const ownerId = req.params.id;
  client.location
    .findUnique({
      where: {
        id: Number(ownerId),
      },
    })
    .then((location) => {
      res.json(location);
    });
});

app.post("/locations", (req, res) => {
  client.location
    .create({
      data: {
        location: req.body.location,
        ownerId: Number(req.body.ownerId),
      },
    })
    .then((location) => {
      client.location
        .findUnique({
          where: { id: location.id },
          include: { owner: true },
        })
        .then((locationWithUser) => {
          res.json(locationWithUser);
        });
    })
    .catch((err) => {
      console.error(err);
    });
});

app.listen(PORT, () => {
  console.log(`server is listening on localhost${PORT}`);
});
