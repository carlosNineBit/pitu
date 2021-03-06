"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const linksRepository_1 = __importDefault(require("../model/linksRepository"));
//const links : Link[] = [];
//let proxId = 1;
function generateCode() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVXYWZabcdefghijklmnopqrstuvxywz0123456789';
    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function postLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = req.body;
        //  link.id = proxId++;
        link.code = generateCode();
        link.hits = 0;
        //    links.push(link); //Adiciona o link no array Links
        const result = yield linksRepository_1.default.add(link);
        if (!result.id)
            return res.sendStatus(400); //quando deu erro na inserção do banco retorna o erro 400    
        link.id = result.id;
        res.status(201).json(link); //processa e devolve o link
    });
}
function getLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /*const code = req.params.code as string;
        const link = links.find(item => item.code === code);
        if(!link){
            res.sendStatus(404);
        }else{
            res.json(link);
        }*/
        const code = req.params.code;
        const link = yield linksRepository_1.default.findByCode(code);
        if (!link) {
            res.sendStatus(404);
        }
        else {
            res.json(link);
        }
    });
}
function hitLink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /*const code = req.params.code as string;
        const index = links.findIndex(item => item.code === code);
    
        if(index === -1)
            res.sendStatus(404);
        else{
            links[index].hits!++;
            res.json(links[index]);
        }
    */
        const code = req.params.code;
        const link = yield linksRepository_1.default.hit(code);
        if (!link)
            res.sendStatus(404);
        else {
            res.json(link);
        }
    });
}
exports.default = {
    postLink,
    getLink,
    hitLink
};
