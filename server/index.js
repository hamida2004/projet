const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const db = require("./models");
const { getInfoFicheProduct, getInfoFicheArticle } = require("./Controllers/inventory");
const app = express();
const port = process.env.PORT || 3036;
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.json({ response: "home page" });
});
app.use('/inventory',require("./Routes/InventoryRouter"));
app.use("/refresh", require("./Routes/RefreshRouter"));
app.use("/auth", require("./Routes/AuthRouter"));
app.use("/users", require("./Routes/UserRouter"));
app.use("/resetpassword", require("./Routes/ResetPasswordRouter"));
app.use("/roles", require("./Routes/RoleRouter"));
app.use("/permissions", require("./Routes/PermissionRouter"));
app.use("/services", require("./Routes/ServiceRouter"));
app.use("/products", require("./Routes/ProductRouter")); //done
app.use("/branches", require("./Routes/BranchRouter")); //done
app.use("/chapters", require("./Routes/ChapterRouter")); //done
app.use("/commands", require("./Routes/CommandRouter")); //
app.use("/purchaseorders", require("./Routes/PurchasingOrderRouter")); //newest additions
app.use("/suppliers", require("./Routes/SupplierRouter")); //newest additions
app.use("/receipts", require("./Routes/ReceiptRouter")); //newest additions
app.use("/internalorders", require("./Routes/InternalOrderRouter")); //newest additions
app.use("/exitnotes", require("./Routes/ExitNoteRouter")); //newest additions

