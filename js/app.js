import { Plateau } from "./Entité/Plateau.js";
import { InterfacePlateau } from "./Interface/InterfacePlateau.js";

let plateau = new Plateau(10,10,10,4)
plateau.genererPlateau()

let interfacePlateau = new InterfacePlateau(plateau);
interfacePlateau.displayPlateauHtml();
