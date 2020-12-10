CREATE TABLE `Users`
(
  `FirstName` varchar
(255) DEFAULT NULL,
  `LastName` varchar
(255) DEFAULT NULL,
  `Email` varchar
(255) NOT NULL,
  `Password` varchar
(255) DEFAULT NULL,
  PRIMARY KEY
(`Email`)
);

CREATE TABLE `Posts`
(
  `ID` varchar
(255) NOT NULL,
  `Title` varchar
(255) NOT NULL,
  `Content` blob NOT NULL,
  `Created` datetime NOT NULL,
  `Updated` datetime DEFAULT NULL,
  `Deleted` datetime DEFAULT NULL,
  `Author` varchar
(255) DEFAULT NULL,
  PRIMARY KEY
(`ID`),
  KEY `Author`
(`Author`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY
(`Author`) REFERENCES `Users`
(`Email`)
);
