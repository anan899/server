const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const beautySchema = require("./beauty2");

let BeautyData = require("./preload");

// Get all beauty
/*router.get('/', (req, res) =>{
    const Elizabeth = new beautySchema({
        Name: "Elisabeth in Bavaria",
        Spouse: "Franz Joseph I"	,
        Title: "Empress of Austria",
        Introduction:"Duchess Elisabeth Amalie Eugenie in Bavaria (24 December 1837 – 10 September 1898) was Empress of Austria and Queen of Hungary from her marriage to Emperor Franz Joseph I on 24 April 1854 until her assassination in 1898."
    });

    const Alexandra = new beautySchema({
        Name:"Alexandra Feodorovna",
        Spouse:	"Nicholas II",
        Title:"Empress of Russia",
        Introduction:"Alexandra Feodorovna (6 June [O.S. 25 May] 1872 – 17 July 1918), Princess Alix of Hesse and by Rhine at birth, was the empress consort of Emperor Nicholas II from their marriage on 26 November [O.S. 14 November] 1894 until his forced abdication on 15 March [O.S. 2 March] 1917. As such, she was also the last empress consort of Russia. A favourite granddaughter of Queen Victoria of the United Kingdom, she was, like her grandmother, one of the most famous royal carriers of haemophilia and bore a haemophiliac heir, Alexei Nikolaevich, Tsarevich of Russia. Her reputation for encouraging her husband's resistance to the surrender of autocratic authority and her known faith in the Russian mystic Grigori Rasputin severely damaged her popularity and that of the Romanov monarchy in its final years.[2] She and her immediate family were all killed while in Bolshevik captivity in 1918, during the Russian Revolution. In 2000 the Russian Orthodox Church canonized her as Saint Alexandra the Passion Bearer."
    })

    const Catalina = new beautySchema({
        Name: "Catalina Micaela of Spain",
        Spouse: "Charles Emmanuel I",
        Title: "Duchess of Savoy",
        Introduction:"Catherine Michelle of Spain (Spanish: Catalina Micaela de Austria; 10 October 1567 – 6 November 1597) was Duchess of Savoy by marriage to Duke Charles Emmanuel I. She ruled the Duchy several times as regent in Charles Emmanuel's absence, notably during his campaign in 1594.[1] She was the younger surviving daughter of Philip II of Spain and Elisabeth of Valois."
    })


    Catalina.save().
   then((result)=>
    {res.send(result)}).catch((error)=>{
        console.log(error);
    })





});*/

router.get('/',(req,res)=>{
    beautySchema.find()
        .then((result)=>{
            res.send(result)
        }).catch((error)=>{
            console.log(error);
    })
})

// get Single beauty by her Name
/*router.get('/:Name',(req,res)=>{
    const found = BeautyData.some(beauty=>beauty.Name === req.params.Name);
    if (found){
        res.json(BeautyData.filter(beauty=>beauty.Name === req.params.Name));
    }else{
        res.status(404).json({msg: `No beauty with the id ${req.params.Name}`});
    }
})*/

// get Single beauty by her id
router.get('/:id',(req,res)=>{
    const found = BeautyData.some(beauty=>beauty.id === req.params.id);
    if (found){
        res.json(BeautyData.filter(beauty=>beauty.id === req.params.id));
    }else{
        res.status(404).json({msg: `No beauty with the id ${req.params.id}`});
    }
})

// create a single beauty
router.post('/',(req,res)=>{
    const newBeauty= new beautySchema({
        Name: req.body.Name,
        Spouse: req.body.Spouse,
        Title: req.body.Title,
        Introduction: req.body.Intro
    });
    /*if(!newBeauty.Name){
        res.status(400).json({msg: 'Please include a name'});
    }*/
    newBeauty.save()
        .then((result)=>{res.send(result)})
        .catch(error=>{console.log(error)});
    // BeautyData.push(newBeauty);
    // res.json(BeautyData);

})

// update a single Beauty
router.put('/:id', (req,res)=>{
    let id = req.params.id;

    beautySchema.findOne({_id:id}, (error,foundObject)=>{
        if(error){
            console.log(error);
            res.status(500).send();
        }else{
            if(!foundObject){
                res.status(404).send();
            }else{
                if(req.body.Name){
                    foundObject.Name = req.body.Name;
                }
                if(req.body.Spouse){
                    foundObject.Spouse = req.body.Spouse;
                }
                if(req.body.Title){
                    foundObject.Title = req.body.Title;
                }
                if(req.body.Introduction){
                    foundObject.Introduction = req.body.Introduction;
                }
                foundObject.save((err, updateBeauty)=>{
                    if(err){
                        console.log(err);
                        res.status(500).send();
                    }else{
                        res.send(updateBeauty);
                    }
                })
            }
        }
    })


    /*console.log(req);
    console.log("Hello");
    const found = BeautyData.some(beauty=>beauty.id === req.params.id);
    if(found){
        const updBeauty = req.body;
        BeautyData.forEach(beauty=>{
            if (beauty.id === req.params.id){
                beauty.Name = updBeauty.Name ? updBeauty.Name : beauty.Name;
                beauty.Spouse = updBeauty.Spouse ? updBeauty.Spouse : beauty.Spouse;
                beauty.Title = updBeauty.Title? updBeauty.Title : beauty.Title;
                beauty.Introduction = updBeauty.Introduction? updBeauty.Introduction : beauty.Introduction;

                res.json({msg:'Beauty updated', beauty});
            }
        });
    }else{
        res.status(404).json({msg: `No beauty with the id ${req.params.id}`});

    }*/
})

// Delete Beauty
router.delete('/:id',(req,res)=>{
    let id = req.params.id;
    beautySchema.findByIdAndDelete({_id:id},(error,foundObject)=> {
        if (error) {
            console.log(error);
            res.status(500).send();
        } else {
            if (!foundObject) {
                res.status(404).send();
            } else {
                res.send(foundObject);
            }
        }
    })

    /*const found = BeautyData.some(beauty=>beauty.id === req.params.id);
    if (found){
        BeautyData = BeautyData.filter(beauty=>beauty.id !== req.params.id);
        res.json({
            msg:'Beauty deleted'
        });
    }else{
        res.status(404).json({msg: `No beauty with the id ${req.params.id}`});
    }*/
})


module.exports = router;