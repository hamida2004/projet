import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  Card,
  Card2,
  Card3,
  Users,
  CreateUser,
  Login,
  Profils,
  EditPassword,
  EditProfile,
  EditUser,
  Role,
  Permissions,
  Dashboard,
} from "./components/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProvider } from "./components/reset/AppContext";
import CreateCmd from "./components/Create-cmds/createCmd";
import BonDeComande from "./components/EPC/viewEPC";
import Cmds from "./components/CommandManagement/MangCommand";
import BonDeReception from "./components/BR/ViewBR";
import EditCmdEx from "./components/EditCMD/EditCommandEx";
import ViewChapter from "./components/ViewChapter/ViewChapter";
import ViewRole from "./components/rolesMan/ViewRole";
import Produit from "./components/produitMan/manProduits";
import NotFound from "./components/NotFound/NotFound";
import CreateRec from "./components/ReceiptMang/createRec";
import Articles from "./components/Article/Articles";
import Fornisseur from "./components/fournisseurMan/manFournisseur";
import Produits from "./components/Produit/manProduits";
import DemandeDeFourniture from "./components/bondesortie/bndesortie";
import Decharge from "./components/decharge/decharge";
import CreateCmdinterne from "./components/create-cmd-interne/CreateCmdinterne";
import EditDecharge from "./components/edit-decharge/EditDecharge";
import CreateDecharge from "./components/create-decharge/CreateDecharge";
import ListBonRecp from "./components/EPC/listbc";
import CommandInterne from "./components/CommandINMan/manCommandIN";
import CreateBonSortie from "./components/BonSortie/createBonSortie";
import EditBonSortie from "./components/BonSortie/editBonSortie";
import CommandInterneUser from "./components/cmdi-User/manCmdInUser";
import EditCmdinterne from "./components/edit-cmd-intern/EditCmdinterne";
import DemandeFourniture from "./components/DemandeFourniture/df";
import AllArticles from "./components/articleMan/manArticle";
import CreateCmdint from "./components/createCmdInt/CreateCmdinterne";
import EditCmdinterneDir from "./components/edit-cmd-intern/EditCmdinterneDir";
import CommandInterneDir from "./components/CommandINMan/manCommandINDir";
import FicheInventaire from "./components/ViewFicheInventaire/ficheInventaire";
import EditInventaire from "./components/EditInventaire/EditInventaire";
import DashMagasinier from "./components/DashMagasinier/DashMagasin";
import DashDirector from "./components/DashDirector/DashDirector";
import DashChefService from "./components/DashChafService/DashChefService";
import EditCmdinterneUser from "./components/edit-cmd-intern/EditCmdinterneUser";
import DashConsumer from "./components/DashConsumer/DashConsumer";
import Art from "./components/ViewFicheInventaire/Art";
function App() {
  return (
    <AppProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            {/* new routes */}
            // view fiche inventaire
            <Route path="/view-inventory/:id" element={<FicheInventaire />} />
            <Route path="/list-inventory" element={<Art />}/>
            // edit inventaire
            <Route path="/Inventory" element={<EditInventaire />} />
            // dash magasigner
            <Route path="/storekeeperStat" element={<DashMagasinier />} />
            // dash director
            <Route path="/DirectorStat" element={<DashDirector />} />
            // dash chef service
            <Route path="/HeadOfServiceStat" element={<DashChefService />} />
            <Route path="/consumerDash" element={<DashConsumer />} />
            <Route path="/purshasingAgentDash" element={<DashChefService />} />
            {/* to do */}
            // delete : move to deleted status // handelDownload : interdir a
            modifier // delete product function in each of the create/edit
            commands // statistics // inventory // attach pdf(la fiche
            d'inventaire genere est stock)
            {/* // already done */}
            <Route path="/edit-cmd/:id" element={<EditCmdEx />} />
            <Route path="/edit-cmdi-dir/:id" element={<EditCmdinterneDir />} />
            <Route path="/view-bon-decharge/:id" element={<Decharge />} />
            <Route path="/edit-bon-sortie/:id" element={<EditBonSortie />} />
            <Route
              path="/view-bon-sortie/:id"
              element={<DemandeDeFourniture />}
            />
            <Route
              path="/cmdi/:id/create-bon-sortie"
              element={<CreateBonSortie />}
            />
            <Route
              path="/cmdi/:id/create-bon-decharge"
              element={<CreateDecharge />}
            />
            <Route
              path="/edit-cmdi-user/:id"
              element={<EditCmdinterneUser />}
            />
            <Route path="/edit-cmdi/:id" element={<EditCmdinterne />} />
            <Route path="/InternalOrders" element={<CommandInterne />} />
            <Route
              path="/InternalOrdersDirector"
              element={<CommandInterneDir />}
            />
            <Route path="/edit-bon-decharge/:id" element={<EditDecharge />} />
            <Route path="/articles" element={<AllArticles />} />
            <Route
              path="/:idcmd/bon-reception/:id/:index"
              element={<BonDeReception />}
            />
            <Route
              path="/view-demande-fourniture/:id"
              element={<DemandeFourniture />}
            />
            <Route path="/MyOrders" element={<CommandInterneUser />} />
            <Route path="/bonsdereception/:id/:order_id" element={<ListBonRecp />} />
            <Route path="/cr-cmdi" element={<CreateCmdint />} />
            <Route path="/bon-cmd/:id" element={<BonDeComande />} />
            <Route
              path="/order/:id/create-bon-reception"
              element={<CreateRec />}
            />
            <Route path="/ChaptersManagement" element={<ViewChapter />} />
            <Route path="/produits" element={<Produit />} />
            <Route path="/chapter/:id" element={<Articles />} />
            <Route path="/article/:id/produits" element={<Produits />} />
            <Route path="/create-cmd" element={<CreateCmd />} />
            <Route path="/SuppliersManagement" element={<Fornisseur />} />
            <Route path="/viewRole/:id" element={<ViewRole />} />
            <Route path="/ExternalOrders" element={<Cmds />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/EditPassword" element={<EditPassword />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="/EditUserProfile/:id" element={<EditUser />} />
            <Route path="/RolesManagement" element={<Role />} />
            <Route path="/permissions-management" element={<Permissions />} />
            <Route path="/UsersManagement" element={<Users />} />
            <Route path="/Settings" element={<Profils />} />
            <Route path="/CreateUser" element={<CreateUser />} />
            <Route path="/reset1" element={<Card />} />
            <Route path="/reset2" element={<Card2 />} />
            <Route path="/reset3" element={<Card3 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