app.post("/finduser", async (req, res) => {
  const { token } = req.body;
  const foundUser = await db.User.findOne({ where: { token: token } });
  if (!foundUser) return res.json({ err: "user  not found" });
  return res.json({ foundUser });
});
app.delete("/", async (req, res) => {
  try {
    await db.PurchasingOrder.destroy({
      where: {},
      // truncate: true
    })
      .then((resp) => {
        res.status(200).send("deleted");
      })
      .catch((err) => res.status(500).send("error"));
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/create-br", (req, res) => {
  const chapters = [
    "Remboursement frais",
    "Matériel et mobilier",
    "Fournitures",
    "Documentation",
    "Habillement personnel",
    "Parc auto",
    "Travaux entretien",
    "Matériel accessoires informatique",
    "Matériel et mobilier pédagogique",
    "Frais liés aux études de post-graduation",
    "Participation aux organismes nationaux et internationaux",
    "Activités culturelles sportives et scientifiques aux étudiants",
    "Frais de fonctionnement liées à la recherche scientifique et au développement",
  ];
  const array11 = ["Frais de réception"];
  const array12 = [
    "Acquisition du matériels et mobiliers de bureaux",
    "Acquisition du matériel de prévision et de sécurité",
    "Acquisition de materiel audiovisuel",
    "Acquisitions du matériel de reprographie et d'imprimante",
    "Acquisition et entretien du matériel médicale",
  ];
  const array13 = [
    "Papeterie et fournitures de bureaux 1",
    "Produit d'entretien",
    "Fournitures de laboratoires et des ateliers d'enseignement et de recherche",
    "Produits pharmaceutiques et chimiques",
    "Frais de rellures et d'impression",
    "Papier d'ensignement",
    "Acquisition de drapeaux nationaux",
  ];
  const array14 = ["Ouvrages des bibliothéques"];
  const array16 = ["Habillement des personnels de service"];
  const array17 = [
    "Acquisitions du carburant et lubrifiants et graisses",
    "Acquisition des pneu pour voiture",
    "Entretien, réparation et achat d'outillage et pièces de recharges",
  ];
  const array18 = ["Quincaillerie"];
  const array21 = ["Acqisition du matériels informatiques"];
  const array22 = ["Acquisition du matériels et mobiliers pédagogiques."];
  const array23 = [
    "Matériels et fournitures au profit poste graduation",
    "Logiciels informatiques Spécialisé",
  ];
  const array27 = ["Activité culturelle", "Activite sportive"];
  const array32 = ["Matériels, instrument et petit outillages scientifiques"];
  const branches = [
    { id: 1, array: array11 },
    { id: 2, array: array12 },
    { id: 3, array: array13 },
    { id: 4, array: array14 },
    { id: 5, array: array16 },
    { id: 6, array: array17 },
    { id: 7, array: array18 },
    { id: 8, array: array21 },
    { id: 9, array: array22 },
    { id: 10, array: array23 },
    { id: 11, array: array27 },
    { id: 12, array: array32 },
  ];
  try {
    array12.map(async (ele) => {
      await db.Branch.create({ name: ele, chapter_id: 4, VAT: 19 });
    });
    res.end("done");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get("/create-product", async (req, res) => {
  const products = [
    "Duplicopieur - Monochrome - A3",
    "Duplicopieur - Monochrome - A4",
    "Photocopieur KYOCERA FS-1025 MFP",
    "Photocopieur Taskalfa 1800",
    "Photocopieur monochrome multifonction",
    "Photocopieur XEROX WorkCentre 5335",
    "Photocopieur Kyocera KM -1635/2035",
    "Photocopieur LEX MARK MX510",
    "Photorecepteur pour panasonic dp 8060",
    "Photorecepteur pour XEROX Workcenter 5230",
    "Vidéo projecteur Sony",
    "Disque Dur Externe Portable de marque 2 terra",
    "Rallonge multiprise 10 M",
    "Point d’Accès WIFI/Routeur",
    "Ram 16 G LAPTOP DELL Inspiron 5559-I7",
    "Available OS Memory: 7892MB RAM",
    "Ram 16 G:  HP 290 G2 MT Business PC",
    "Cables (usb-micro_usb) pour les raspberry pi3 et les esp8266 (esp12,...)",
    "Cables usb- usb_type C pour raspberry pi4",
    "Micro SD cards (16 ou 32 GB) comme HD pour raspberry Pi",
    "Power banks 5000 ou 10000 mah",
    "Ventilateur Climatiseur pour PC",
    "Boite DVD de 50",
    "Cable VGA long 15m",
    "Cartouche pour imprimante 5L / 6L",
    "Cartouche pour imprimante BROTHER DCP J132",
    "Cartouche pour imprimante epson M2000",
    "Cartouche pour imprimante LBP 1120",
    "Cartouche pour imprimante LBP 2900 / 1018",
    "Cartouche pour imprimante ML 1640",
    "Cartouche pour imprimante ML 2571",
    "Cartouche pour imprimante ML 2580",
    "Cartouche pour photocopieuse 4216",
    "Cartouche pour photocopieuse DP8060 (Industrilelle)",
    "Cartouche pour photocopieuse industrielle KM2530/3530/4030",
    "Cartouche pour photocopieuse KM 3050/4050/5050",
    "Cartouche pour photocopieuse kyocera FS 1118",
    "Cartouche pour photocopieuse Kyocera FS-1016",
    "Cartouche pour photocopieuse Kyocera KM -1635/2035",
    "Cartouche pour photocopieuse kyocera KM-1525",
    "Cartouche pour photocopieuse taskalfa 180 (Uniquement Tirage)",
    "Cartouche pour photocopieuse XEROX 5225/5230 (Réf 106R01305 et 106R01413)",
    "Claviers AZERTY",
    "Encre pour duplo INK514",
    "Fiche imprimante",
    "Flash disque 16Go",
    "Flash disque 8Go",
    "Jeux de Cartouche pour imprimante couleur C91",
    "Jeux de Cartouche pour imprimante couleur CLP 315",
    "Jeux de Cartouche pour imprimante couleur epson SX 230",
    "Jeux de Cartouche pour imprimante couleur LBP 5050 / CP1215",
    "Kite de netoyage",
    "Photorecepteur pour panasonic dp 8060",
    "Photorecepteur pour photocopieuse XEROX 5222/5225/5230 (Réf 101R00434)",
    "Photorecepteur pour XEROX Workcenter 5230",
    "Rlx master pour duplo DR - 630 / DR - 30",
    "Ruban pour imprimante matricielle LQ 2090",
    "Souris USB optique",
    "accessoir de bureau",
    "argenterie 2m",
    "armoir à clé métallique 1ere choix",
    "armoir blindé(largeur d'une chemise suspendue",
    "bibliotheque de bureau 1ere choix",
    "bureau 1m40 1er choix",
    "bureau 1m60 1er choix",
    "bureau pour directeur",
    "calculatrice 12 chiffres",
    "chaise de la table de réunion 1 ere choix",
    "chaise impériale 1 ere choix",
    "chaise pour la table de réunion ronde 1 ere choix",
    "chaise pour responsable",
    "chaise secrétaire roulant 1 ere choix",
    "chariot métallique pour ouvrage de bibiotheque",
    "cisaille",
    "climatiseur 12 btu pou bureau",
    "climatiseur 18 btu pour bureau",
    "coffre fort (armoir blindé) 1 ere choix",
    "coffre moyen",
    "destructeur de document",
    "fauteuil ergonomique 1 er choix",
    "fauteuil secrétaire de direction roulant",
    "frigo pour bureau",
    "porte manteau en bois 1 er choix",
    "présntoir-prospectus (valise)",
    "salon pour bureau",
    "table base PM1ere choix",
    "table de reunion",
    "Table pour Micro-Ordinateur",
    "table ronde de travail pour 4 chaises 1 ere choix",
    "Agrafeuse",
    "Bloc note PM",
    "Boite à tompon",
    "Boite d’agrafe",
    "Boite d’archive en plastique",
    "Boite d’archive ordinaire",
    "Boite de punaise",
    "Boite de trombone",
    "Brosse pour tableau blanc",
    "Brosse pour tableau ordinaire",
    "Chemise élastique en plastique",
    "Chemise élastique ordinaire",
    "Chronos",
    "Ciseaux",
    "Colle",
    "Correcteur blanc",
    "Craie blanc robert",
    "Craie couleur robert",
    "Crayon",
    "Dateur arabe",
    "Dateur français",
    "Désagrafe",
    "Encre à tampon bleu",
    "Encre à tampon noir",
    "Encre à tampon rouge",
    "Enveloppes format 10",
    "Enveloppes format 16",
    "Enveloppes format 21",
    "Enveloppes format 26",
    "Fleurissant (stylo)",
    "Fleurissant (boite de 4 couleurs)",
    "Gomme",
    "marqueur permanent bleu",
    "marqueur permanent noir",
    "marqueur permanent rouge",
    "marqueur permanent vert",
    "marqueur pour tableau blanc bleu",
    "marqueur pour tableau blanc noir",
    "marqueur pour tableau blanc rouge",
    "marqueur pour tableau blanc vert",
    "Parapheur",
    "Rame acétate",
    "Rame acétate pour photocopieuse",
    "Rame de chemise cartonnée",
    "Rame de papier XEROX",
    "Rame de sous chemise",
    "Rame feuille d’examen",
    "Rame feuille intercalaire",
    "Rame Fiche bristol bége",
    "Rame Fiche bristol blanc",
    "Rame Fiche bristol bleu",
    "Rame Fiche bristol jaune",
    "Rame Fiche bristol noir",
    "Rame Fiche bristol rose",
    "Rame Fiche bristol vert",
    "Rame papier pelure",
    "Rame pochette plastique",
    "Registre 2main",
    "Registre 3main",
    "Registre 4main",
    "Registre 5main",
    "Registre courrier arrivée",
    "Registre courrier départ",
    "Règle 30 cm",
    "Règle 50 cm métallique aluminium",
    "Rlx de fax",
    "Rlx de scotche d’emballage marron",
    "Rlx de scotche PM",
    "Soumain",
    "Stylo bleu",
    "Stylo noir",
    "Stylo rouge",
    "Support de scotch",
    "Taille crayon PM",
    "Arrache clou",
    "Ballast pour néon",
    "Bipolaire 10,16,20,25A",
    "Boite à Soudure 2,25",
    "Boite à Soudure 3,25",
    "Boite argent",
    "Boite étanche",
    "Boite Senelgaz",
    "Bouchon 20/27",
    "Brouette à roue",
    "Cable éléctrique 1,5 *2 rol m",
    "Cable éléctrique 2,5*2 rol m",
    "Cable4*10m",
    "Cable4*16m",
    "Cadna G/M",
    "Cadna P/M",
    "CadnaM/M",
    "Caisse à outille éléctricien",
    "Caisse à outille plombier",
    "Caisse à outils vide",
    "canon poour serreur à bois",
    "canon poour serreur Mischler",
    "Chain diam 60cm",
    "chalumeau",
    "charteton G/M",
    "charteton P/M",
    "Chaux en sac",
    "Chignole G/M",
    "Chignole p/m",
    "Ciseau pour jadinage",
    "Ciseau pour multicouche",
    "Clapet 26/34",
    "Clapet 33/42",
    "Clé a griffe G/M",
    "Clé à griffe P/M",
    "Clé à molette",
    "Clé six ponts",
    "Coffre fort GM",
    "Coffre fort pm",
    "coffret",
    "Coffret de distribtion18 modeles 1 rounge",
    "Coffret de distribtion18 modeles 2 rounge",
    "Colle blanche à bois 1kg",
    "Colle de PVC 500g",
    "Collier atlas n°12",
    "Collier atlas n°14",
    "Collier en plastique",
    "Collier métallique",
    "Contecteur D25 220v relai sur rail",
    "Contecteur D9 220v relai sur rail",
    "Corde en plastique de 100m",
    "Coude 15/21",
    "Coupe Tube",
    "D,r,t (elama D,25)",
    "D,r,t (elama D,9)",
    "Débarbeuse G/M",
    "Débarbeuse p/m",
    "Diamant à coupe verre",
    "Dijoncteur 220v 32A",
    "Dijoncteur unipolaire 16-32A",
    "Disjoncteur 220v 16,20 A",
    "Disjoncteur 380 v",
    "Disjoncteur 63 A SR 380V",
    "Disjoncteur bipolaire 40A",
    "Disjoncteur différentiel Bipolaire",
    "Disjoncteur différentiel tétra polair",
    "Disjoncteur Unipolaire 10,25A à boité",
    "Disque débarbeuse 230t",
    "Domino n°10",
    "Domino n°16",
    "Domino n°25",
    "Douille avis G/M",
    "Douille avis p/m",
    "Drapeau G/F",
    "Drapeau P/M",
    "Echafaudage roulant",
    "Echelle 5m",
    "Echelle2m",
    "Essence bouteille",
    "Etain en rouleau",
    "Extincteur CO2 6Kg",
    "Fer a soudeur",
    "Fil éléctrique 1,5 /100m",
    "File éléctrique 2,5 souple m",
    "Flotteur éléctrique",
    "Fourche",
    "Frigo p/m",
    "Fusible cartouche 63,40A",
    "Gant en cuir de protection",
    "Gaz pour climatiseur",
    "GOULOTTE 50*105",
    "GOULOTTE 50*130",
    "Houe avec manche",
    "Huile de lin",
    "Inipolaire 10,16,20,25 A",
    "Interrupteur apparent",
    "Interupteur Poussoir",
    "Interupteur double allumage",
    "Interupteur encastre",
    "jeux de clé à fourche",
    "jeux de mache à béton",
    "jeux de mache métallique",
    "Jeux de méche à bois",
    "Jeux de méche acier",
    "Jeux de robinet radiateur",
    "Lame de scie à métaux",
    "Lampe à vise 250we27",
    "Lampe néant économique 150w e27",
    "Lampe Osram 160w",
    "Lampe Osram 160w et 250 mix",
    "Lampe projecteur 500w",
    "le bouchon de robinet n°14",
    "Les atteches en plastique pm,gm",
    "Mallette",
    "Mamlon n°15/21",
    "Mamlon n°20/27",
    "Mamlon n°26/34",
    "Marteau",
    "Métre 5m",
    "Métrix analogique",
    "Metrix numérique",
    "Meuleuse",
    "Molette acouper le verre",
    "Multicouche 100m",
    "Néon 1,20m",
    "Néon Complet 0,60m",
    "Non double diviseur 1,20m",
    "Paquet chevielle n°08",
    "Paquet chevielle n°10",
    "Peinture antirouille 3kg",
    "Peinture la laque 1kg",
    "Pelle avec manche",
    "Perceuse",
    "Perceuse visseuse",
    "Pince Coupante",
    "pince crcodile",
    "pince universelle",
    "Pinceau Plat",
    "Pinceau Rond",
    "pioche avec manche",
    "poste à Soudure",
    "Poubelle avec àroue",
    "Poubelle en caoutchouc",
    "Poubelle en caoutchouc P/M",
    "Poubelle G/M en PVC",
    "Poupée de filasse",
    "Prise apparente",
    "Prise de courant double 16A",
    "Prises Simples",
    "Projecteur",
    "Rabot manuel",
    "Raboteuse Eléctrice",
    "Raccord piéces 15/21",
    "Raccord piéces 20/27",
    "Raclette 16",
    "Rallange éléctrique portative de 40m",
    "Rallange multiprise",
    "Rallange pour poste Soudure",
    "Réduction 15/21 Famelle",
    "Réduction 15/21 mal",
    "Régllette néant double 1,20m",
    "Robinet 15/21 chromé",
    "Robinet 15/21 jaune",
    "Robinet 15/21 papillon",
    "Robinet 20/27",
    "Rondelle acie large6,8,10,12",
    "Rouleau de peinture p/m",
    "Rouleau fil 2,5 100m",
    "Scie pour jardinage",
    "serrure à bois",
    "serrure à mischler",
    "Siphon pour lavabo",
    "Starteur néon",
    "Teflon",
    "Tondeuse à gazon",
    "tournevise Amérécain",
    "tournevise plat",
    "Transformateur néon 40w",
    "Truelle de maçon",
    "Tube de pinteure créme",
    "Tube de pinteure noir",
    "Tube Néon 0,60m",
    "Tube Néon 1,20 m",
    "Tuyau d'arrosage",
    "Vachette double canon",
    "Vachette Electrique",
    "Venne d'arret 15/21 papillon",
    "Venne d'arrét 40",
    "Venne d'arret32",
    "Vernis 01 KG",
    "Verrou G/M",
    "Vis parker boite 4*25",
  ];

  try {
    products.map(async (pro) => {
      await db.Product.create({
        name: pro,
        quantity: 0,
        limit: 10,
        description: "",
      });
    });
    res.status(201).send("done");
  } catch (error) {
    res.status(500).send("failed", error);
  }
});

app.post("/map-service-head", async (req, res) => {
  const array = [
    {
      user_id: 15,
      service_id: 1, // Direction Générale
    },
    {
      user_id: 16,
      service_id: 2, // Secrétariat Général
    },
    {
      user_id: 17,
      service_id: 3, // Département du cycle préparatoire
    },
    {
      user_id: 18,
      service_id: 4, // Département du second Cycle
    },
    {
      user_id: 19,
      service_id: 6, // Direction des Enseignements et des Diplômes
    },
    {
      user_id: 20,
      service_id: 5, // Direction des Relations Extérieures
    },
    {
      user_id: 21,
      service_id: 7, // Direction de la Formation Doctorale
    },
  ];

  try {
    array.map(async (elem) => {
      db.ServiceHead.create({
        user_id: elem.user_id,
        service_id: elem.service_id,
      });
    });
  } catch (error) {
    res.status(500).send("some thing went wrong ");
  }
});

app.post("/add-directors", async (req, res) => {
  const generatePhoneNumber = () => {
    const prefix = "+213";
    const number = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, "0");
    return `${prefix}${number}`;
  };

  // Directors data
  const directors = [
    { fullName: "Benslimane Sidi Mohamed", email: "sm.benslimane@esi-sba.dz" },
    { fullName: "Naceri Amina", email: "a.naceri@esi-sba.dz" },
    { fullName: "Aced Mohamed Réda", email: "mr.aced@esi-sba.dz" },
    { fullName: "Amrane Abdelkader", email: "a.amrane@esi-sba.dz" },
    { fullName: "Amar Bensaber Djamel", email: "bd.amar@esi-sba.dz" },
    { fullName: "Bedjaoui Mohamed", email: "m.bedjaoui@esi-sba.dz" },
    { fullName: "Malki Mimoun", email: "m.malki@esi-sba.dz" },
  ];

  try {
    const directorsData = directors.map((director) => {
      const [familyName, ...restName] = director.fullName.split(" ").reverse();
      const firstName = restName.reverse().join(" ");
      const username = `${firstName}${familyName}`
        .toLowerCase()
        .replace(/ /g, "");
      return {
        username,
        firstname: firstName,
        lastname: familyName,
        email: director.email,
        password: "adminadmin",
        address: "SBA Algeria",
        phone_num: generatePhoneNumber(),
        status: "active",
      };
    });

    const createdDirectors = await db.User.bulkCreate(directorsData);
    res
      .status(201)
      .json({
        message: "Directors added successfully",
        data: createdDirectors,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error });
  }
});

app.get("/create", async (req, res) => {
  // const services = [
  //   "Direction Générale",
  //   "Secrétariat Général",
  //   "Département du cycle préparatoire",
  //   "Département du second Cycle",
  //   "Direction des Enseignements et des Diplômes",
  //   "Direction des Relations Extérieures",
  //   "Direction de la Formation Doctorale",
  // ];
  // const roles = [
  //   "admin",
  //   "store keeper",
  //   "head of structure",
  //   "consumer",
  //   "director",
  //   "purchasing service agent",
  // ];
  // const chapters = [
  //   "Remboursement frais",
  //   "Matériel et mobilier",
  //   "Fournitures",
  //   "Documentation",
  //   "Habillement personnel",
  //   "Parc auto",
  //   "Travaux entretien",
  //   "Matériel accessoires informatique",
  //   "Matériel et mobilier pédagogique",
  //   "Frais liés aux études de post-graduation",
  //   "Participation aux organismes nationaux et internationaux",
  //   "Activités culturelles sportives et scientifiques aux étudiants",
  //   "Frais de fonctionnement liées à la recherche scientifique et au développement",
  // ];
  // const fourni = [
  //   "Sarl PC STORE",
  //   "Nedjma Computer",
  //   "Ouadah Informatique",
  //   "Alpha Computers",
  //   "SARL Méditerranéenne d'Informatique",
  //   "ABK Informatique",
  //   "Centre Informatique de l'Ouest (CIO)",
  //   "Société Algérienne d'Informatique (SAI)",
  //   "Informatique Vision Plus (IVP)",
  //   "Global Informatique Algérie",
  //   "Computer World",
  // ];
  // const permissions = [
  //   "manage users",
  //   "manage roles",
  //   "manage permissions",
  //   "manage account",
  //   "manage chapters",
  //   "manage branches",
  //   "manage products",
  //   "manage suppliers",
  //   "Manage BCE",
  //   "consult BCE",
  //   "consult FMP",
  //   "manage BR",
  //   "manage inventory",
  //   "consult BCI",
  //   "manage BS",
  //   "manage BD",
  //   "validate BCI",
  //   "consult store",
  //   "consult inventory",
  //   "manage BCI",
  //   "store keeper stat",
  //   "director stat",
  //   "head of service stat"
  // ]
  // const products = [
  //   "Arrache clou",
  //   "Ballast pour néon",
  //   "Bipolaire 10,16,20,25A",
  //   "Boite à Soudure 2,25",
  //   "Boite à Soudure 3,25",
  //   "Boite argent",
  //   "Boite étanche",
  //   "Boite Senelgaz",
  //   "Bouchon 20/27",
  //   "Brouette à roue",
  //   "Cable éléctrique 1,5 *2 rol m",
  //   "Cable éléctrique 2,5*2 rol m",
  //   "Cable4*10m",
  //   "Cable4*16m",
  //   "Cadna G/M",
  //   "Cadna P/M",
  //   "CadnaM/M",
  //   "Caisse à outille éléctricien",
  //   "Caisse à outille plombier",
  //   "Caisse à outils vide",
  //   "canon poour serreur à bois",
  //   "canon poour serreur Mischler",
  //   "Chain diam 60cm",
  //   "chalumeau",
  //   "charteton G/M",
  //   "charteton P/M",
  //   "Chaux en sac",
  //   "Chignole G/M",
  //   "Chignole p/m",
  //   "Ciseau pour jadinage",
  //   "Ciseau pour multicouche",
  //   "Clapet 26/34",
  //   "Clapet 33/42",
  //   "Clé a griffe G/M",
  //   "Clé à griffe P/M",
  //   "Clé à molette",
  //   "Clé six ponts",
  //   "Coffre fort GM",
  //   "Coffre fort pm",
  //   "coffret",
  //   "Coffret de distribtion18 modeles 1 rounge",
  //   "Coffret de distribtion18 modeles 2 rounge",
  //   "Colle blanche à bois 1kg",
  //   "Colle de PVC 500g",
  //   "Collier atlas n°12",
  //   "Collier atlas n°14",
  //   "Collier en plastique",
  //   "Collier métallique",
  //   "Contecteur D25 220v relai sur rail",
  //   "Contecteur D9 220v relai sur rail",
  //   "Corde en plastique de 100m",
  //   "Coude 15/21",
  //   "Coupe Tube",
  //   "D,r,t (elama D,25)",
  //   "D,r,t (elama D,9)",
  //   "Débarbeuse G/M",
  //   "Débarbeuse p/m",
  //   "Diamant à coupe verre",
  //   "Dijoncteur 220v 32A",
  //   "Dijoncteur unipolaire 16-32A",
  //   "Disjoncteur 220v 16,20 A",
  //   "Disjoncteur 380 v",
  //   "Disjoncteur 63 A SR 380V",
  //   "Disjoncteur bipolaire 40A",
  //   "Disjoncteur différentiel Bipolaire",
  //   "Disjoncteur différentiel tétra polair",
  //   "Disjoncteur Unipolaire 10,25A à boité",
  //   "Disque débarbeuse 230t",
  //   "Domino n°10",
  //   "Domino n°16",
  //   "Domino n°25",
  //   "Douille avis G/M",
  //   "Douille avis p/m",
  //   "Drapeau G/F",
  //   "Drapeau P/M",
  //   "Echafaudage roulant",
  //   "Echelle 5m",
  //   "Echelle2m",
  //   "Essence bouteille",
  //   "Etain en rouleau",
  //   "Extincteur CO2 6Kg",
  //   "Fer a soudeur",
  //   "Fil éléctrique 1,5 /100m",
  //   "File éléctrique 2,5 souple m",
  //   "Flotteur éléctrique",
  //   "Fourche",
  //   "Frigo p/m",
  //   "Fusible cartouche 63,40A",
  //   "Gant en cuir de protection",
  //   "Gaz pour climatiseur",
  //   "GOULOTTE 50*105",
  //   "GOULOTTE 50*130",
  //   "Houe avec manche",
  //   "Huile de lin",
  //   "Inipolaire 10,16,20,25 A",
  //   "Interrupteur apparent",
  //   "Interupteur Poussoir",
  //   "Interupteur double allumage",
  //   "Interupteur encastre",
  //   "jeux de clé à fourche",
  //   "jeux de mache à béton",
  //   "jeux de mache métallique",
  //   "Jeux de méche à bois",
  //   "Jeux de méche acier",
  //   "Jeux de robinet radiateur",
  //   "Lame de scie à métaux",
  //   "Lampe à vise 250we27",
  //   "Lampe néant économique 150w e27",
  //   "Lampe Osram 160w",
  //   "Lampe Osram 160w et 250 mix",
  //   "Lampe projecteur 500w",
  //   "le bouchon de robinet n°14",
  //   "Les atteches en plastique pm,gm",
  //   "Mallette",
  //   "Mamlon n°15/21",
  //   "Mamlon n°20/27",
  //   "Mamlon n°26/34",
  //   "Marteau",
  //   "Métre 5m",
  //   "Métrix analogique",
  //   "Metrix numérique",
  //   "Meuleuse",
  //   "Molette acouper le verre",
  //   "Multicouche 100m",
  //   "Néon 1,20m",
  //   "Néon Complet 0,60m",
  //   "Non double diviseur 1,20m",
  //   "Paquet chevielle n°08",
  //   "Paquet chevielle n°10",
  //   "Peinture antirouille 3kg",
  //   "Peinture la laque 1kg",
  //   "Pelle avec manche",
  //   "Perceuse",
  //   "Perceuse visseuse",
  //   "Pince Coupante",
  //   "pince crcodile",
  //   "pince universelle",
  //   "Pinceau Plat",
  //   "Pinceau Rond",
  //   "pioche avec manche",
  //   "poste à Soudure",
  //   "Poubelle avec àroue",
  //   "Poubelle en caoutchouc",
  //   "Poubelle en caoutchouc P/M",
  //   "Poubelle G/M en PVC",
  //   "Poupée de filasse",
  //   "Prise apparente",
  //   "Prise de courant double 16A",
  //   "Prises Simples",
  //   "Projecteur",
  //   "Rabot manuel",
  //   "Raboteuse Eléctrice",
  //   "Raccord piéces 15/21",
  //   "Raccord piéces 20/27",
  //   "Raclette 16",
  //   "Rallange éléctrique portative de 40m",
  //   "Rallange multiprise",
  //   "Rallange pour poste Soudure",
  //   "Réduction 15/21 Famelle",
  //   "Réduction 15/21 mal",
  //   "Régllette néant double 1,20m",
  //   "Robinet 15/21 chromé",
  //   "Robinet 15/21 jaune",
  //   "Robinet 15/21 papillon",
  //   "Robinet 20/27",
  //   "Rondelle acie large6,8,10,12",
  //   "Rouleau de peinture p/m",
  //   "Rouleau fil 2,5 100m",
  //   "Scie pour jardinage",
  //   "serrure à bois",
  //   "serrure à mischler",
  //   "Siphon pour lavabo",
  //   "Starteur néon",
  //   "Teflon",
  //   "Tondeuse à gazon",
  //   "tournevise Amérécain",
  //   "tournevise plat",
  //   "Transformateur néon 40w",
  //   "Truelle de maçon",
  //   "Tube de pinteure créme",
  //   "Tube de pinteure noir",
  //   "Tube Néon 0,60m",
  //   "Tube Néon 1,20 m",
  //   "Tuyau d'arrosage",
  //   "Vachette double canon",
  //   "Vachette Electrique",
  //   "Venne d'arret 15/21 papillon",
  //   "Venne d'arrét 40",
  //   "Venne d'arret32",
  //   "Vernis 01 KG",
  //   "Verrou G/M",
  //   "Vis parker boite 4*25",
  // ];
  // try {
  //   products.map(async pro => {
  //     await db.Product.create({
  //       name: pro,
  //       qt_logique: 1000,
  //       branch_id: 2
  //     })
  //   })
  // } catch (error) {
  // }
  // try {
  //   fourni.map(async (ele) => {
  //     await db.Supplier.create({
  //       name: ele,
  //       email:'suplier@sup.com',
  //       address:"SBA Algeria",
  //       phone_num:"0987654321",
  //       registre_c:"8013489734",
  //       RIB:"000899848193",
  //       NIF:"0078678425"
  //     });
  //   });
  //   services.map(async (ele) => {
  //     await db.Service.create({
  //       name: ele,
  //     });
  //   });
  //   await db.User.create({
  //     username: "hamida2004",
  //     firstname: "dadda",
  //     lastname: "hamida",
  //     address: "ADRAR Algeria",
  //     phone_num:"0657199109",
  //     email: "h.dadda@esi-sba.dz",
  //     password: "name my say",
  //     service_id: 1,
  //   });
  // permissions.map(async (ele,index) => {
  //   await db.Permission.create({
  //     permission_id:index+1,
  //     name: ele,
  //   });
  // });
  //   roles.map(async (ele) => {
  //     await db.Role.create({
  //       name: ele,
  //     });
  //   });
  //   chapters.map(async (ele) => {
  //     await db.Chapter.create({
  //       name: ele,
  //     });
  //   });
  //   // await db.User.create({username :"hamida2004",firstname:"dadda",lastname:"hamida",email:"h.dadda@esi-sba.dz",address:"adrar",phone_num:"0987654321",password:"name my say",service_id:1})
  //   res.end("done");
  // } catch (err) {
  //   res.status(500).send({ error: err.message });
  // }
});
const connectToDb = async () => {
  db.sequelize
    .sync()
    .then(() => {
      app.listen(port, () => {
        console.log(`App listening on port ${port} ...`);
      });
    })
    .catch((error) => {
      console.error("Error syncing models:", error);
    });
};
connectToDb();
