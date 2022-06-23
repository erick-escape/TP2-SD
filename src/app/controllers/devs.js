import { Router } from 'express';
import devs from '@/app/schemas/devjobs';

const router = new Router();

//gets all the devs
router.get('/', (req, res) => {

    devs.find()
        .then(data => { 
            const devs = data.map(dev => {
                return {name: dev.name, cellPhone: dev.cellPhone, birthDate: dev.birthDate };
            });
            res.send(devs);
        })
        .catch(error => {
            console.error('Error trying to get all devs from the database', error);
            res.status(400).send({
                error: "It wasn't possible to get all devs. Please, try again!",
            });
        })
});

//gets one specific dev
router.get('/:devCpf', (req, res) => { // I don't know if this is secure, probably not, cause my client's cpf is on the url. I could do this if the id, but I've wanted to do something different

    devs.findOne({cpf: req.params.devCpf})
        .then(dev => {
            res.send(dev);
        })
        .catch(error => {
            console.error('Error trying to get dev from the database', error);
            res.status(400).send({
                error: "It wasn't possible to get dev. Please, try again!",
            });
        })
});


//Create a new dev
router.post('/', (req, res) => {

    const { cpf, name, email, password, cellPhone, birthDate } = req.body;

    devs.create({cpf, name, email, password, cellPhone, birthDate})
        .then(dev => { res.status(200).send(dev) })
        .catch(error => {
            console.error('Error trying to save new dev to database', error);
            res.status(400).send({
                error: "It wasn't possible to save your profile. Please, verify your data and try again!",
            });
        })
});

//Update dev by id
router.put('/:devId', (req, res) => {

    const { cpf, name, email, password, cellPhone, birthDate } = req.body;

    devs.findByIdAndUpdate(req.params.devId, { name, email, password, cellPhone }, { new: true})
        .then(dev => { res.status(200).send(dev) })
        .catch(error => {
            console.error('Error trying to update dev in database', error);
            res.status(400).send({
                error: "It wasn't possible to update your profile. Please, verify your data and try again!",
            });
        })
});

//Delete dev by id
router.delete('/:devId', (req, res) => {
    devs.findByIdAndRemove(req.params.devId)
        .then(() => {
        res.send({message: 'Dev removed successfully!'});
        })
        .catch(error => {
            console.error('Error removing dev from database.', error);
            res.status(400).send({ message: 'Error removing dev from database. Please, try again!' });
        });
});

export default router;