import { Router } from "express";

const router: Router = Router()
    .get('/')
    .get('/:city')
    .get('/nearby-properties')
    